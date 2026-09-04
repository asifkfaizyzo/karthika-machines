import { z } from "zod";
import * as productService from "./productService.js";
import { productSchema } from "./productValidation.js";

// GET /api/products
export const getProducts = async (req, res, next) => {
  try {
    const products = await productService.fetchAllProducts();
    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/products/:identifier
export const getProductDetail = async (req, res, next) => {
  try {
    const { identifier } = req.params;
    const product = await productService.fetchProductByIdOrSlug(identifier);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/products
export const addProduct = async (req, res, next) => {
  try {
    const validatedData = productSchema.parse(req.body);
    const newProduct = await productService.createProduct(validatedData);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        errors: error.errors.map((e) => ({
          field: e.path.join("."),
          message: e.message,
        })),
      });
    }
    next(error);
  }
};