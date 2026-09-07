import { z } from "zod";

export const testimonialSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  role: z.string().trim().min(1, "Role is required"),
  text: z.string().trim().min(1, "Testimonial text is required"),
  image: z
    .string()
    .trim()
    .optional()
    .nullable()
    .transform((val) => (val === "" ? null : val)),
  rating: z.number().min(0).max(5).default(5),
  type: z.enum(["IMAGE", "TEXT"]).default("TEXT"),
  showOnHome: z.boolean().default(true),
  order: z.number().int().default(0),
  isActive: z.boolean().default(true),
});