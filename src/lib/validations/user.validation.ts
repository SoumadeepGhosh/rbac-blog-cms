import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  roleId: z.string(),
});

export const updateUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  roleId: z.string().optional(),
  isActive: z.boolean().optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;

export type UpdateUserInput = z.infer<typeof updateUserSchema>;
