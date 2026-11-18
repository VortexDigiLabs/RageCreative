const fs = require("fs");
const path = require("path");
const https = require("https");
const sharp = require("sharp");

const CLOUDINARY_URL =
  "https://res.cloudinary.com/ddfuc0ktg/image/upload/f_auto/q_auto/gemini-3.1-flash-lite-image_nano-banana-2-lite__a_PLease_upscale_and_i_cwuwct.jpg";

function download(url, dest) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          return download(res.headers.location, dest).then(resolve).catch(reject);
        }
        if (res.statusCode !== 200) {
          return reject(new Error(`Failed to download: status ${res.statusCode}`));
        }
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on("finish", () => file.close(resolve));
      })
      .on("error", reject);
  });
}

async function run() {
  console.log("1. Downloading original client logo from Cloudinary...");
  const tempJpg = "/tmp/client-logo-cloudinary.jpg";
  await download(CLOUDINARY_URL, tempJpg);
  console.log("Downloaded successfully to", tempJpg);

  // Ensure output directories exist
  ["public", "public/assets", "assets"].forEach((dir) => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  });

  // Preserve untouched original
  fs.copyFileSync(tempJpg, "public/client-logo-original.jpg");
  fs.copyFileSync(tempJpg, "public/assets/client-logo-original.jpg");
  fs.copyFileSync(tempJpg, "assets/client-logo-original.jpg");

  console.log("2. Processing pixels for pristine anti-aliased transparency...");
  const { data, info } = await sharp(tempJpg)
    .raw()
    .toBuffer({ resolveWithObject: true });

  const numPixels = info.width * info.height;
  const darkBuf = Buffer.alloc(numPixels * 4);
  const whiteBuf = Buffer.alloc(numPixels * 4);

  // Background threshold for razor-sharp transparent extraction
  const upperLuma = 242;
  const lowerLuma = 25;

  for (let i = 0; i < numPixels; i++) {
    const r = data[i * 3];
    const g = data[i * 3 + 1];
    const b = data[i * 3 + 2];
    const luma = 0.299 * r + 0.587 * g + 0.114 * b;

    let alpha = 0;
    if (luma < upperLuma) {
      if (luma <= lowerLuma) {
        alpha = 255;
      } else {
        const factor = (upperLuma - luma) / (upperLuma - lowerLuma);
        alpha = Math.round(factor * 255);
      }
    }

    // Pure black (#000000) for dark brand logo
    darkBuf[i * 4] = 0;
    darkBuf[i * 4 + 1] = 0;
    darkBuf[i * 4 + 2] = 0;
    darkBuf[i * 4 + 3] = alpha;

    // Pure white (#FFFFFF) for light surfaces
    whiteBuf[i * 4] = 255;
    whiteBuf[i * 4 + 1] = 255;
    whiteBuf[i * 4 + 2] = 255;
    whiteBuf[i * 4 + 3] = alpha;
  }

  // Trimmed buffers
  const darkTrimmedBuf = await sharp(darkBuf, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .trim()
    .extend({ top: 30, bottom: 30, left: 30, right: 30, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ quality: 100, compressionLevel: 9 })
    .toBuffer();

  const whiteTrimmedBuf = await sharp(whiteBuf, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .trim()
    .extend({ top: 30, bottom: 30, left: 30, right: 30, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ quality: 100, compressionLevel: 9 })
    .toBuffer();

  console.log("3. Writing primary landscape and stacked image assets...");
  // Primary dark logo (referenced by /Rage Creative Logo landscape.png)
  fs.writeFileSync("public/Rage Creative Logo landscape.png", darkTrimmedBuf);
  fs.copyFileSync("public/Rage Creative Logo landscape.png", "public/assets/Rage Creative Logo landscape.png");
  fs.copyFileSync("public/Rage Creative Logo landscape.png", "assets/Rage Creative Logo landscape.png");

  // Primary stacked logo
  fs.writeFileSync("public/assets/Rage Creative Logo stacked.png", darkTrimmedBuf);
  fs.copyFileSync("public/assets/Rage Creative Logo stacked.png", "assets/Rage Creative Logo stacked.png");

  // Primary white logo (for dark navbar & footer)
  fs.writeFileSync("public/Rage Creative Logo landscape white.png", whiteTrimmedBuf);
  fs.copyFileSync("public/Rage Creative Logo landscape white.png", "public/assets/Rage Creative Logo landscape white.png");
  fs.copyFileSync("public/Rage Creative Logo landscape white.png", "assets/Rage Creative Logo landscape white.png");

  // White stacked logo
  fs.writeFileSync("public/assets/Rage Creative Logo stacked white.png", whiteTrimmedBuf);
  fs.copyFileSync("public/assets/Rage Creative Logo stacked white.png", "assets/Rage Creative Logo stacked white.png");

  console.log("4. Generating 8K master file per client JSON (7680x8595)...");
  await sharp(darkTrimmedBuf)
    .resize(7680, 8595, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ quality: 100, compressionLevel: 9 })
    .toFile("public/assets/Rage Creative Logo stacked-master-8k.png");

  console.log("5. Generating app icons and favicons...");
  // Helper for rounded-square app icon with light border
  async function makeAppIcon(size) {
    const rx = Math.round(size * 0.22);
    const strokeW = Math.max(1, Math.round(size * 0.015));
    const innerSize = Math.round(size * 0.72);

    const logoResized = await sharp(darkTrimmedBuf)
      .resize(innerSize, innerSize, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toBuffer();

    const bgSvg = `<svg width="${size}" height="${size}"><rect x="${strokeW}" y="${strokeW}" width="${size - strokeW * 2}" height="${size - strokeW * 2}" rx="${rx}" fill="#FFFFFF" stroke="#E2DDD5" stroke-width="${strokeW}" /></svg>`;

    return sharp(Buffer.from(bgSvg))
      .composite([{ input: logoResized, gravity: "centre" }])
      .png()
      .toBuffer();
  }

  const icon512 = await makeAppIcon(512);
  const icon256 = await makeAppIcon(256);
  const icon64 = await makeAppIcon(64);
  const icon32 = await makeAppIcon(32);

  fs.writeFileSync("public/assets/app-icon-512.png", icon512);
  fs.writeFileSync("public/assets/app-icon-256.png", icon256);
  fs.writeFileSync("public/assets/favicon-64.png", icon64);
  fs.writeFileSync("public/assets/favicon-32.png", icon32);
  fs.writeFileSync("public/favicon.ico", icon32);

  console.log("6. Generating vector SVGs with embedded lossless high-res client mark...");
  const darkBase64 = darkTrimmedBuf.toString("base64");
  const whiteBase64 = whiteTrimmedBuf.toString("base64");
  const darkMeta = await sharp(darkTrimmedBuf).metadata();

  const darkSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${darkMeta.width} ${darkMeta.height}" width="100%" height="100%">
  <image href="data:image/png;base64,${darkBase64}" width="${darkMeta.width}" height="${darkMeta.height}" />
</svg>`;

  const whiteSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${darkMeta.width} ${darkMeta.height}" width="100%" height="100%">
  <image href="data:image/png;base64,${whiteBase64}" width="${darkMeta.width}" height="${darkMeta.height}" />
</svg>`;

  fs.writeFileSync("public/rage-logo.svg", darkSvg);
  fs.writeFileSync("public/rage-logo-white.svg", whiteSvg);
  fs.writeFileSync("public/rage-logo-landscape.svg", darkSvg);
  fs.writeFileSync("public/rage-logo-landscape-white.svg", whiteSvg);

  // Favicon SVG with rounded square border
  const faviconSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
  <rect x="2" y="2" width="124" height="124" rx="28" fill="#FFFFFF" stroke="#E2DDD5" stroke-width="2" />
  <image href="data:image/png;base64,${darkBase64}" x="18" y="16" width="92" height="96" preserveAspectRatio="xMidYMid meet" />
</svg>`;
  fs.writeFileSync("public/favicon.svg", faviconSvg);

  console.log("7. Generating updated Gareth Ellis Business Card with exact client mark...");
  const logoOnCard = await sharp(darkTrimmedBuf)
    .resize(230, 260, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  const cardBaseSvg = `
<svg width="1050" height="600" xmlns="http://www.w3.org/2000/svg">
  <rect width="1050" height="600" rx="14" fill="#FFFFFF" stroke="#E5E0D8" stroke-width="2" />
  
  <!-- Left Section (Contact Details) -->
  <g transform="translate(80, 135)">
    <text x="0" y="44" font-family="'Bodoni Moda', 'Playfair Display', serif" font-size="44" font-weight="700" fill="#141414" letter-spacing="1">Gareth Ellis</text>
    <text x="0" y="84" font-family="'Plus Jakarta Sans', sans-serif" font-size="20" font-weight="500" fill="#777777" letter-spacing="3">CEO</text>

    <g transform="translate(0, 145)" font-family="'Plus Jakarta Sans', sans-serif" font-size="18" fill="#333333">
      <g transform="translate(0, 0)">
        <path d="M4 2h4l2 5-2.5 1.5a11 11 0 005 5L14 11l5 2v4a2 2 0 01-2 2A16 16 0 013 4a2 2 0 011-2z" fill="#141414" transform="scale(1.2)" />
        <text x="36" y="16">072 786 4383</text>
      </g>
      <g transform="translate(0, 42)">
        <rect x="2" y="4" width="20" height="16" rx="2" fill="none" stroke="#141414" stroke-width="2" transform="scale(1.1)" />
        <path d="M3 5l9 7 9-7" fill="none" stroke="#141414" stroke-width="2" transform="scale(1.1)" />
        <text x="36" y="16">gareth@ragemodels.co.za</text>
      </g>
      <g transform="translate(0, 84)">
        <circle cx="12" cy="12" r="10" fill="none" stroke="#141414" stroke-width="2" transform="scale(1.1)" />
        <path d="M2 12h20 M12 2a15 15 0 010 20 M12 2a15 15 0 000 20" fill="none" stroke="#141414" stroke-width="2" transform="scale(1.1)" />
        <text x="36" y="16">ragemodels.co.za</text>
      </g>
      <g transform="translate(0, 126)">
        <path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7zm0 10a3 3 0 110-6 3 3 0 010 6z" fill="#141414" transform="scale(1.1)" />
        <text x="36" y="16">258 Main Avenue, Ferndale, Randburg</text>
      </g>
    </g>
  </g>

  <!-- Vertical Divider Line -->
  <line x1="530" y1="70" x2="530" y2="530" stroke="#DDD7CC" stroke-width="1.5" />

  <!-- Subtitle MODELS -->
  <text x="770" y="460" font-family="'Bodoni Moda', 'Playfair Display', serif" font-size="28" font-weight="700" fill="#141414" letter-spacing="12" text-anchor="middle">MODELS</text>
</svg>`;

  await sharp(Buffer.from(cardBaseSvg))
    .composite([{ input: logoOnCard, left: 655, top: 145 }])
    .png({ quality: 100 })
    .toFile("public/assets/gareth-ellis-business-card.png");

  fs.copyFileSync("public/assets/gareth-ellis-business-card.png", "assets/gareth-ellis-business-card.png");

  console.log("SUCCESS: All assets successfully created from the official Cloudinary logo!");
}

run().catch((err) => {
  console.error("Processing failed:", err);
  process.exit(1);
});
