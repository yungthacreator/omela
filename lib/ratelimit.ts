import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

export type RateLimitResult = {
  success: boolean;
  limit: number | null;
  remaining: number | null;
  reset: number | null;
};

const redisUrl = process.env.UPSTASH_REDIS_REST_URL?.trim();
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
const isProduction = process.env.NODE_ENV === "production";

function isUsableEnvValue(value?: string): boolean {
  if (!value) {
    return false;
  }

  const normalized = value.trim().toLowerCase();

  return (
    normalized.length > 0 &&
    !normalized.includes("your_upstash") &&
    !normalized.includes("placeholder")
  );
}

const upstashEnabled =
  isUsableEnvValue(redisUrl) && isUsableEnvValue(redisToken);

const ratelimit = upstashEnabled
  ? new Ratelimit({
      redis: new Redis({
        url: redisUrl!,
        token: redisToken!,
      }),
      limiter: Ratelimit.slidingWindow(5, "10 m"),
      analytics: true,
      prefix: "omela:waitlist",
    })
  : null;

function getSafeIdentifier(identifier?: string | null): string {
  const value = identifier?.trim();

  if (!value) {
    return "anonymous";
  }

  return value.slice(0, 256);
}

export async function limitWaitlist(
  identifier?: string | null
): Promise<RateLimitResult> {
  const safeIdentifier = getSafeIdentifier(identifier);

  if (!ratelimit) {
    if (isProduction) {
      console.error("WAITLIST_RATELIMIT_UNAVAILABLE");

      return {
        success: false,
        limit: null,
        remaining: null,
        reset: null,
      };
    }

    return {
      success: true,
      limit: null,
      remaining: null,
      reset: null,
    };
  }

  try {
    const result = await ratelimit.limit(safeIdentifier);

    return {
      success: result.success,
      limit: result.limit,
      remaining: result.remaining,
      reset: result.reset,
    };
  } catch (error) {
    console.error("WAITLIST_RATELIMIT_ERROR", error);

    if (isProduction) {
      return {
        success: false,
        limit: null,
        remaining: null,
        reset: null,
      };
    }

    return {
      success: true,
      limit: null,
      remaining: null,
      reset: null,
    };
  }
}

export { limitWaitlist as rateLimit };