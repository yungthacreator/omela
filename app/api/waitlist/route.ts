import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

import { prisma } from "@/lib/prisma";
import { rateLimit, type RateLimitResult } from "@/lib/ratelimit";
import { waitlistSchema } from "@/lib/validation";

const DEFAULT_SOURCE = "landing-page";
const REFERRAL_CODE_LENGTH = 10;
const MAX_CREATE_ATTEMPTS = 5;

function buildHeaders(rate?: Pick<RateLimitResult, "limit" | "remaining" | "reset">): HeadersInit {
  const headers: Record<string, string> = {
    "Cache-Control": "no-store",
  };

  if (rate?.limit !== null && rate?.limit !== undefined) {
    headers["X-RateLimit-Limit"] = String(rate.limit);
  }

  if (rate?.remaining !== null && rate?.remaining !== undefined) {
    headers["X-RateLimit-Remaining"] = String(rate.remaining);
  }

  if (rate?.reset !== null && rate?.reset !== undefined) {
    headers["X-RateLimit-Reset"] = String(rate.reset);
  }

  return headers;
}

function json(data: Record<string, unknown>, status: number, rate?: Pick<RateLimitResult, "limit" | "remaining" | "reset">) {
  return NextResponse.json(data, {
    status,
    headers: buildHeaders(rate),
  });
}

function getClientIp(req: NextRequest): string | null {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const first = forwardedFor.split(",")[0]?.trim();
    if (first) {
      return first;
    }
  }

  const realIp = req.headers.get("x-real-ip")?.trim();
  if (realIp) {
    return realIp;
  }

  return null;
}

function getIpHashSalt(): string | null {
  const salt = process.env.IP_HASH_SALT?.trim();

  if (salt) {
    return salt;
  }

  if (process.env.NODE_ENV !== "production") {
    return "local-dev-ip-salt";
  }

  return null;
}

function hashIp(ip: string, salt: string): string {
  return crypto.createHash("sha256").update(`${ip}:${salt}`).digest("hex");
}

function generateReferralCode(): string {
  return crypto
    .randomBytes(Math.ceil(REFERRAL_CODE_LENGTH / 2))
    .toString("hex")
    .slice(0, REFERRAL_CODE_LENGTH);
}

function isUniqueConstraintError(error: unknown): error is Prisma.PrismaClientKnownRequestError {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2002"
  );
}

function getUniqueConstraintTargets(error: Prisma.PrismaClientKnownRequestError): string[] {
  const target = error.meta?.target;

  if (Array.isArray(target)) {
    return target.map(String);
  }

  if (typeof target === "string") {
    return [target];
  }

  return [];
}

export async function POST(req: NextRequest) {
  const clientIp = getClientIp(req);
  const limiter = await rateLimit(clientIp ?? "anonymous");

  if (!limiter.success) {
    return json(
      { error: "Too many requests. Please try again later." },
      429,
      limiter
    );
  }

  let rawBody: unknown;

  try {
    rawBody = await req.json();
  } catch {
    return json({ error: "Invalid request body." }, 400, limiter);
  }

  const parsed = waitlistSchema.safeParse(rawBody);

  if (!parsed.success) {
    return json(
      { error: "Please enter a valid email address and select a valid role." },
      400,
      limiter
    );
  }

  const data = parsed.data;

  if (data.website.length > 0) {
    return json({ message: "You are on the waitlist." }, 200, limiter);
  }

  const ipHashSalt = getIpHashSalt();

  if (process.env.NODE_ENV === "production" && !ipHashSalt) {
    console.error("WAITLIST_IP_HASH_SALT_MISSING");
    return json({ error: "Server configuration error." }, 500, limiter);
  }

  const ipHash = clientIp && ipHashSalt ? hashIp(clientIp, ipHashSalt) : null;
  const source = data.source ?? DEFAULT_SOURCE;
  const ref = data.ref ?? null;

  const existing = await prisma.waitlistEntry.findUnique({
    where: { email: data.email },
    select: { referralCode: true },
  });

  if (existing) {
    return json(
      {
        error: "This email is already on the waitlist.",
        referralCode: existing.referralCode,
      },
      409,
      limiter
    );
  }

  let validRef: string | null = null;

  if (ref) {
    const referrer = await prisma.waitlistEntry.findUnique({
      where: { referralCode: ref },
      select: { referralCode: true },
    });

    if (referrer) {
      validRef = referrer.referralCode;
    }
  }

  for (let attempt = 0; attempt < MAX_CREATE_ATTEMPTS; attempt++) {
    const referralCode = generateReferralCode();

    try {
      const entry = await prisma.$transaction(async (tx) => {
        const created = await tx.waitlistEntry.create({
          data: {
            email: data.email,
            role: data.role,
            source,
            ipHash,
            marketingOptIn: data.marketingOptIn,
            referralCode,
            referredBy: validRef,
          },
        });

        if (validRef) {
          const referrer = await tx.waitlistEntry.update({
            where: { referralCode: validRef },
            data: {
              referralCount: {
                increment: 1,
              },
            },
            select: {
              referralCount: true,
              rewardUnlocked: true,
            },
          });

          if (referrer.referralCount >= 3 && !referrer.rewardUnlocked) {
            await tx.waitlistEntry.update({
              where: { referralCode: validRef },
              data: { rewardUnlocked: true },
            });
          }
        }

        return created;
      });

      return json(
        {
          message: "You are on the waitlist.",
          referralCode: entry.referralCode,
        },
        201,
        limiter
      );
    } catch (error) {
      if (isUniqueConstraintError(error)) {
        const targets = getUniqueConstraintTargets(error);

        if (targets.includes("email")) {
          const duplicate = await prisma.waitlistEntry.findUnique({
            where: { email: data.email },
            select: { referralCode: true },
          });

          return json(
            {
              error: "This email is already on the waitlist.",
              referralCode: duplicate?.referralCode ?? null,
            },
            409,
            limiter
          );
        }

        if (targets.includes("referralCode")) {
          continue;
        }
      }

      console.error("WAITLIST_CREATE_ERROR", error);
      return json(
        { error: "Something went wrong. Please try again." },
        500,
        limiter
      );
    }
  }

  console.error("WAITLIST_REFERRAL_CODE_EXHAUSTED");
  return json(
    { error: "Something went wrong. Please try again." },
    500,
    limiter
  );
}