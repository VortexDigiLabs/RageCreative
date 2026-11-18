import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

/**
 * RAGE BRAND LOGO GENERATOR
 * Generates pure vector SVG and high-resolution PNG assets strictly complying
 * with the client's official brand guidelines and JSON specification:
 * - Brand: RAGE / RAGE MODELS / RAGE CREATIVE
 * - Layout: Stacked 2x2 grid ["RA", "GE"]
 * - Character Styling:
 *   * "R and A joined/ligature style on top line"
 *   * "G and E joined/ligature style on bottom line"
 *   * High-contrast Didone/Bodoni luxury fashion serifs
 *   * Zero CSS fonts, zero <text> elements, zero Greek Sigma hacks!
 */

// Helper to generate the stacked RA/GE pure vector glyph paths
function getStackedRageGlyphs(color = '#181818') {
  return `
  <!-- ================= TOP LINE: RA LIGATURE ================= -->
  <g class="top-row-ra">
    <!-- GLYPH R -->
    <!-- Left Vertical Stem with Didone bilateral bracketed base and top serif -->
    <path fill="${color}" d="
      M 32 30 
      H 52 
      V 112 
      C 52 120 56 126 66 128 
      H 18 
      C 28 126 32 120 32 112 
      Z
    " />
    <!-- Top-left bracketed head serif -->
    <path fill="${color}" d="
      M 18 30 
      H 32 
      V 45 
      C 32 36 26 31 18 30 
      Z
    " />
    <!-- R Upper Curved Bowl (thick Didone arc) -->
    <path fill="${color}" d="
      M 52 30 
      C 78 30 114 34 114 62 
      C 114 86 82 91 52 91 
      V 83 
      C 76 83 97 79 97 62 
      C 97 43 72 38 52 38 
      Z
    " />
    <!-- R Diagonal Leg & Ligature Bridge connecting into foot of A -->
    <path fill="${color}" d="
      M 62 85 
      C 72 85 80 87 90 98 
      L 115 128 
      H 135 
      L 102 88 
      C 94 79 84 76 74 76 
      H 52 
      V 85 
      Z
    " />
    <!-- R-to-A baseline ligature join -->
    <path fill="${color}" d="
      M 115 128 
      H 142 
      L 132 120 
      C 126 120 120 124 115 128 
      Z
    " />

    <!-- GLYPH A (Joined in ligature with R) -->
    <!-- Apex serif -->
    <path fill="${color}" d="
      M 154 30 
      H 168 
      V 35 
      C 162 35 158 32 154 30 
      Z
    " />
    <!-- Left Hairline Stroke originating from R ligature junction -->
    <polygon fill="${color}" points="163,30 168,30 126,128 118,128" />
    <!-- Right Heavy Didone Stroke -->
    <polygon fill="${color}" points="166,30 178,30 226,128 208,128" />
    <!-- Right Foot Bilateral Serif -->
    <path fill="${color}" d="
      M 196 128 
      H 236 
      V 124 
      C 226 124 222 121 219 114 
      C 215 121 208 124 196 124 
      Z
    " />
    <!-- Low Didone Razor Crossbar -->
    <rect fill="${color}" x="135" y="96" width="64" height="4" />
  </g>

  <!-- ================= BOTTOM LINE: GE LIGATURE ================= -->
  <g class="bottom-row-ge">
    <!-- GLYPH G -->
    <!-- Circular Didone Main Bowl Outer & Inner -->
    <path fill="${color}" d="
      M 74 148 
      C 36 148 16 172 16 205 
      C 16 238 36 262 74 262 
      C 95 262 108 253 115 242 
      L 110 238 
      C 104 247 93 255 74 255 
      C 44 255 30 234 30 205 
      C 30 176 44 155 74 155 
      C 93 155 105 162 110 172 
      L 98 181 
      C 94 172 86 163 74 163 
      V 148 
      Z
    " />
    <!-- G Top Inward Beak -->
    <path fill="${color}" d="
      M 74 148 
      H 116 
      V 152 
      L 98 178 
      L 93 173 
      L 108 155 
      H 74 
      Z
    " />
    <!-- G Vertical Column with flared base -->
    <path fill="${color}" d="
      M 98 198 
      H 116 
      V 242 
      C 116 250 120 258 132 262 
      H 86 
      C 96 258 98 250 98 242 
      Z
    " />
    <!-- G-to-E Ligature Spur connecting directly into E middle bar -->
    <!-- Seamless horizontal bridge at y=200..206 -->
    <rect fill="${color}" x="74" y="200" width="62" height="6" />

    <!-- GLYPH E (Joined in ligature with G) -->
    <!-- Heavy Vertical Spine with bilateral bracketed serifs -->
    <path fill="${color}" d="
      M 132 148 
      H 150 
      V 262 
      H 132 
      Z
    " />
    <!-- E Top-left bracketed head serif -->
    <path fill="${color}" d="
      M 118 148 
      H 132 
      V 162 
      C 132 153 126 149 118 148 
      Z
    " />
    <!-- E Bottom-left bracketed foot serif -->
    <path fill="${color}" d="
      M 118 262 
      H 132 
      V 248 
      C 132 257 126 261 118 262 
      Z
    " />
    <!-- E Top Horizontal Arm & Downward Terminal Serif -->
    <path fill="${color}" d="
      M 150 148 
      H 220 
      V 175 
      H 214 
      C 214 161 210 154 196 154 
      H 150 
      Z
    " />
    <!-- E Middle Horizontal Arm (standard Didone crossbar, no chevron/sigma!) -->
    <!-- Connects to G ligature bridge at x=132..150 and extends to x=206 -->
    <path fill="${color}" d="
      M 132 200 
      H 206 
      V 206 
      H 150 
      V 206 
      H 132 
      Z
    " />
    <!-- E Middle Arm Terminal Serif -->
    <polygon fill="${color}" points="204,196 209,196 209,210 204,210" />
    <!-- E Bottom Horizontal Arm & Upward Terminal Serif -->
    <path fill="${color}" d="
      M 150 262 
      H 222 
      V 235 
      H 216 
      C 216 249 211 256 196 256 
      H 150 
      Z
    " />
  </g>
  `;
}

