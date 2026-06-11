import { z } from "zod";

export const createRoleSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().optional(),
  permissionIds: z.array(z.string()).default([]),
});

export const updateRoleSchema =
  createRoleSchema.partial();