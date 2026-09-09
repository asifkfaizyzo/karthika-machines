import { uploadImageToCloudinary } from "./uploadService.js";

export const uploadSingleImage = async (req, res, next) => {
  try {
    // 🔍 Debug log: Check if multer received the file
    if (!req.file) {
      console.error("❌ Multer Error: No file received or file rejected by fileFilter");
      return res.status(400).json({
        success: false,
        message: "No image file provided or file format is invalid.",
      });
    }

    console.log("📸 Received File:", req.file.originalname, `(${req.file.mimetype})`);

    const result = await uploadImageToCloudinary(req.file.buffer);

    console.log("✅ Cloudinary Upload Success:", result.secure_url);

    return res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      url: result.secure_url,
      publicId: result.public_id,
    });
  } catch (error) {
    console.error("❌ Cloudinary Error:", error.message || error);

    return res.status(400).json({
      success: false,
      message: error.message || "Failed to upload image to Cloudinary",
    });
  }
};