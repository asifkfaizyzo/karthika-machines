import { Router } from "express";
import {
  getFaqs,
  addFaq,
  bulkAddFaqs,
  editFaq,
  removeFaq,
  removeAllFaqs,
  removeBulkFaqs,
} from "./faqController.js";

const router = Router();

router.get("/", getFaqs);
router.post("/", addFaq);
router.post("/bulk", bulkAddFaqs);

// 👇 Place bulk/all deletes BEFORE /:id
router.delete("/all", removeAllFaqs);
router.delete("/bulk", removeBulkFaqs);

router.put("/:id", editFaq);
router.delete("/:id", removeFaq);

export default router;