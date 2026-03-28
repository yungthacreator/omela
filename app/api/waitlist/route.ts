import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { waitlistSchema } from "@/lib/validation";
import { waitlistRatelimit } from "@/lib/ratelimit";

function getClientIp(req: NextRequest): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  const realIp = req.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }

  return "unknown";
}

function hashIp(ip: string): string {
  return crypto.createHash("sha256").update(ip).digest("hex");
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);

    if (waitlistRatelimit) {
      const rate = await waitlistRatelimit.limit(`waitlist:${ip}`);

      if (!rate.success) {
        return NextResponse.json(
          { error: "Too many requests. Please try again later." },
          { status: 429 }
        );
      }
    }

    const body = await req.json();
    const parsed = waitlistSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request data." },
        { status: 400 }
      );
    }

    const { email, role, website, source, marketingOptIn } = parsed.data;

    if (website) {
      return NextResponse.json(
        { error: "Invalid submission." },
        { status: 400 }
      );
    }

    const existing = await prisma.waitlistEntry.findUnique({
      where: { email },
    });

    if (existing) {
      return NextResponse.json(
        { error: "This email is already on the waitlist." },
        { status: 409 }
      );
    }

    await prisma.waitlistEntry.create({
      data: {
        email,
        role,
        source: source || "landing-page",
        marketingOptIn,
        ipHash: ip === "unknown" ? null : hashIp(ip),
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "You’re in. We’ll reach out as early access opens.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("WAITLIST_POST_ERROR", error);

    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}