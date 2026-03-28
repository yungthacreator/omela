import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

export const waitlistRatelimit =
  redisUrl &&
  redisToken &&
  !redisUrl.includes("your_upstash") &&
  !redisToken.includes("your_upstash")
    ? new Ratelimit({
        redis: Redis.fromEnv(),
        limiter: Ratelimit.slidingWindow(5, "10 m"),
        analytics: true,
        prefix: "smart-health:waitlist",
      })
    : null;