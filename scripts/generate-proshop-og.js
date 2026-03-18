const sharp = require('sharp');
const fs = require('fs');

const proshopLogo = fs.readFileSync('public/images/proshop-logo.svg');

const svgOverlay = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="20%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#8b5cf6" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#030014" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#glow)"/>

  <!-- MIRALAB label -->
  <text x="80" y="90" font-family="Arial, sans-serif" font-size="17" font-weight="700" fill="#6b7280" letter-spacing="3">MIRALAB</text>

  <!-- Proshop title (logo at top:108 left:80, 90x90) -->
  <text x="185" y="168" font-family="Arial, sans-serif" font-size="72" font-weight="800" fill="#ffffff">Proshop</text>

  <!-- Subtitle accent -->
  <text x="80" y="215" font-family="Arial, sans-serif" font-size="20" font-weight="600" fill="#a1a1aa">Tech Ecommerce</text>

  <!-- Description -->
  <text x="80" y="268" font-family="Arial, sans-serif" font-size="24" fill="#9ca3af">Comprá los mejores productos de tecnología.</text>
  <text x="80" y="300" font-family="Arial, sans-serif" font-size="24" fill="#9ca3af">Envíos rápidos y pagos seguros.</text>

  <!-- CTA button -->
  <rect x="80" y="334" width="260" height="52" rx="26" fill="#f4f4f5"/>
  <text x="210" y="367" font-family="Arial, sans-serif" font-size="20" font-weight="700" fill="#111111" text-anchor="middle">Ver productos</text>

  <!-- Phone outline -->
  <rect x="820" y="70" width="300" height="490" rx="36" fill="#0d0d0d" stroke="#2a2a2a" stroke-width="2"/>

  <!-- Phone header -->
  <text x="848" y="126" font-family="Arial, sans-serif" font-size="15" font-weight="700" fill="#f4f4f5">Proshop</text>
  <line x1="840" y1="136" x2="1110" y2="136" stroke="#2a2a2a" stroke-width="1"/>

  <!-- Card 1 -->
  <rect x="840" y="150" width="260" height="85" rx="12" fill="#1e1e1e"/>
  <rect x="840" y="150" width="58" height="85" rx="12" fill="#2a2a2a"/>
  <text x="910" y="182" font-family="Arial, sans-serif" font-size="13" font-weight="700" fill="#f4f4f5">MacBook Air M3</text>
  <text x="910" y="200" font-family="Arial, sans-serif" font-size="11" fill="#a1a1aa">13-inch · 8GB · 256GB</text>
  <text x="910" y="222" font-family="Arial, sans-serif" font-size="13" font-weight="700" fill="#ffffff">$1,199.00</text>

  <!-- Card 2 -->
  <rect x="840" y="249" width="260" height="85" rx="12" fill="#1e1e1e"/>
  <rect x="840" y="249" width="58" height="85" rx="12" fill="#2a2a2a"/>
  <text x="910" y="281" font-family="Arial, sans-serif" font-size="13" font-weight="700" fill="#f4f4f5">WH-1000XM5</text>
  <text x="910" y="299" font-family="Arial, sans-serif" font-size="11" fill="#a1a1aa">Noise cancelling headset</text>
  <text x="910" y="321" font-family="Arial, sans-serif" font-size="13" font-weight="700" fill="#ffffff">$349.00</text>

  <!-- Card 3 -->
  <rect x="840" y="348" width="260" height="85" rx="12" fill="#1e1e1e"/>
  <rect x="840" y="348" width="58" height="85" rx="12" fill="#2a2a2a"/>
  <text x="910" y="380" font-family="Arial, sans-serif" font-size="13" font-weight="700" fill="#f4f4f5">LG 34" UltraWide</text>
  <text x="910" y="398" font-family="Arial, sans-serif" font-size="11" fill="#a1a1aa">QHD · IPS · 160Hz</text>
  <text x="910" y="420" font-family="Arial, sans-serif" font-size="13" font-weight="700" fill="#ffffff">$699.00</text>

  <!-- Footer -->
  <text x="1120" y="610" font-family="Arial, sans-serif" font-size="14" fill="#374151" text-anchor="end">miralab.ar</text>
</svg>`;

sharp(proshopLogo)
  .resize(90, 90)
  .toBuffer()
  .then(logoBuffer => {
    const bg = {
      create: { width: 1200, height: 630, channels: 3, background: { r: 3, g: 0, b: 20 } }
    };
    return sharp(bg)
      .composite([
        { input: Buffer.from(svgOverlay), top: 0, left: 0 },
        { input: logoBuffer, top: 108, left: 80 },
      ])
      .jpeg({ quality: 88 })
      .toFile('public/images/proshop-og.jpg');
  })
  .then(info => console.log(`Done: ${info.width}x${info.height} — ${info.size} bytes`))
  .catch(err => console.error(err));
