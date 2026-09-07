import { Router } from "express";
import {
  getFounders,
  addFounder,
  bulkAddFounders,
  removeAllFounders,
  removeBulkFounders,
  editFounder,
  removeFounder,
} from "./founderController.js";

const router = Router();

router.get("/", getFounders);
router.post("/", addFounder);
router.post("/bulk", bulkAddFounders);

// Delete routes before /:id
router.delete("/all", removeAllFounders);
router.delete("/bulk", removeBulkFounders);

router.put("/:id", editFounder);
router.delete("/:id", removeFounder);

export default router;