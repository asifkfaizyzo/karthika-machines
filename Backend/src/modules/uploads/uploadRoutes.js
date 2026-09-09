import { Router } from "express";
import multer from "multer";
import { uploadSingleImage } from "./uploadController.js";

const router = Router();

// Memory storage keeps file in RAM (no clutter on disk)
const storage = multer.memoryStorage();

// File filter to restrict uploads ONLY to images
const imageFileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/gif",
    "image/svg+xml",
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file type. Only image files (JPG, PNG, WEBP, GIF, SVG) are allowed."
      ),
      false
    );
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max limit
  fileFilter: imageFileFilter,
});

router.post("/", upload.single("image"), uploadSingleImage);

export default router;