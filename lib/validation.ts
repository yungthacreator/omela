import { z } from "zod";

export const allowedRoles = ["patient", "provider", "developer"] as const;

export const waitlistSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
  role: z.enum(allowedRoles),
  website: z.string().trim().max(0).optional().default(""),
  source: z.string().trim().max(100).optional(),
  marketingOptIn: z.boolean().optional().default(false),
});

export type WaitlistInput = z.infer<typeof waitlistSchema>;