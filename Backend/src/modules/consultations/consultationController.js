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
      return res.status(400).json({
        success: false,
        errors: error.errors.map((e) => ({
          field: e.path.join("."),
          message: e.message,
        })),
      });
    }
    next(error);
  }
};