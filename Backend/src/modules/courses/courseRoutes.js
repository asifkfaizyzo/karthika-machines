import { Router } from "express";
import { getCourses, getCourseDetail, addCourse,
         editCourse, removeCourse, changeCourseStatus
       } from "./courseController.js";

const router = Router();


router.get("/", getCourses);        // GET /api/courses?limit=3
router.get("/:identifier", getCourseDetail);
router.post("/", addCourse);

// NEW ROUTES:
router.put("/:id", editCourse);              // Update
router.delete("/:id", removeCourse);         // Hard Delete
router.patch("/:id/status", changeCourseStatus); // Soft Delete (Toggle active)

export default router;