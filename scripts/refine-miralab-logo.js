/**
 * Refina miralab-logo-transparent.png: elimina halos blancos/grises en bordes.
 * - Varios pasos de detección de "fringe" (píxeles claros que no son tinta de marca)
 * - Opening en alpha (erode+dilate) + erosión final de 1 px
 */
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const INPUT = path.join(__dirname, '../public/images/miralab-logo-transparent.png');
const OUTPUT = path.join(__dirname, '../public/images/miralab-logo-transparent.png');
const OUT_SVG = path.join(__dirname, '../public/images/miralab-logo-from-png.svg');

function sat(r, g, b) {
  return Math.max(r, g, b) - Math.min(r, g, b);
}

/** Tinta sólida del logo: no tocar */
function isBrandInk(r, g, b) {
  const lum = (r + g + b) / 3;
  const s = sat(r, g, b);
  if (r < 125 && g < 145 && b > 38 && b < 205 && lum < 200) return true;
  if (b > 105 && g > 70 && s > 15 && lum < 235) return true;
  if (s > 26 && lum < 205) return true;
  if (lum < 175) return true;
  return false;
}

/** Borde sucio / papel / antialiasing hacia blanco */
function isFringe(r, g, b, strict) {
  if (isBrandInk(r, g, b)) return false;
  const lum = (r + g + b) / 3;
  const s = sat(r, g, b);
  if (strict) {
    if (lum > 155 && s < 62) return true;
    if (lum > 175 && s < 75) return true;
  } else {
    if (lum > 140 && s < 48) return true;
    if (lum > 165 && s < 58) return true;
  }
  return false;
}

function morphAlphaOpening(alpha, w, h) {
  const eroded = new Uint8Array(w * h);
  const dilated = new Uint8Array(w * h);

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const k = y * w + x;
      if (y === 0 || y === h - 1 || x === 0 || x === w - 1) {
        eroded[k] = alpha[k];
        continue;
      }
      let m = 255;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          m = Math.min(m, alpha[k + dy * w + dx]);
        }
      }
      eroded[k] = m;
    }
  }

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const k = y * w + x;
      if (y === 0 || y === h - 1 || x === 0 || x === w - 1) {
        dilated[k] = eroded[k];
        continue;
      }
      let m = 0;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          m = Math.max(m, eroded[k + dy * w + dx]);
        }
      }
      dilated[k] = m;
    }
  }
  return dilated;
}

/** Una pasada de erosión morfológica en alpha (min 3×3): recorta ~1 px del borde opaco */
function erodeAlphaOnce(alpha, w, h) {
  const out = new Uint8Array(w * h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const k = y * w + x;
      if (y === 0 || y === h - 1 || x === 0 || x === w - 1) {
        out[k] = alpha[k];
        continue;
      }
      let m = 255;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          m = Math.min(m, alpha[k + dy * w + dx]);
        }
      }
      out[k] = m;
    }
  }
  return out;
}

function refineBuffer(data, w, h) {
  const out = Buffer.from(data);

  for (let pass = 0; pass < 2; pass++) {
    const strict = pass === 1;
    for (let i = 0; i < w * h * 4; i += 4) {
      if (out[i + 3] === 0) continue;
      const r = out[i],
        g = out[i + 1],
        b = out[i + 2];
      if (isFringe(r, g, b, strict)) {
        out[i + 3] = 0;
        out[i] = out[i + 1] = out[i + 2] = 0;
      }
    }
  }

  const alpha = new Uint8Array(w * h);
  for (let k = 0; k < w * h; k++) {
    alpha[k] = out[k * 4 + 3];
  }

  const opened = morphAlphaOpening(alpha, w, h);
  for (let k = 0; k < w * h; k++) {
    const i = k * 4;
    const a = opened[k];
    if (a === 0) {
      out[i] = out[i + 1] = out[i + 2] = out[i + 3] = 0;
    } else {
      out[i + 3] = a;
    }
  }

  // Si el alpha bajó pero el RGB sigue siendo halo, limpiar
  for (let i = 0; i < w * h * 4; i += 4) {
    if (out[i + 3] === 0) continue;
    const r = out[i],
      g = out[i + 1],
      b = out[i + 2];
    if (isFringe(r, g, b, true)) {
      out[i + 3] = 0;
      out[i] = out[i + 1] = out[i + 2] = 0;
    }
  }

  // Último halo: recortar 1 px de borde en la silueta (solo erosión, sin dilatar)
  const alphaFinal = new Uint8Array(w * h);
  for (let k = 0; k < w * h; k++) {
    alphaFinal[k] = out[k * 4 + 3];
  }
  const shaved = erodeAlphaOnce(alphaFinal, w, h);
  for (let k = 0; k < w * h; k++) {
    const i = k * 4;
    const a = shaved[k];
    if (a === 0) {
      out[i] = out[i + 1] = out[i + 2] = out[i + 3] = 0;
    } else {
      out[i + 3] = a;
    }
  }

  return out;
}

async function main() {
  if (!fs.existsSync(INPUT)) {
    console.error('Falta:', INPUT);
    process.exit(1);
  }

  const { data, info } = await sharp(INPUT).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const w = info.width;
  const h = info.height;

  const out = refineBuffer(data, w, h);

  const pngBuf = await sharp(out, { raw: { width: w, height: h, channels: 4 } })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toBuffer();

  fs.writeFileSync(OUTPUT, pngBuf);

  const meta = await sharp(pngBuf).metadata();
  const newW = meta.width;
  const newH = meta.height;
  const b64 = pngBuf.toString('base64');
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${newW}" height="${newH}" viewBox="0 0 ${newW} ${newH}" role="img" aria-label="MIRALAB">
  <title>MIRALAB</title>
  <image width="100%" height="100%" preserveAspectRatio="xMidYMid meet" xlink:href="data:image/png;base64,${b64}"/>
</svg>
`;
  fs.writeFileSync(OUT_SVG, svg, 'utf8');

  console.log('OK', OUTPUT, pngBuf.length, 'bytes');
  console.log('OK', OUT_SVG);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
