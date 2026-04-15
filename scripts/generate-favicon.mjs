import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const pngSource = path.join(root, 'public', 'images', 'miralab-ml-source.png');
const svgPath = path.join(root, 'public', 'images', 'miralab-ml-monogram.svg');
const svg = fs.readFileSync(svgPath);

/** Prefer PNG de referencia; si no existe, rasteriza el SVG (#00051a + cortes). */
async function rasterPng(w, h) {
  if (fs.existsSync(pngSource)) {
    return sharp(pngSource)
      .resize(w, h, {
        fit: 'contain',
        position: 'centre',
        background: { r: 0, g: 5, b: 26, alpha: 1 }, // #00051a
      })
      .png()
      .toBuffer();
  }
  return sharp(svg, { density: 450 }).resize(w, h).png().toBuffer();
}

const b16 = await rasterPng(16, 16);
const b32 = await rasterPng(32, 32);
const b180 = await rasterPng(180, 180);

fs.writeFileSync(path.join(root, 'public', 'favicon-16x16.png'), b16);
fs.writeFileSync(path.join(root, 'public', 'favicon-32x32.png'), b32);
fs.writeFileSync(path.join(root, 'public', 'apple-touch-icon.png'), b180);
fs.writeFileSync(path.join(root, 'public', 'favicon.ico'), await pngToIco([b16, b32]));
