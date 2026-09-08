import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

import authRoutes from "./modules/auth/authRoutes.js";
import productRoutes from "./modules/products/productRoutes.js";
import courseRoutes from "./modules/courses/courseRoutes.js";
import consultationRoutes from "./modules/consultations/consultationRoutes.js";
import testimonialRoutes from "./modules/testimonials/testimonialRoutes.js";
import faqRoutes from "./modules/faqs/faqRoutes.js";
import founderRoutes from "./modules/founders/founderRoutes.js";
import contactRoutes from "./modules/contacts/contactRoutes.js";
import uploadRoutes from "./modules/uploads/uploadRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Body Parsers
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api/auth", authRoutes);
// Register Feature Modules
//Image & Media Upload Route (Cloudinary)
app.use("/api/upload", uploadRoutes); 


app.use("/api/products", productRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/consultations", consultationRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/faqs", faqRoutes);
app.use("/api/founders", founderRoutes);
app.use("/api/contacts", contactRoutes);

// Global Error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});