import { Router } from "express";
import {
  getTestimonials,
  getTestimonialById,
  addTestimonial,
  editTestimonial,
  removeTestimonial,
  changeTestimonialStatus,
} from "./testimonialController.js";

const router = Router();

router.get("/", getTestimonials);
router.get("/:id", getTestimonialById);
router.post("/", addTestimonial);
router.put("/:id", editTestimonial);
router.delete("/:id", removeTestimonial);
router.patch("/:id/status", changeTestimonialStatus);

export default router;