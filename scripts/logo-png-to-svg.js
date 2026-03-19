/**
 * Removes light gray background from logo_miralab.png, trims, resizes,
 * writes miralab-logo-transparent.png and miralab-logo-from-png.svg
 */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '../public/images/logo_miralab.png');
const OUT_PNG = path.join(__dirname, '../public/images/miralab-logo-transparent.png');
const OUT_SVG = path.join(__dirname, '../public/images/miralab-logo-from-png.svg');

async function main() {
  const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const w = info.width;
  const h = info.height;
  const out = Buffer.from(data);

  const corners = [
    [0, 0],
    [w - 1, 0],
    [0, h - 1],
    [w - 1, h - 1],
  ];
  let br = 0,
    bg = 0,
    bb = 0;
  for (const [x, y] of corners) {
    const i = (y * w + x) * 4;
    br += data[i];
    bg += data[i + 1];
    bb += data[i + 2];
  }
  br /= 4;
  bg /= 4;
  bb /= 4;

  const dist = (r, g, b) => Math.sqrt((r - br) ** 2 + (g - bg) ** 2 + (b - bb) ** 2);

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const lum = (r + g + b) / 3;
      const d = dist(r, g, b);
      // Remove light paper-like background; keep logo ink
      if (d < 38 || (lum > 218 && d < 52) || (lum > 230 && r > 200 && g > 200)) {
        out[i + 3] = 0;
      }
    }
  }

  let img = sharp(out, { raw: { width: w, height: h, channels: 4 } }).ensureAlpha();

  img = await img.trim({ threshold: 1 }).toBuffer({ resolveWithObject: true });
  const trimmed = sharp(img.data, {
    raw: { width: img.info.width, height: img.info.height, channels: 4 },
  });

  const maxW = 1200;
  const meta = await trimmed.metadata();
  const scale = meta.width > maxW ? maxW / meta.width : 1;
  const newW = Math.round(meta.width * scale);
  const newH = Math.round(meta.height * scale);

  const pngBuf = await trimmed
    .resize(newW, newH, { kernel: sharp.kernel.lanczos3 })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toBuffer();

  fs.writeFileSync(OUT_PNG, pngBuf);

  const b64 = pngBuf.toString('base64');
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${newW}" height="${newH}" viewBox="0 0 ${newW} ${newH}" role="img" aria-label="MIRALAB">
  <title>MIRALAB</title>
  <image width="100%" height="100%" preserveAspectRatio="xMidYMid meet" xlink:href="data:image/png;base64,${b64}"/>
</svg>
`;

  fs.writeFileSync(OUT_SVG, svg, 'utf8');

  console.log('Wrote', OUT_PNG, pngBuf.length, 'bytes');
  console.log('Wrote', OUT_SVG, Buffer.byteLength(svg, 'utf8'), 'bytes (embedded raster)');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