// Helper to generate vector paths for "CREATIVE"
function getCreativeVectorPaths(color = '#181818') {
  return `
    <g class="wordmark-creative">
      <!-- C -->
      <g transform="translate(0, 0)">
        <path fill="${color}" d="M 26 7 C 22 2 17 0 12 0 C 4 0 0 8 0 20 C 0 32 4 40 12 40 C 18 40 23 37 25 32 L 23 30 C 20 34 16 37 12 37 C 5 37 3 30 3 20 C 3 10 5 3 12 3 C 16 3 20 6 22 10 L 26 7 Z" />
      </g>
      <!-- R -->
      <g transform="translate(34, 0)">
        <path fill="${color}" d="M 4 0 H 16 C 23 0 27 3 27 11 C 27 18 22 21 16 22 L 26 40 H 21 L 12 23 H 7 V 37 H 10 V 40 H 0 V 37 H 4 V 3 H 0 V 0 H 4 Z M 7 3 V 20 H 15 C 20 20 23 17 23 11 C 23 5 20 3 15 3 Z" />
      </g>
      <!-- E -->
      <g transform="translate(68, 0)">
        <path fill="${color}" d="M 4 0 H 24 V 9 H 22 C 22 4 20 3 15 3 H 7 V 17 H 17 V 20 H 7 V 37 H 16 C 21 37 23 35 23 30 H 25 V 40 H 0 V 37 H 4 V 3 H 0 V 0 H 4 Z" />
      </g>
      <!-- A -->
      <g transform="translate(100, 0)">
        <path fill="${color}" d="M 13 0 H 17 L 29 40 H 24 L 20 27 H 8 L 4 40 H 0 L 13 0 Z M 9 24 H 19 L 14 8 Z" />
      </g>
      <!-- T -->
      <g transform="translate(136, 0)">
        <path fill="${color}" d="M 0 0 H 25 V 8 H 23 C 23 4 21 3 15 3 H 14 V 37 H 18 V 40 H 7 V 37 H 10 V 3 H 9 C 4 3 2 4 2 8 H 0 V 0 Z" />
      </g>
      <!-- I -->
      <g transform="translate(168, 0)">
        <path fill="${color}" d="M 0 0 H 10 V 3 H 7 V 37 H 10 V 40 H 0 V 37 H 3 V 3 H 0 V 0 Z" />
      </g>
      <!-- V -->
      <g transform="translate(186, 0)">
        <path fill="${color}" d="M 0 0 H 6 L 13 34 L 21 0 H 26 L 15 40 H 11 L 0 0 Z" />
      </g>
      <!-- E -->
      <g transform="translate(218, 0)">
        <path fill="${color}" d="M 4 0 H 24 V 9 H 22 C 22 4 20 3 15 3 H 7 V 17 H 17 V 20 H 7 V 37 H 16 C 21 37 23 35 23 30 H 25 V 40 H 0 V 37 H 4 V 3 H 0 V 0 H 4 Z" />
      </g>
    </g>
  `;
}

