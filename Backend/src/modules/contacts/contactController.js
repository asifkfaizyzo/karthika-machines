import { z } from "zod";
import * as contactService from "./contactService.js";
import { inquirySchema } from "./contactValidation.js";
import { sendContactNotification } from "../../utils/mailer.js";

const formatZodErrors = (error) => ({
  success: false,
  message: "Validation failed",
  errors: (error.issues || error.errors || []).map((e) => ({
    field: Array.isArray(e.path) ? e.path.join(".") : "",
    message: e.message,
  })),
});

export const createInquiry = async (req, res, next) => {
  try {
    const validated = inquirySchema.parse(req.body);
    const created = await contactService.saveInquiry(validated);

    // 👈 2. Trigger email sending and log error if SMTP fails
    try {
      await sendContactNotification(validated);
      console.log("📧 Email sent successfully to company!");
    } catch (emailErr) {
      console.error("❌ Email sending failed:", emailErr.message);
    }

    res.status(201).json({
      success: true,
      message: "Your message has been sent successfully!",
      data: created,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json(formatZodErrors(error));
    }
    next(error);
  }
};



export const getInquiries = async (req, res, next) => {
  try {
    const data = await contactService.fetchAllInquiries();
    res.status(200).json({ success: true, count: data.length, data });
  } catch (error) {
    next(error);
  }
};

export const removeInquiry = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ success: false, message: "Invalid Inquiry ID" });
    }
    await contactService.deleteInquiry(id);
    res.status(200).json({ success: true, message: "Inquiry deleted successfully" });
  } catch (error) {
    next(error);
  }
};