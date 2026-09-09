import { Router } from "express";
import {
  getNotifications,
  markOneAsRead,
  markAllRead,
  removeNotification,
  removeAllNotifications,
} from "./notificationController.js";
import { verifyAdmin } from "../../middleware/authMiddleware.js";

const router = Router();

// All notification routes require admin authentication
router.get("/", verifyAdmin, getNotifications);
router.patch("/:id/read", verifyAdmin, markOneAsRead);
router.patch("/read-all", verifyAdmin, markAllRead);
router.delete("/all", verifyAdmin, removeAllNotifications);
router.delete("/:id", verifyAdmin, removeNotification);

export default router;