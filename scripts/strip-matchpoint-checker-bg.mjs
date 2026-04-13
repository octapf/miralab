/**
 * Limpia el wordmark Matchpoint usando el mismo enfoque que
 * `matchpoint/scripts/combine-screenshots.js` (flood desde bordes + recorte + fringe),
 * más un paso final para agujeros A/O/P (tinta vs no-tinta).
 *
 * Uso: node scripts/strip-matchpoint-checker-bg.mjs
 *
 * Entrada: `matchpoint-wordmark-source.png` si existe; si no, `matchpoint-wordmark.png`.
 * Salida: `matchpoint-wordmark-clear.png`
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const sourcePreferred = path.join(root, 'public/images/matchpoint-wordmark-source.png');
const sourceFallback = path.join(root, 'public/images/matchpoint-wordmark.png');
const inputPath = fs.existsSync(sourcePreferred) ? sourcePreferred : sourceFallback;
const outPath = path.join(root, 'public/images/matchpoint-wordmark-clear.png');

// --- Copiado de matchpoint/scripts/combine-screenshots.js (misma lógica) ---

/**
 * Inundación desde todos los bordes: borra fondo claro conectado al exterior.
 * No atraviesa píxeles muy oscuros (contenido / tinta oscura).
 */
function floodRemoveBackgroundFromEdges(data, width, height, channels, opts = {}) {
  const stopDark = opts.stopDark ?? 72;
  const seedMinLum = opts.seedMinLum ?? 140;

  const visited = new Uint8Array(width * height);
  const queue = [];
  const idx = (x, y) => y * width + x;

  function lumAt(x, y) {
    const i = (y * width + x) * channels;
    return (data[i] + data[i + 1] + data[i + 2]) / 3;
  }

  for (let x = 0; x < width; x++) {
    for (const y of [0, height - 1]) {
      if (lumAt(x, y) >= seedMinLum) queue.push([x, y]);
    }
  }
  for (let y = 0; y < height; y++) {
    for (const x of [0, width - 1]) {
      if (lumAt(x, y) >= seedMinLum) queue.push([x, y]);
    }
  }

  while (queue.length) {
    const [x, y] = queue.shift();
    const vi = idx(x, y);
    if (visited[vi]) continue;
    visited[vi] = 1;

    const i = vi * channels;
    const lum = (data[i] + data[i + 1] + data[i + 2]) / 3;
    if (lum < stopDark) continue;

    data[i + 3] = 0;

    const n = [
      [x + 1, y],
      [x - 1, y],
      [x, y + 1],
      [x, y - 1],
    ];
    for (const [nx, ny] of n) {
      if (nx >= 0 && nx < width && ny >= 0 && ny < height) queue.push([nx, ny]);
    }
  }
}

/** Limpia halos con alpha bajo — mismo que Matchpoint */
function flattenFringeAlpha(data, width, height, channels, alphaCut = 90) {
  for (let i = 0; i < data.length; i += channels) {
    if (data[i + 3] < alphaCut) data[i + 3] = 0;
  }
}

/** Bounding box por alpha — mismo que Matchpoint */
function bboxByAlpha(data, width, height, channels, alphaMin = 40) {
  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const a = data[(y * width + x) * channels + 3];
      if (a > alphaMin) {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (minX > maxX) return null;
  return { left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 };
}

// --- Detección de tinta (huecos del damero que el flood no alcanza) ---

function saturation01(r, g, b) {
  const maxc = Math.max(r, g, b) / 255;
  const minc = Math.min(r, g, b) / 255;
  if (maxc <= 0.001) return 0;
  return (maxc - minc) / maxc;
}

function isInkPixel(r, g, b) {
  const spread = Math.max(r, g, b) - Math.min(r, g, b);
  const sat = saturation01(r, g, b);

  if (spread < 40 && Math.abs(r - g) < 26 && Math.abs(g - b) < 26) return false;

  if (r > 152 && g > 142 && b > 152 && spread < 78 && sat < 0.4 && b - r < 34) return false;

  if (r >= 155 && g >= 68 && b <= 158 && r - b >= 42 && sat >= 0.12) return true;

  if (r >= 188 && g >= 118 && b <= 205 && r > b + 18 && sat >= 0.09) return true;

  if (b >= 158 && b >= r + 28 && b >= g + 20 && r <= 200 && g <= 198 && sat >= 0.26) return true;

  if (sat >= 0.3 && spread >= 38 && r >= 105 && g >= 45 && b >= 88) {
    const yellowish = r > b + 22 && g > b - 45;
    const purplish = b > r + 16 && b > g + 12;
    if (yellowish || purplish) return true;
  }

  return false;
}

/**
 * Misma semántica que Matchpoint: solo se borra (y se propaga) si `lum >= stopDark`;
 * si `lum < stopDark` la tinta actúa de barrera.
 * Amarillo/violeta del logo ~ lum 120–155; fondo blanco/gris claro ~ 180–255.
 * (En screenshots Matchpoint usan stopDark 72/88 porque el marco del móvil es casi negro.)
 */
const WORDMARK_FLOOD_OPTS = {
  stopDark: 158,
  seedMinLum: 118,
};

async function main() {
  if (!fs.existsSync(inputPath)) {
    console.error('No input PNG:', inputPath);
    process.exit(1);
  }

  const { data, info } = await sharp(inputPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const copy = Buffer.from(data);
  const { width: w, height: h, channels: ch } = info;

  floodRemoveBackgroundFromEdges(copy, w, h, ch, WORDMARK_FLOOD_OPTS);
  flattenFringeAlpha(copy, w, h, ch, 40);

  // Agujeros A/O/P: lo que sigue opaco y no es tinta → transparente
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * ch;
      if (copy[i + 3] < 8) continue;
      const r = copy[i];
      const g = copy[i + 1];
      const b = copy[i + 2];
      if (!isInkPixel(r, g, b)) copy[i + 3] = 0;
    }
  }

  flattenFringeAlpha(copy, w, h, ch, 35);

  const box = bboxByAlpha(copy, w, h, ch, 35);
  if (!box) {
    console.error('bbox vacío tras procesar');
    process.exit(1);
  }

  let pipeline = sharp(copy, { raw: { width: w, height: h, channels: 4 } }).extract(box).png({ compressionLevel: 9 });

  await pipeline.toFile(outPath + '.tmp');
  fs.renameSync(outPath + '.tmp', outPath);

  console.log('OK:', outPath, `trim ${box.width}x${box.height} (from ${w}x${h})`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