// 1. Stacked SVG (RA on top, GE on bottom + CREATIVE below)
function buildStackedSvg(color = '#181818') {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 360" width="100%" height="100%" shape-rendering="geometricPrecision">
  <!-- Stacked 2x2 RA/GE Ligature Mark -->
  <g transform="translate(36, 16) scale(0.96)">
    ${getStackedRageGlyphs(color)}
  </g>
  <!-- Vector CREATIVE Subtitle -->
  <g transform="translate(37, 296) scale(1.0)">
    ${getCreativeVectorPaths(color)}
  </g>
</svg>`;
}

// 2. Pure Monogram Mark SVG (Just RA/GE Stacked Ligature, 256x256)
function buildMonogramSvg(color = '#181818') {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 280" width="100%" height="100%" shape-rendering="geometricPrecision">
  <g transform="translate(3, -5) scale(1.0)">
    ${getStackedRageGlyphs(color)}
  </g>
</svg>`;
}

// 3. Landscape SVG (Stacked RA/GE Mark on left + divider line + CREATIVE on right)
function buildLandscapeSvg(color = '#181818') {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 680 120" width="100%" height="100%" shape-rendering="geometricPrecision">
  <!-- Stacked RA/GE Ligature Mark scaled to fit landscape height -->
  <g transform="translate(18, 4) scale(0.39)">
    ${getStackedRageGlyphs(color)}
  </g>
  <!-- Elegant Vertical Divider Line -->
  <line x1="130" y1="24" x2="130" y2="96" stroke="${color}" stroke-opacity="0.3" stroke-width="1.5" />
  <!-- Vector CREATIVE Wordmark -->
  <g transform="translate(154, 40) scale(1.05)">
    ${getCreativeVectorPaths(color)}
  </g>
</svg>`;
}

// 4. App Icon / Favicon SVG (Rounded square with light border as specified in JSON)
function buildAppIconSvg(size = 512) {
  const rx = Math.round(size * 0.22); // Elegant iOS/macOS squircle proportion
  const strokeW = Math.max(1, Math.round(size * 0.015));
  const scale = (size / 300) * 0.72;
  const transX = Math.round((size - 256 * scale) / 2);
  const transY = Math.round((size - 280 * scale) / 2) - 4;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" shape-rendering="geometricPrecision">
  <!-- Background with rounded corners and light gray border -->
  <rect x="${strokeW}" y="${strokeW}" width="${size - strokeW * 2}" height="${size - strokeW * 2}" rx="${rx}" fill="#FFFFFF" stroke="#E2DDD5" stroke-width="${strokeW}" />
  <!-- Stacked RA/GE Monogram Mark -->
  <g transform="translate(${transX}, ${transY}) scale(${scale})">
    ${getStackedRageGlyphs('#141414')}
  </g>
</svg>`;
}

