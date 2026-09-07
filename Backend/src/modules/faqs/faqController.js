import { z } from "zod";
import * as faqService from "./faqService.js";
import {
  faqSchema,
  bulkFaqSchema,
  bulkDeleteSchema,
} from "./faqValidation.js";

// Helper function to format Zod errors
const formatZodErrors = (error) => ({
  success: false,
  message: "Validation failed",
  errors: (error.issues || error.errors || []).map((e) => ({
    field: Array.isArray(e.path) ? e.path.join(".") : "",
    message: e.message,
  })),
});

export const getFaqs = async (req, res, next) => {
  try {
    const { limit } = req.query;
    const data = await faqService.fetchAllFaqs(limit);
    res.status(200).json({ success: true, count: data.length, data });
  } catch (error) {
    next(error);
  }
};

export const addFaq = async (req, res, next) => {
  try {
    const validated = faqSchema.parse(req.body);
    const created = await faqService.createFaq(validated);
    res.status(201).json({
      success: true,
      message: "FAQ created successfully",
      data: created,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json(formatZodErrors(error));
    }
    next(error);
  }
};

export const bulkAddFaqs = async (req, res, next) => {
  try {
    const validated = bulkFaqSchema.parse(req.body);
    const result = await faqService.createMultipleFaqs(validated);
    res.status(201).json({
      success: true,
      message: `${result.count} FAQs added successfully`,
      count: result.count,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json(formatZodErrors(error));
    }
    next(error);
  }
};



export const editFaq = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ success: false, message: "Invalid FAQ ID" });
    }

    const validated = faqSchema.partial().parse(req.body);
    const updated = await faqService.updateFaq(id, validated);
    res.status(200).json({
      success: true,
      message: "FAQ updated successfully",
      data: updated,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json(formatZodErrors(error));
    }
    next(error);
  }
};

export const removeFaq = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ success: false, message: "Invalid FAQ ID" });
    }

    await faqService.deleteFaq(id);
    res.status(200).json({
      success: true,
      message: "FAQ deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};


export const removeAllFaqs = async (req, res, next) => {
  try {
    const result = await faqService.deleteAllFaqs();
    res.status(200).json({
      success: true,
      message: "All FAQs deleted successfully",
      count: result.count,
    });
  } catch (error) {
    next(error);
  }
};

// Delete multiple selected FAQs by ID
export const removeBulkFaqs = async (req, res, next) => {
  try {
    const validated = bulkDeleteSchema.parse(req.body);
    const result = await faqService.deleteManyByIds(validated.ids);
    res.status(200).json({
      success: true,
      message: `${result.count} FAQs deleted successfully`,
      count: result.count,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json(formatZodErrors(error));
    }
    next(error);
  }
};
