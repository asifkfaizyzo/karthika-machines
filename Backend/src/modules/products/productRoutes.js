import { Router } from "express";
import {
  getProducts,
  getProductDetail,
  addProduct,
} from "./productController.js";

const router = Router();

// Public read routes
router.get("/", getProducts);
router.get("/:identifier", getProductDetail);

// Developer add product route
router.post("/", addProduct);

export default router;