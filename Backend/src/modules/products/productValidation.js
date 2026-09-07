//This validates incoming product data (including Cloudinary image URLs and nested arrays):

import { z } from "zod";

export const productSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Product title is required"),

  slug: z
    .string()
    .trim()
    .min(1, "Product slug is required")
    .toLowerCase(),

  price: z
    .string()
    .trim()
    .min(1, "Price is required"),

  shortDescription: z
    .string()
    .trim()
    .min(1, "Short description is required"),

  longDescription: z
    .string()
    .trim()
    .min(1, "Long description is required"),

  mainImage: z
    .string()
    .trim()
    .min(1, "Main image URL is required"),

  aboutImage: z
    .string()
    .trim()
    .optional()
    .nullable()
    .transform((val) => (val === "" ? null : val)),

  rating: z
    .number()
    .min(0)
    .max(5)
    .default(4.0),

  isActive: z
    .boolean()
    .default(true),

  // Key Features array
  features: z
    .array(
      z.object({
        text: z.string().trim().min(1, "Feature text cannot be empty"),
        order: z.number().default(0),
      })
    )
    .optional()
    .default([]),

  // Technical Specifications array
  specs: z
    .array(
      z.object({
        label: z.string().trim().min(1, "Spec label cannot be empty"),
        value: z.string().trim().min(1, "Spec value cannot be empty"),
        order: z.number().default(0),
      })
    )
    .optional()
    .default([]),

  // "Why Choose This Machine" accordion items
  whyChoose: z
    .array(
      z.object({
        title: z.string().trim().min(1, "Accordion title cannot be empty"),
        detail: z.string().trim().min(1, "Accordion detail cannot be empty"),
        order: z.number().default(0),
      })
    )
    .optional()
    .default([]),
});

// 👇 Add these 2 validation schemas
export const bulkProductSchema = z
  .array(productSchema)
  .min(1, "At least one product is required");

export const bulkDeleteSchema = z.object({
  ids: z.array(z.number().int()).min(1, "Provide at least one product ID to delete"),
});