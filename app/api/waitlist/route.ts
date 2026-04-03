import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/ratelimit";
import crypto from "crypto";

// ─── Security: Crypto-safe referral code ───
function generateReferralCode(): string {
  return crypto.randomBytes(6).toString("hex").slice(0, 8);
}

// ─── Security: Hash IP for privacy-preserving storage ───
function hashIP(ip: string): string {
  const salt = process.env.IP_HASH_SALT || "omela-default-salt";
  return crypto.createHash("sha256").update(ip + salt).digest("hex").slice(0, 16);
}

// ─── Security: Strict input validation ───
function sanitizeEmail(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const trimmed = raw.trim().toLowerCase();
  if (trimmed.length > 254) return null;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(trimmed)) return null;
  return trimmed;
}

function sanitizeRole(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const valid = ["patient", "provider", "developer"];
  return valid.includes(raw) ? raw : null;
}

function sanitizeRefCode(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const cleaned = raw.trim().toLowerCase();
  if (cleaned.length === 0 || cleaned.length > 30) return null;
  if (!/^[a-z0-9]+$/.test(cleaned)) return null;
  return cleaned;
}

function sanitizeSource(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const trimmed = raw.trim().slice(0, 50);
  if (!/^[a-zA-Z0-9_-]+$/.test(trimmed)) return null;
  return trimmed;
}

export async function POST(req: NextRequest) {
  try {
    // ─── Rate limiting ───
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const ipHashed = hashIP(ip);

    const limiter = await rateLimit(ip);
    if (!limiter.success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // ─── Parse body safely ───
    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid request body." },
        { status: 400 }
      );
    }

    // ─── Honeypot ───
    if (body.website && typeof body.website === "string" && body.website.trim().length > 0) {
      return NextResponse.json({ message: "You are in." }, { status: 200 });
    }

    // ─── Validate inputs ───
    const email = sanitizeEmail(body.email);
    if (!email) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const role = sanitizeRole(body.role);
    if (!role) {
      return NextResponse.json(
        { error: "Please select a valid role." },
        { status: 400 }
      );
    }

    const source = sanitizeSource(body.source) || "landing-page";
    const ref = sanitizeRefCode(body.ref);
    const marketingOptIn = body.marketingOptIn === true;

    // ─── Check existing ───
    const existing = await prisma.waitlistEntry.findUnique({
      where: { email },
      select: { referralCode: true },
    });

    if (existing) {
      return NextResponse.json(
        {
          error: "This email is already on the waitlist.",
          referralCode: existing.referralCode,
        },
        { status: 409 }
      );
    }

    // ─── Generate unique referral code ───
    let referralCode = generateReferralCode();
    for (let attempt = 0; attempt < 10; attempt++) {
      const exists = await prisma.waitlistEntry.findUnique({
        where: { referralCode },
        select: { id: true },
      });
      if (!exists) break;
      referralCode = generateReferralCode();
    }

    // ─── Verify referrer exists (do not leak info) ───
    let validRef: string | null = null;
    if (ref) {
      const referrer = await prisma.waitlistEntry.findUnique({
        where: { referralCode: ref },
        select: { id: true },
      });
      if (referrer) validRef = ref;
    }

    // ─── Create entry ───
    const entry = await prisma.waitlistEntry.create({
      data: {
        email,
        role,
        source,
        ipHash: ipHashed,
        marketingOptIn,
        referralCode,
        referredBy: validRef,
      },
    });

    // ─── Increment referrer (fire-and-forget) ───
    if (validRef) {
      prisma.waitlistEntry
        .updateMany({
          where: { referralCode: validRef },
          data: { referralCount: { increment: 1 } },
        })
        .then(async () => {
          const referrer = await prisma.waitlistEntry.findUnique({
            where: { referralCode: validRef! },
            select: { referralCount: true, rewardUnlocked: true },
          });
          if (referrer && referrer.referralCount >= 3 && !referrer.rewardUnlocked) {
            await prisma.waitlistEntry.update({
              where: { referralCode: validRef! },
              data: { rewardUnlocked: true },
            });
          }
        })
        .catch(() => {
          console.error("Referral tracking failed for code:", validRef);
        });
    }

    return NextResponse.json(
      { message: "You are on the waitlist.", referralCode: entry.referralCode },
      { status: 201 }
    );
  } catch (error) {
    console.error("Waitlist error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
