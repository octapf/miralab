/**
 * Genera miralab-logo-white.png: mismo layout que miralab-logo-transparent.png
 * pero toda la tinta en blanco (#fff), fondo transparente.
 *
 * Post-proceso para que se vea más definido:
 * - Alpha con curva leve (más cuerpo en bordes anti-alias)
 * - Sharpen (unsharp) en RGBA
 */
const sharp = require('sharp');
const path = require('path');

const INPUT = path.join(__dirname, '../public/images/miralab-logo-transparent.png');
const OUTPUT = path.join(__dirname, '../public/images/miralab-logo-white.png');

/** Empuja el alpha hacia opaco en medios tonos = borde más “cerrado” sin pixelar */
function punchAlpha(a) {
  if (a <= 0) return 0;
  if (a >= 255) return 255;
  const t = a / 255;
  // exponente < 1: zonas semitransparentes ganan opacidad
  const out = Math.round(255 * Math.pow(t, 0.82));
  return Math.min(255, Math.max(0, out));
}

async function main() {
  const img = sharp(INPUT).ensureAlpha();
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  if (channels !== 4) {
    throw new Error(`Expected 4 channels (RGBA), got ${channels}`);
  }

  const out = Buffer.from(data);
  for (let i = 0; i < out.length; i += 4) {
    const a = punchAlpha(out[i + 3]);
    out[i + 3] = a;
    if (a === 0) {
      out[i] = 0;
      out[i + 1] = 0;
      out[i + 2] = 0;
      continue;
    }
    out[i] = 255;
    out[i + 1] = 255;
    out[i + 2] = 255;
  }

  await sharp(out, {
    raw: { width, height, channels: 4 },
  })
    // Nitidez perceptiva (sigma, flat, jagged — valores típicos de sharp)
    .sharpen({ sigma: 1.35, m1: 1.2, m2: 3.2, x1: 2, y2: 10, y3: 20 })
    .png({ compressionLevel: 9, effort: 10 })
    .toFile(OUTPUT);

  console.log('Wrote', OUTPUT);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
