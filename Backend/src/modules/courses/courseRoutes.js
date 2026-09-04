import { Router } from "express";
import { getCourses, getCourseDetail, addCourse, } from "./courseController.js";

const router = Router();

router.post("/", addCourse);

router.get("/", getCourses);
router.get("/:identifier", getCourseDetail);

export default router;