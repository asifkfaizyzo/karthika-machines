import { z } from "zod";
import * as productService from "./productService.js";
import { productSchema, bulkProductSchema, 
         bulkDeleteSchema } from "./productValidation.js";

// GET /api/products
export const getProducts = async (req, res, next) => {
  try {
     const { limit } = req.query; // <-- Extract limit from URL
    const products = await productService.fetchAllProducts(limit);   //pass limit to service layer
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
    const requestData = {
      features: [],
      specs: [],
      whyChoose: [],
      ...req.body,
    };

    const validatedData = productSchema.parse(requestData);
    const newProduct = await productService.createProduct(validatedData);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (error) {
    // Catch duplicate product errors (Prisma Code P2002)
    if (error.code === "P2002") {
      return res.status(400).json({
        success: false,
        message: "A product with this Title or URL Slug already exists in your catalog. Please use a different name.",
      });
    }

    // Catch Zod Validation Errors
    if (error.name === "ZodError" || error.issues || error.errors) {
      const issueList = error.issues || error.errors || [];
      const firstIssue = issueList[0];
      const errorMessage = firstIssue
        ? `Please check '${firstIssue.path.join(".")}': ${firstIssue.message}`
        : "Validation failed";

      return res.status(400).json({
        success: false,
        message: errorMessage,
      });
    }

    next(error);
  }
};


// 2. ADD THESE 3 NEW CONTROLLERS:
export const editProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    // We can reuse the same schema, but make it partial (all fields optional) for updates
    const validatedData = productSchema.partial().parse(req.body);
    const updatedProduct = await productService.updateProduct(id, validatedData);
    
    res.status(200).json({ success: true, message: "Product updated", data: updatedProduct });
  } catch (error) { next(error); }
};

export const removeProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    await productService.deleteProduct(id);
    res.status(200).json({ success: true, message: "Product permanently deleted" });
  } catch (error) { next(error); }
};

export const changeProductStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedProduct = await productService.toggleProductStatus(id);
    res.status(200).json({ success: true, message: `Product is now ${updatedProduct.isActive ? 'Active' : 'Inactive'}`, data: updatedProduct });
  } catch (error) { next(error); }
};


// 👇 Add these 3 controller functions
export const bulkAddProducts = async (req, res, next) => {
  try {
    const validatedData = bulkProductSchema.parse(req.body);
    const newProducts = await productService.createMultipleProducts(validatedData);

    res.status(201).json({
      success: true,
      message: `${newProducts.length} Products created successfully`,
      count: newProducts.length,
      data: newProducts,
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

export const removeBulkProducts = async (req, res, next) => {
  try {
    const validatedData = bulkDeleteSchema.parse(req.body);
    const result = await productService.deleteManyProductsByIds(validatedData.ids);
    res.status(200).json({
      success: true,
      message: `${result.count} Products permanently deleted`,
      count: result.count,
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

export const removeAllProducts = async (req, res, next) => {
  try {
    const result = await productService.deleteAllProducts();
    res.status(200).json({
      success: true,
      message: "All products permanently deleted",
      count: result.count,
    });
  } catch (error) {
    next(error);
  }
};