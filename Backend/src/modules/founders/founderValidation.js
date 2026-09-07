import { z } from "zod";

export const founderSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  role: z.string().trim().min(1, "Role is required"),
  image: z.string().trim().min(1, "Image URL is required"),
  order: z.number().int().default(0),
  isActive: z.boolean().default(true),
});

export const bulkFounderSchema = z
  .array(founderSchema)
  .min(1, "At least one founder is required");

export const bulkDeleteSchema = z.object({
  ids: z.array(z.number().int()).min(1, "Provide at least one founder ID to delete"),
});