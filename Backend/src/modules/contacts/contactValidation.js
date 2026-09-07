import { z } from "zod";

export const inquirySchema = z.object({
  name: z.string().trim().min(1, "Full name is required"),
  email: z
    .string()
    .trim()
    .min(1, "Email address is required")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"),
  phone: z
    .string()
    .trim()
    .refine((val) => {
      const digits = val.replace(/\D/g, "");
      return digits.length >= 10 && digits.length <= 12;
    }, {
      message: "Please enter a valid 10-digit phone number",
    }),
  message: z.string().trim().min(5, "Message must be at least 5 characters"),
});