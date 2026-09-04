import { Router } from "express";
import multer from "multer";
import { uploadSingleImage } from "./uploadController.js";

const router = Router();

// Memory storage keeps file in RAM (no clutter on disk)
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max limit
});

router.post("/", upload.single("image"), uploadSingleImage);

export default router;