import { z } from "zod";

export const consultationSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Full name is required"),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Invalid email address"),

  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .refine(
      (val) => {
        if (!val) return false;
        const digitsOnly = val.replace(/\D/g, "");
        return digitsOnly.length >= 10 && digitsOnly.length <= 12;
      },
      { message: "Please enter a valid 10-digit phone number" }
    ),

  businessName: z
    .string()
    .trim()
    .min(1, "Business name is required"),

  role: z
    .string()
    .trim()
    .optional()
    .nullable()
    .transform((val) => (val === "" ? null : val)),

  city: z
    .string()
    .trim()
    .optional()
    .nullable()
    .transform((val) => (val === "" ? null : val)),

  interest: z
    .string()
    .trim()
    .min(1, "Please select an interest"),

  connectionMethods: z
    .array(z.string())
    .min(1, "Select at least one connection method"),

  additionalInfo: z
    .string()
    .trim()
    .optional()
    .nullable()
    .transform((val) => (val === "" ? null : val)),
});