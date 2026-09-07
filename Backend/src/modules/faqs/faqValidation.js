import { z } from "zod";

export const faqSchema = z.object({
  question: z.string().trim().min(1, "Question is required"),
  answer: z.string().trim().min(1, "Answer is required"),
  order: z.number().int().default(0),
  isActive: z.boolean().default(true),
});

export const bulkFaqSchema = z
  .array(faqSchema)
  .min(1, "At least one FAQ is required");

export const bulkDeleteSchema = z.object({
  ids: z.array(z.number().int()).min(1, "Provide at least one FAQ ID to delete"),
});