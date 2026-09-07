import * as courseService from "./courseService.js";
import { z } from "zod";
import { courseSchema, bulkCourseSchema,
         bulkDeleteSchema, } from "./courseValidation.js";

export const getCourses = async (req, res, next) => {
  try {
    const { limit } = req.query; // <-- Extract limit
    const courses = await courseService.fetchAllCourses(limit); // <-- Pass limit to service function
    res.status(200).json({
      success: true,
      count: courses.length,
      data: courses,
    });
  } catch (error) {
    next(error);
  }
};

export const getCourseDetail = async (req, res, next) => {
  try {
    const { identifier } = req.params;
    const course = await courseService.fetchCourseByIdOrSlug(identifier);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    next(error);
  }
};


export const addCourse = async (req, res, next) => {
  try {
    const validatedData = courseSchema.parse(req.body);
    const newCourse = await courseService.createCourse(validatedData);

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: newCourse,
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


// 2. ADD THESE 3 NEW CONTROLLERS:
export const editCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const validatedData = courseSchema.partial().parse(req.body);
    const updatedCourse = await courseService.updateCourse(id, validatedData);
    res.status(200).json({ success: true, message: "Course updated", data: updatedCourse });
  } catch (error) { next(error); }
};

export const removeCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    await courseService.deleteCourse(id);
    res.status(200).json({ success: true, message: "Course permanently deleted" });
  } catch (error) { next(error); }
};

export const changeCourseStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedCourse = await courseService.toggleCourseStatus(id);
    res.status(200).json({ success: true, message: `Course is now ${updatedCourse.isActive ? 'Active' : 'Inactive'}`, data: updatedCourse });
  } catch (error) { next(error); }
};


// 👇 Add these 3 controller functions
export const bulkAddCourses = async (req, res, next) => {
  try {
    const validatedData = bulkCourseSchema.parse(req.body);
    const newCourses = await courseService.createMultipleCourses(validatedData);

    res.status(201).json({
      success: true,
      message: `${newCourses.length} Courses created successfully`,
      count: newCourses.length,
      data: newCourses,
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

export const removeBulkCourses = async (req, res, next) => {
  try {
    const validatedData = bulkDeleteSchema.parse(req.body);
    const result = await courseService.deleteManyCoursesByIds(validatedData.ids);
    res.status(200).json({
      success: true,
      message: `${result.count} Courses permanently deleted`,
      count: result.count,
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

export const removeAllCourses = async (req, res, next) => {
  try {
    const result = await courseService.deleteAllCourses();
    res.status(200).json({
      success: true,
      message: "All courses permanently deleted",
      count: result.count,
    });
  } catch (error) {
    next(error);
  }
};