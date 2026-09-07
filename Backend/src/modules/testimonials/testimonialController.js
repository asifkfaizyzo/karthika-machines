import { z } from "zod";
import * as testimonialService from "./testimonialService.js";
import { testimonialSchema } from "./testimonialValidation.js";

export const getTestimonials = async (req, res, next) => {
  try {
    const { limit, home, type } = req.query;
    const data = await testimonialService.fetchAllTestimonials({ limit, home, type });
    res.status(200).json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getTestimonialById = async (req, res, next) => {
  try {
    const item = await testimonialService.fetchTestimonialById(req.params.id);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

export const addTestimonial = async (req, res, next) => {
  try {
    const validated = testimonialSchema.parse(req.body);
    const created = await testimonialService.createTestimonial(validated);
    res.status(201).json({
      success: true,
      message: "Testimonial created successfully",
      data: created,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: (error.issues || error.errors || []).map((e) => ({
          field: Array.isArray(e.path) ? e.path.join(".") : "",
          message: e.message,
        })),
      });
    }
    next(error);
  }
};

export const editTestimonial = async (req, res, next) => {
  try {
    const validated = testimonialSchema.partial().parse(req.body);
    const updated = await testimonialService.updateTestimonial(req.params.id, validated);
    res.status(200).json({
      success: true,
      message: "Testimonial updated successfully",
      data: updated,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: (error.issues || error.errors || []).map((e) => ({
          field: Array.isArray(e.path) ? e.path.join(".") : "",
          message: e.message,
        })),
      });
    }
    next(error);
  }
};

export const removeTestimonial = async (req, res, next) => {
  try {
    await testimonialService.deleteTestimonial(req.params.id);
    res.status(200).json({
      success: true,
      message: "Testimonial deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const changeTestimonialStatus = async (req, res, next) => {
  try {
    const updated = await testimonialService.toggleTestimonialStatus(req.params.id);
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }
    res.status(200).json({
      success: true,
      message: `Testimonial is now ${updated.isActive ? "Active" : "Inactive"}`,
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};