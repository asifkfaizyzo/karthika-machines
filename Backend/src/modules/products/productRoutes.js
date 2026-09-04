import { Router } from "express";
import { getProducts, getProductDetail } from "./productController.js";

const router = Router();

router.get("/", getProducts);
router.get("/:identifier", getProductDetail);

export default router;