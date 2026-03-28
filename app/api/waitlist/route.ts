import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { waitlistSchema } from "@/lib/validation";
import { limitWaitlist } from "@/lib/ratelimit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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
  return createHash("sha256").update(ip).digest("hex");
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);

  try {
    const rate = await limitWaitlist(`waitlist:${ip}`);

    if (!rate.success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        {
          status: 429,
          headers: {
            ...(typeof rate.limit === "number"
              ? { "X-RateLimit-Limit": String(rate.limit) }
              : {}),
            ...(typeof rate.remaining === "number"
              ? { "X-RateLimit-Remaining": String(rate.remaining) }
              : {}),
            ...(typeof rate.reset === "number"
              ? { "X-RateLimit-Reset": String(rate.reset) }
              : {}),
          },
        }
      );
    }

    let body: unknown;

    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid request body." },
        { status: 400 }
      );
    }

    const parsed = waitlistSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request data." },
        { status: 400 }
      );
    }

    const email = parsed.data.email.trim().toLowerCase();
    const role = parsed.data.role;
    const website = parsed.data.website?.trim() || "";
    const source = parsed.data.source?.trim() || "landing-page";
    const marketingOptIn = Boolean(parsed.data.marketingOptIn);

    if (website) {
      return NextResponse.json(
        { error: "Invalid submission." },
        { status: 400 }
      );
    }

    await prisma.waitlistEntry.create({
      data: {
        email,
        role,
        source,
        marketingOptIn,
        ipHash: ip === "unknown" ? null : hashIp(ip),
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "You're in. Laura will reach out as early access opens.",
      },
      { status: 201 }
    );
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        { error: "This email is already on the waitlist." },
        { status: 409 }
      );
    }

    console.error("WAITLIST_POST_ERROR", error);

    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}