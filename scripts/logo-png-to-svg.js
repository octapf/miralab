/**
 * Limpia fondo e impurezas de logo_miralab.png
 * - Flood-fill desde el borde (elimina todo lo conectado al papel)
 * - Protege tintas del logo (navy / cyan)
 * - Pase extra: papel en el interior de letras
 */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '../public/images/logo_miralab.png');
const OUT_PNG = path.join(__dirname, '../public/images/miralab-logo-transparent.png');
const OUT_SVG = path.join(__dirname, '../public/images/miralab-logo-from-png.svg');

function distRgb(r1, g1, b1, r2, g2, b2) {
  return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
}

function isLogoInk(r, g, b) {
  const lum = (r + g + b) / 3;
  const sat = Math.max(r, g, b) - Math.min(r, g, b);
  if (r < 130 && g < 140 && b > 45 && b < 210 && lum < 205) return true;
  if (b > 115 && g > 65 && r < 245 && sat > 22) return true;
  if (sat > 32 && lum < 218) return true;
  if (lum < 185) return true;
  return false;
}

function canFloodInto(r, g, b, br, bg, bb) {
  if (isLogoInk(r, g, b)) return false;
  const lum = (r + g + b) / 3;
  const d = distRgb(r, g, b, br, bg, bb);
  const sat = Math.max(r, g, b) - Math.min(r, g, b);
  if (d < 52) return true;
  if (lum > 215 && sat < 45) return true;
  if (lum > 228 && d < 75) return true;
  return false;
}

function floodFromBorder(data, w, h, br, bg, bb) {
  const out = Buffer.from(data);
  const seen = new Uint8Array(w * h);
  const q = [];
  const push = (x, y) => {
    const k = y * w + x;
    if (seen[k]) return;
    const i = k * 4;
    const r = data[i],
      gch = data[i + 1],
      b = data[i + 2];
    if (!canFloodInto(r, gch, b, br, bg, bb)) return;
    seen[k] = 1;
    q.push(k);
  };

  for (let x = 0; x < w; x++) {
    push(x, 0);
    push(x, h - 1);
  }
  for (let y = 0; y < h; y++) {
    push(0, y);
    push(w - 1, y);
  }

  while (q.length) {
    const k = q.pop();
    const x = k % w;
    const y = (k / w) | 0;
    const i = k * 4;
    out[i + 3] = 0;

    if (x > 0) {
      const nk = k - 1;
      if (!seen[nk]) {
        const j = nk * 4;
        const r = data[j],
          gch = data[j + 1],
          b = data[j + 2];
        if (canFloodInto(r, gch, b, br, bg, bb)) {
          seen[nk] = 1;
          q.push(nk);
        }
      }
    }
    if (x < w - 1) {
      const nk = k + 1;
      if (!seen[nk]) {
        const j = nk * 4;
        const r = data[j],
          gch = data[j + 1],
          b = data[j + 2];
        if (canFloodInto(r, gch, b, br, bg, bb)) {
          seen[nk] = 1;
          q.push(nk);
        }
      }
    }
    if (y > 0) {
      const nk = k - w;
      if (!seen[nk]) {
        const j = nk * 4;
        const r = data[j],
          gch = data[j + 1],
          b = data[j + 2];
        if (canFloodInto(r, gch, b, br, bg, bb)) {
          seen[nk] = 1;
          q.push(nk);
        }
      }
    }
    if (y < h - 1) {
      const nk = k + w;
      if (!seen[nk]) {
        const j = nk * 4;
        const r = data[j],
          gch = data[j + 1],
          b = data[j + 2];
        if (canFloodInto(r, gch, b, br, bg, bb)) {
          seen[nk] = 1;
          q.push(nk);
        }
      }
    }
  }

  return out;
}

function sampleBorderBackground(data, w, h) {
  const samples = [];
  const step = Math.max(1, Math.floor(Math.min(w, h) / 500));
  for (let x = 0; x < w; x += step) {
    const kt = (x) * 4;
    samples.push([data[kt], data[kt + 1], data[kt + 2]]);
    const kb = ((h - 1) * w + x) * 4;
    samples.push([data[kb], data[kb + 1], data[kb + 2]]);
  }
  for (let y = 0; y < h; y += step) {
    const k1 = (y * w) * 4;
    samples.push([data[k1], data[k1 + 1], data[k1 + 2]]);
    const k2 = (y * w + (w - 1)) * 4;
    samples.push([data[k2], data[k2 + 1], data[k2 + 2]]);
  }
  let br = 0,
    bg = 0,
    bb = 0;
  for (const [r, g, b] of samples) {
    br += r;
    bg += g;
    bb += b;
  }
  const n = samples.length;
  return { br: br / n, bg: bg / n, bb: bb / n };
}

function defringeAndInterior(data, out, w, h, br, bg, bb) {
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      if (out[i + 3] === 0) continue;
      const r = out[i];
      const gch = out[i + 1];
      const b = out[i + 2];
      const lum = (r + gch + b) / 3;
      const d = distRgb(r, gch, b, br, bg, bb);
      // Semitono papel residual en bordes del glifo
      if (!isLogoInk(r, gch, b) && lum > 198 && d < 48) {
        out[i + 3] = 0;
        continue;
      }
      // Huecos tipo interior de A: papel atrapado (muy claro, poca tinta)
      if (!isLogoInk(r, gch, b) && lum > 222 && d < 62) {
        out[i + 3] = 0;
      }
    }
  }
}

/** Borde sucio: muchos vecinos ya transparentes → quitar */
function cleanEdgeNoise(out, w, h) {
  const alpha = new Uint8Array(w * h);
  for (let i = 0; i < w * h; i++) {
    alpha[i] = out[i * 4 + 3];
  }
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const k = y * w + x;
      if (alpha[k] === 0) continue;
      let t = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) continue;
          if (alpha[k + dy * w + dx] === 0) t++;
        }
      }
      const i = k * 4;
      const r = out[i],
        g = out[i + 1],
        b = out[i + 2];
      if (t >= 5 && !isLogoInk(r, g, b)) {
        out[i + 3] = 0;
        out[i] = out[i + 1] = out[i + 2] = 0;
      }
    }
  }
}

async function main() {
  if (!fs.existsSync(SRC)) {
    console.error('No existe:', SRC);
    process.exit(1);
  }

  const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const w = info.width;
  const h = info.height;

  const { br, bg, bb } = sampleBorderBackground(data, w, h);
  console.log('Fondo (borde): RGB', Math.round(br), Math.round(bg), Math.round(bb));

  let out = floodFromBorder(data, w, h, br, bg, bb);
  defringeAndInterior(data, out, w, h, br, bg, bb);
  cleanEdgeNoise(out, w, h);

  let img = sharp(out, { raw: { width: w, height: h, channels: 4 } }).ensureAlpha();

  const trimmed = await img.trim({ threshold: 1 }).toBuffer({ resolveWithObject: true });
  const sharpTrimmed = sharp(trimmed.data, {
    raw: { width: trimmed.info.width, height: trimmed.info.height, channels: 4 },
  });

  const maxW = 1200;
  const meta = await sharpTrimmed.metadata();
  const scale = meta.width > maxW ? maxW / meta.width : 1;
  const newW = Math.round(meta.width * scale);
  const newH = Math.round(meta.height * scale);

  const pngBuf = await sharpTrimmed
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

  console.log('OK', OUT_PNG, pngBuf.length, 'bytes');
  console.log('OK', OUT_SVG, Buffer.byteLength(svg, 'utf8'), 'bytes');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
