import { Router } from "express";
import { loginAdmin, getMe } from "./authController.js";
import { verifyAdmin } from "../../middleware/authMiddleware.js";

const router = Router();

router.post("/login", loginAdmin);
router.get("/me", verifyAdmin, getMe);

export default router;