async function run() {
  console.log('Generating RAGE authentic vector assets...');

  // SVGs
  const stackedBlackSvg = buildStackedSvg('#181818');
  const stackedWhiteSvg = buildStackedSvg('#FFFFFF');
  const landscapeBlackSvg = buildLandscapeSvg('#181818');
  const landscapeWhiteSvg = buildLandscapeSvg('#FFFFFF');
  const faviconSvg = buildAppIconSvg(128);

  fs.writeFileSync('public/rage-logo.svg', stackedBlackSvg);
  fs.writeFileSync('public/rage-logo-white.svg', stackedWhiteSvg);
  fs.writeFileSync('public/rage-logo-landscape.svg', landscapeBlackSvg);
  fs.writeFileSync('public/rage-logo-landscape-white.svg', landscapeWhiteSvg);
  fs.writeFileSync('public/favicon.svg', faviconSvg);

  console.log('Rendering high-resolution transparent PNG assets via Sharp...');

  // 1. Landscape PNG (Dark for light backgrounds) - 2720x480 (4x standard retina scale)
  await sharp(Buffer.from(landscapeBlackSvg))
    .resize(2720, 480, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ quality: 100, compressionLevel: 9 })
    .toFile('public/Rage Creative Logo landscape.png');

  // Copy to public/assets/ and assets/
  fs.copyFileSync('public/Rage Creative Logo landscape.png', 'public/assets/Rage Creative Logo landscape.png');
  fs.copyFileSync('public/Rage Creative Logo landscape.png', 'assets/Rage Creative Logo landscape.png');

  // 2. Landscape PNG (White for dark backgrounds) - 2720x480
  await sharp(Buffer.from(landscapeWhiteSvg))
    .resize(2720, 480, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ quality: 100, compressionLevel: 9 })
    .toFile('public/Rage Creative Logo landscape white.png');

  fs.copyFileSync('public/Rage Creative Logo landscape white.png', 'public/assets/Rage Creative Logo landscape white.png');
  fs.copyFileSync('public/Rage Creative Logo landscape white.png', 'assets/Rage Creative Logo landscape white.png');

  // 3. Stacked Master PNG (Dark) - 1200x1350
  await sharp(Buffer.from(stackedBlackSvg))
    .resize(1200, 1350, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ quality: 100, compressionLevel: 9 })
    .toFile('public/assets/Rage Creative Logo stacked.png');

  fs.copyFileSync('public/assets/Rage Creative Logo stacked.png', 'assets/Rage Creative Logo stacked.png');

  // 4. Stacked Master PNG (White) - 1200x1350
  await sharp(Buffer.from(stackedWhiteSvg))
    .resize(1200, 1350, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ quality: 100, compressionLevel: 9 })
    .toFile('public/assets/Rage Creative Logo stacked white.png');

  fs.copyFileSync('public/assets/Rage Creative Logo stacked white.png', 'assets/Rage Creative Logo stacked white.png');

  // 5. App Icons & Favicons per client JSON specs:
  // 512x512 rounded square
  await sharp(Buffer.from(buildAppIconSvg(512)))
    .resize(512, 512)
    .png()
    .toFile('public/assets/app-icon-512.png');

  // 256x256 rounded square
  await sharp(Buffer.from(buildAppIconSvg(256)))
    .resize(256, 256)
    .png()
    .toFile('public/assets/app-icon-256.png');

  // 64x64 rounded square
  await sharp(Buffer.from(buildAppIconSvg(64)))
    .resize(64, 64)
    .png()
    .toFile('public/assets/favicon-64.png');

  // 32x32 rounded square favicon
  await sharp(Buffer.from(buildAppIconSvg(32)))
    .resize(32, 32)
    .png()
    .toFile('public/assets/favicon-32.png');

  // Favicon.ico from 32x32 PNG
  await sharp(Buffer.from(buildAppIconSvg(32)))
    .resize(32, 32)
    .toFile('public/favicon.ico');

  console.log('All brand assets successfully built!');
}

run().catch((err) => {
  console.error('Build error:', err);
  process.exit(1);
});
