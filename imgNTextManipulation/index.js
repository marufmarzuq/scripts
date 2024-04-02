const { createCanvas, loadImage } = require("canvas");
const fs = require("fs");

async function createSquareImage(imageUrl, text) {
  const image = await loadImage(imageUrl);
  const font_size = 44;
  const line_height = 48;
  const size = Math.max(image.width, image.height);
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, size, size / 3);

  ctx.drawImage(image, 0, size / 3, size, (2 * size) / 3);

  ctx.font = `700 ${font_size}px "Source Sans Pro", sans-serif`;
  ctx.fillStyle = "#444444";
  ctx.textAlign = "center";

  const maxTextWidth = size - 50;
  const lines = splitTextIntoLines(ctx, text, maxTextWidth);

  const startY = size / 6;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const textY = startY + i * line_height;
    ctx.fillText(line, size / 2, textY);
  }

  const output = fs.createWriteStream(__dirname + "/output_image11.png");
  const stream = canvas.createPNGStream();
  stream.pipe(output);
  console.log("Image saved successfully.");
}

const splitTextIntoLines = (ctx, text, maxWidth) => {
  const words = text.split(" ");
  const lines = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const width = ctx.measureText(currentLine + " " + word).width;
    if (width < maxWidth) {
      currentLine += " " + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  lines.push(currentLine);
  return lines;
};

// Example usage
const imageUrl =
  "https://images.prothomalo.com/prothomalo-bangla/2024-04/7001f419-3150-4411-902c-a1333a82043f/434733160_855161323289969_4363820261461181310_n.jpg";
const text = "হচ্ছে না প্রিমিয়ার লিগের দুটি ম্যাচ, কারণ সাভারের দুর্ঘটনা";

createSquareImage(imageUrl, text);
