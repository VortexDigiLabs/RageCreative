const fs = require("fs");
const path = require("path");
const https = require("https");
const sharp = require("sharp");

const CLOUDINARY_URL =
  "https://res.cloudinary.com/ddfuc0ktg/image/upload/f_auto/q_auto/Rage_Creative_Logo_cxup8p.jpg";

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
  console.log("1. Downloading requested client logo from Cloudinary...");
  const tempJpg = "/tmp/client-rage-creative-logo.jpg";
  await download(CLOUDINARY_URL, tempJpg);
  console.log("Downloaded successfully to", tempJpg);

  // Ensure directories exist
  ["public", "public/assets", "assets"].forEach((dir) => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  });

  // Preserve untouched original
  fs.copyFileSync(tempJpg, "public/client-rage-creative-logo.jpg");
  fs.copyFileSync(tempJpg, "public/assets/client-rage-creative-logo.jpg");
  fs.copyFileSync(tempJpg, "assets/client-rage-creative-logo.jpg");

  console.log("2. Extracting exact logo content and building retina transparent assets...");
  // Crop content (minX: 104, maxX: 376, minY: 180, maxY: 301)
  const trimmedCrop = await sharp(tempJpg)
    .extract({ left: 104, top: 180, width: 272, height: 121 })
    .toBuffer();

  // Upscale 4x with lanczos3 to 1088x484 for retina clarity
  const { data, info } = await sharp(trimmedCrop)
    .resize(1088, 484, { kernel: "lanczos3" })
    .toColorspace("b-w")
    .raw()
    .toBuffer({ resolveWithObject: true });

  const numPixels = info.width * info.height;
  const darkRgba = Buffer.alloc(numPixels * 4);
  const whiteRgba = Buffer.alloc(numPixels * 4);

  const upperLuma = 250;
  const lowerLuma = 15;

  for (let i = 0; i < numPixels; i++) {
    const luma = data[i];
    let alpha = 0;
    if (luma < upperLuma) {
      if (luma <= lowerLuma) {
        alpha = 255;
      } else {
        const factor = (upperLuma - luma) / (upperLuma - lowerLuma);
        alpha = Math.min(255, Math.max(0, Math.round(Math.pow(factor, 0.95) * 255)));
      }
    }

    // Dark (#141414)
    darkRgba[i * 4] = 20;
    darkRgba[i * 4 + 1] = 20;
    darkRgba[i * 4 + 2] = 20;
    darkRgba[i * 4 + 3] = alpha;

    // White (#FFFFFF)
    whiteRgba[i * 4] = 255;
    whiteRgba[i * 4 + 1] = 255;
    whiteRgba[i * 4 + 2] = 255;
    whiteRgba[i * 4 + 3] = alpha;
  }

  // Primary transparent buffers with padding
  const darkTransparentBuf = await sharp(darkRgba, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .extend({ top: 24, bottom: 24, left: 36, right: 36, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ quality: 100, compressionLevel: 9 })
    .toBuffer();

  const whiteTransparentBuf = await sharp(whiteRgba, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .extend({ top: 24, bottom: 24, left: 36, right: 36, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ quality: 100, compressionLevel: 9 })
    .toBuffer();

  console.log("3. Writing primary landscape assets (navbar & headers)...");
  // Landscape dark
  fs.writeFileSync("public/Rage Creative Logo landscape.png", darkTransparentBuf);
  fs.copyFileSync("public/Rage Creative Logo landscape.png", "public/assets/Rage Creative Logo landscape.png");
  fs.copyFileSync("public/Rage Creative Logo landscape.png", "assets/Rage Creative Logo landscape.png");

  // Landscape white
  fs.writeFileSync("public/Rage Creative Logo landscape white.png", whiteTransparentBuf);
  fs.copyFileSync("public/Rage Creative Logo landscape white.png", "public/assets/Rage Creative Logo landscape white.png");
  fs.copyFileSync("public/Rage Creative Logo landscape white.png", "assets/Rage Creative Logo landscape white.png");

  // Stacked master
  fs.writeFileSync("public/assets/Rage Creative Logo stacked.png", darkTransparentBuf);
  fs.copyFileSync("public/assets/Rage Creative Logo stacked.png", "assets/Rage Creative Logo stacked.png");

  fs.writeFileSync("public/assets/Rage Creative Logo stacked white.png", whiteTransparentBuf);
  fs.copyFileSync("public/assets/Rage Creative Logo stacked white.png", "assets/Rage Creative Logo stacked white.png");

  console.log("4. Generating app icons and favicons...");
  async function makeAppIcon(size) {
    const rx = Math.round(size * 0.22);
    const strokeW = Math.max(1, Math.round(size * 0.015));
    const targetW = Math.round(size * 0.78);
    const targetH = Math.round(targetW / 2.2);

    const logoScaled = await sharp(darkTransparentBuf)
      .resize(targetW, targetH, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toBuffer();

    const bgSvg = `<svg width="${size}" height="${size}"><rect x="${strokeW}" y="${strokeW}" width="${size - strokeW * 2}" height="${size - strokeW * 2}" rx="${rx}" fill="#FFFFFF" stroke="#E2DDD5" stroke-width="${strokeW}" /></svg>`;

    return sharp(Buffer.from(bgSvg))
      .composite([{ input: logoScaled, gravity: "centre" }])
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

  console.log("5. Generating vector SVGs with embedded lossless high-res client mark...");
  const darkBase64 = darkTransparentBuf.toString("base64");
  const whiteBase64 = whiteTransparentBuf.toString("base64");
  const darkMeta = await sharp(darkTransparentBuf).metadata();

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

  const faviconSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
  <rect x="2" y="2" width="124" height="124" rx="28" fill="#FFFFFF" stroke="#E2DDD5" stroke-width="2" />
  <image href="data:image/png;base64,${darkBase64}" x="12" y="36" width="104" height="56" preserveAspectRatio="xMidYMid meet" />
</svg>`;
  fs.writeFileSync("public/favicon.svg", faviconSvg);

  console.log("6. Updating Gareth Ellis Business Card...");
  const logoForCard = await sharp(darkTransparentBuf)
    .resize(340, 160, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
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
        <text x="36" y="16">hello@ragecreative.co.za</text>
      </g>
      <g transform="translate(0, 84)">
        <circle cx="12" cy="12" r="10" fill="none" stroke="#141414" stroke-width="2" transform="scale(1.1)" />
        <path d="M2 12h20 M12 2a15 15 0 010 20 M12 2a15 15 0 000 20" fill="none" stroke="#141414" stroke-width="2" transform="scale(1.1)" />
        <text x="36" y="16">ragecreative.co.za</text>
      </g>
      <g transform="translate(0, 126)">
        <path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7zm0 10a3 3 0 110-6 3 3 0 010 6z" fill="#141414" transform="scale(1.1)" />
        <text x="36" y="16">258 Main Avenue, Ferndale, Randburg</text>
      </g>
    </g>
  </g>

  <!-- Vertical Divider Line -->
  <line x1="530" y1="70" x2="530" y2="530" stroke="#DDD7CC" stroke-width="1.5" />
</svg>`;

  await sharp(Buffer.from(cardBaseSvg))
    .composite([{ input: logoForCard, left: 620, top: 220 }])
    .png({ quality: 100 })
    .toFile("public/assets/gareth-ellis-business-card.png");

  fs.copyFileSync("public/assets/gareth-ellis-business-card.png", "assets/gareth-ellis-business-card.png");

  console.log("SUCCESS: All assets successfully generated with the new client logo!");
}

run().catch((err) => {
  console.error("Processing failed:", err);
  process.exit(1);
});
