import { z } from "zod";

export const courseSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  slug: z.string().trim().min(1, "Slug is required").toLowerCase(),
  duration: z.string().trim().min(1, "Duration is required"),
  qualification: z.string().trim().min(1, "Qualification is required"),
  students: z.string().trim().default("135 Students"),
  shortDescription: z.string().trim().min(1, "Short description is required"),
  longDescription: z.string().trim().min(1, "Long description is required"),
  mainImage: z.string().trim().min(1, "Main image URL is required"),
  aboutImage: z.string().trim().optional().nullable(),
  rating: z.number().min(0).max(5).default(4.0),
  isActive: z.boolean().default(true),

  keyPoints: z
    .array(
      z.object({
        text: z.string().trim().min(1),
        order: z.number().default(0),
      })
    )
    .optional()
    .default([]),

  lessons: z
    .array(
      z.object({
        title: z.string().trim().min(1),
        detail: z.string().trim().min(1),
        order: z.number().default(0),
      })
    )
    .optional()
    .default([]),
});