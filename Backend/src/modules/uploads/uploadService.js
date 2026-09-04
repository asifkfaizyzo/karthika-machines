import cloudinary from "../../config/cloudinary.js";
import streamifier from "streamifier";

export const uploadImageToCloudinary = (fileBuffer, folder = "karthika_machines") => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    // Stream the buffer to Cloudinary without saving files to local disk
    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};