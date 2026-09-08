// convert.js
import sharp from "sharp";
import fs from "fs";

const imagesToConvert = [
  // Home page images
  { input: "./src/assets/homeimg2.png", output: "./src/assets/homeimg2.webp" },
  { input: "./src/assets/frame1.png", output: "./src/assets/frame1.webp" },
  { input: "./src/assets/rectangle-6.png", output: "./src/assets/rectangle-6.webp" },
  { input: "./src/assets/rectangle-7.png", output: "./src/assets/rectangle-7.webp" },
  { input: "./src/assets/rectangle-8.png", output: "./src/assets/rectangle-8.webp" },
  { input: "./src/assets/backgrnd3.png", output: "./src/assets/backgrnd3.webp" },
  { input: "./src/assets/testimonials.png", output: "./src/assets/testimonials.webp" },

  // Carousel images
  { input: "./src/assets/carousel1.png", output: "./src/assets/carousel1.webp" },
  { input: "./src/assets/carousel2.png", output: "./src/assets/carousel2.webp" },
  { input: "./src/assets/carousel3.png", output: "./src/assets/carousel3.webp" },
  { input: "./src/assets/carousel4.png", output: "./src/assets/carousel4.webp" },
  { input: "./src/assets/carousel5.png", output: "./src/assets/carousel5.webp" },
];

imagesToConvert.forEach(({ input, output }) => {
  if (fs.existsSync(input)) {
    sharp(input)
      .resize(1920, null, { withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(output)
      .then((info) => {
        console.log(`✅ Converted ${output} (${(info.size / 1024).toFixed(1)} KB)`);
      })
      .catch((err) => console.error(`❌ Error on ${input}:`, err.message));
  } else {
    console.log(`⚠️ File not found: ${input}`);
  }
});