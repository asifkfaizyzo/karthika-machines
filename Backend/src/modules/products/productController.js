import * as productService from "./productService.js";

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