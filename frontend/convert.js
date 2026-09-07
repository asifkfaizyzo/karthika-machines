import sharp from "sharp";
import fs from "fs";

// Put the images you want to convert here:
const imagesToConvert = [
  { input: "./src/assets/aboutBGimg.png", output: "./src/assets/aboutBGimg.webp" },
  { input: "./src/assets/Machines.png", output: "./src/assets/Machines.webp" },
  { input: "./src/assets/contactBG.png", output: "./src/assets/contactBG.webp" },
   { input: "./src/assets/courseBG.png", output: "./src/assets/courseBG.webp" },
    { input: "./src/assets/produBackgrnd.png", output: "./src/assets/produBackgrnd.webp" },
     { input: "./src/assets/testiBGimg.png", output: "./src/assets/testiBGimg.webp" },
     { input: "./src/assets/courseDetailsBG.png", output: "./src/assets/courseDetailsBG.webp" },
      { input: "./src/assets/Frame 455.png", output: "./src/assets/Frame 455.webp" },
];

imagesToConvert.forEach(({ input, output }) => {
  if (fs.existsSync(input)) {
    sharp(input)
      .resize(1920) // standard screen width
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