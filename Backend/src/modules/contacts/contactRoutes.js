import { Router } from "express";
import { createInquiry, getInquiries, removeInquiry } from "./contactController.js";

const router = Router();

router.post("/", createInquiry);
router.get("/", getInquiries);
router.delete("/:id", removeInquiry);

export default router;