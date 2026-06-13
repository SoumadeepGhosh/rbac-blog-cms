import { z } from "zod";

export const createPostSchema =
  z.object({
    title: z
      .string()
      .min(3, "Title must be at least 3 characters"),

    slug: z
      .string()
      .min(3, "Slug must be at least 3 characters"),

    excerpt: z
      .string()
      .optional(),

    content: z
      .string()
      .min(10, "Content must be at least 10 characters"),

    categoryId: z
      .string()
      .min(1, "Please select a category"),

    featuredImage: z
      .string()
      .optional(),

    status: z.enum([
      "DRAFT",
      "PUBLISHED",
      "ARCHIVED",
    ]),
  });

export const updatePostSchema =
  createPostSchema.partial();