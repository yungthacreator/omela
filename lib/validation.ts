import { z } from "zod";

export const allowedRoles = ["patient", "provider", "pharmacy"] as const;

export const waitlistSchema = z
  .object({
    email: z.string().trim().toLowerCase().email().max(254),
    role: z.enum(allowedRoles),
    website: z.string().trim().max(0).optional().default(""),
    source: z
      .string()
      .trim()
      .regex(/^[a-zA-Z0-9_-]+$/)
      .max(100)
      .optional(),
    marketingOptIn: z.boolean().optional().default(false),
    ref: z
      .string()
      .trim()
      .toLowerCase()
      .regex(/^[a-z0-9]+$/)
      .max(100)
      .optional(),
  })
  .strict();

export type WaitlistInput = z.infer<typeof waitlistSchema>;