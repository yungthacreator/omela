import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

type WaitlistRateLimitResult = {
  success: boolean;
  limit?: number;
  remaining?: number;
  reset?: number;
};

const redisUrl = process.env.UPSTASH_REDIS_REST_URL?.trim();
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();

function isUsableEnvValue(value?: string) {
  if (!value) return false;
  const normalized = value.toLowerCase();
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

export async function limitWaitlist(
  identifier: string
): Promise<WaitlistRateLimitResult> {
  if (!ratelimit) {
    return { success: true };
  }

  try {
    const result = await ratelimit.limit(identifier);

    return {
      success: result.success,
      limit: result.limit,
      remaining: result.remaining,
      reset: result.reset,
    };
  } catch (error) {
    console.error("WAITLIST_RATELIMIT_ERROR", error);

    return { success: true };
  }
}
export const rateLimit = limitWaitlist;