import { Router } from "express";
import { bookConsultation } from "./consultationController.js";

const router = Router();

router.post("/", bookConsultation);

export default router;