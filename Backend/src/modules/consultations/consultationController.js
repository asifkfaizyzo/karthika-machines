import { z } from "zod";
import * as consultationService from "./consultationService.js";
import { consultationSchema } from "./consultationValidation.js";

export const bookConsultation = async (req, res, next) => {
  try {
    const validatedData = consultationSchema.parse(req.body);
    const consultation = await consultationService.createNewConsultation(validatedData);

    res.status(201).json({
      success: true,
      message: "Consultation booked successfully. Our team will contact you soon.",
      data: consultation,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const formattedErrors = (error.issues || error.errors || []).map((e) => ({
        field: Array.isArray(e.path) ? e.path.join(".") : "",
        message: e.message,
      }));

      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: formattedErrors,
      });
    }
    next(error);
  }
};