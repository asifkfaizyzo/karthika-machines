import { z } from "zod";
import * as consultationService from "./consultationService.js";
import { consultationSchema } from "./consultationValidation.js";
import { createNotification } from "../notifications/notificationService.js"; 

export const bookConsultation = async (req, res, next) => {
  try {
    const validatedData = consultationSchema.parse(req.body);
    const consultation = await consultationService.createNewConsultation(validatedData);

        // 👇 Create admin notification
    try {
      await createNotification({
        type: "CONSULTATION",
        title: "New Consultation Booking",
        message: `${validatedData.fullName} from ${validatedData.businessName} booked a consultation for ${validatedData.interest}`,
        relatedId: consultation.id,
        link: "/admin/consultations",
      });
    } catch (notifErr) {
      console.error("Failed to create notification:", notifErr.message);
    }

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

export const getConsultations = async (req, res, next) => {
  try {
    const data = await consultationService.fetchAllConsultations();
    res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const removeConsultation = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ success: false, message: "Invalid Consultation ID" });
    }

    await consultationService.deleteConsultation(id);
    res.status(200).json({
      success: true,
      message: "Consultation deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};