import { Router } from "express";
import {
  bookConsultation,
  getConsultations,
  removeConsultation,
} from "./consultationController.js";

const router = Router();

router.post("/", bookConsultation);         // POST /api/consultations (Public Website)
router.get("/", getConsultations);          // GET /api/consultations (Admin Panel)
router.delete("/:id", removeConsultation);   // DELETE /api/consultations/:id (Admin Panel)

export default router;