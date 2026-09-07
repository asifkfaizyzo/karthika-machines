import { z } from "zod";
import * as founderService from "./founderService.js";
import {
  founderSchema,
  bulkFounderSchema,
  bulkDeleteSchema,
} from "./founderValidation.js";

const formatZodErrors = (error) => ({
  success: false,
  message: "Validation failed",
  errors: (error.issues || error.errors || []).map((e) => ({
    field: Array.isArray(e.path) ? e.path.join(".") : "",
    message: e.message,
  })),
});

export const getFounders = async (req, res, next) => {
  try {
    const { limit } = req.query;
    const data = await founderService.fetchAllFounders(limit);
    res.status(200).json({ success: true, count: data.length, data });
  } catch (error) {
    next(error);
  }
};

export const addFounder = async (req, res, next) => {
  try {
    const validated = founderSchema.parse(req.body);
    const created = await founderService.createFounder(validated);
    res.status(201).json({
      success: true,
      message: "Founder created successfully",
      data: created,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json(formatZodErrors(error));
    }
    next(error);
  }
};

export const bulkAddFounders = async (req, res, next) => {
  try {
    const validated = bulkFounderSchema.parse(req.body);
    const result = await founderService.createMultipleFounders(validated);
    res.status(201).json({
      success: true,
      message: `${result.count} Founders added successfully`,
      count: result.count,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json(formatZodErrors(error));
    }
    next(error);
  }
};

export const editFounder = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ success: false, message: "Invalid Founder ID" });
    }

    const validated = founderSchema.partial().parse(req.body);
    const updated = await founderService.updateFounder(id, validated);
    res.status(200).json({
      success: true,
      message: "Founder updated successfully",
      data: updated,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json(formatZodErrors(error));
    }
    next(error);
  }
};

export const removeFounder = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ success: false, message: "Invalid Founder ID" });
    }

    await founderService.deleteFounder(id);
    res.status(200).json({
      success: true,
      message: "Founder deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const removeAllFounders = async (req, res, next) => {
  try {
    const result = await founderService.deleteAllFounders();
    res.status(200).json({
      success: true,
      message: "All Founders deleted successfully",
      count: result.count,
    });
  } catch (error) {
    next(error);
  }
};

export const removeBulkFounders = async (req, res, next) => {
  try {
    const validated = bulkDeleteSchema.parse(req.body);
    const result = await founderService.deleteManyByIds(validated.ids);
    res.status(200).json({
      success: true,
      message: `${result.count} Founders deleted successfully`,
      count: result.count,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json(formatZodErrors(error));
    }
    next(error);
  }
};