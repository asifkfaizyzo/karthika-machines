import { Router } from "express";
import {
  getProducts,
  getProductDetail,
  addProduct, bulkAddProducts,editProduct,
  removeProduct, removeAllProducts,
  removeBulkProducts,changeProductStatus
} from "./productController.js";

const router = Router();

// Public read routes
router.get("/", getProducts);
router.get("/:identifier", getProductDetail);
router.post("/", addProduct);                 // Developer add product route
router.post("/bulk", bulkAddProducts); 

router.delete("/all", removeAllProducts);     // 👈 Delete All Products
router.delete("/bulk", removeBulkProducts);   // 👈 Bulk Delete by IDs

router.put("/:id", editProduct);              // Update
router.delete("/:id", removeProduct);         // Hard Delete
router.patch("/:id/status", changeProductStatus); // Soft Delete (Toggle active)

export default router;