const sharp = require('sharp');
const fs = require('fs');

const rizeLogo = fs.readFileSync('public/images/rize-logo.svg');

const svgOverlay = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="20%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#8b5cf6" stop-opacity="0.20"/>
      <stop offset="100%" stop-color="#030014" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Glow -->
  <rect width="1200" height="630" fill="url(#glow)"/>

  <!-- MIRALAB label -->
  <text x="80" y="90" font-family="Arial, sans-serif" font-size="17" font-weight="700" fill="#6b7280" letter-spacing="3">MIRALAB</text>

  <!-- Rize title (logo composited separately at top:108 left:80, size ~90x90) -->
  <text x="185" y="168" font-family="Arial, sans-serif" font-size="72" font-weight="800" fill="#ffffff">Rize</text>

  <!-- Subtitle accent -->
  <text x="80" y="215" font-family="Arial, sans-serif" font-size="20" font-weight="600" fill="#8b5cf6">Calisthenics Planner</text>

  <!-- Description -->
  <text x="80" y="268" font-family="Arial, sans-serif" font-size="24" fill="#9ca3af">Entrenate con rutinas inteligentes,</text>
  <text x="80" y="300" font-family="Arial, sans-serif" font-size="24" fill="#9ca3af">registrá tu progreso y alcanzá tus metas.</text>

  <!-- CTA button -->
  <rect x="80" y="334" width="316" height="52" rx="26" fill="#8b5cf6"/>
  <text x="238" y="367" font-family="Arial, sans-serif" font-size="20" font-weight="700" fill="#ffffff" text-anchor="middle">Descargar en Google Play</text>

  <!-- Phone outline -->
  <rect x="820" y="70" width="300" height="490" rx="36" fill="#0d0d1a" stroke="#1e1e3a" stroke-width="2"/>

  <!-- Phone header -->
  <text x="848" y="126" font-family="Arial, sans-serif" font-size="15" font-weight="700" fill="#8b5cf6">Today</text>
  <line x1="840" y1="136" x2="1110" y2="136" stroke="#1e1e3a" stroke-width="1"/>

  <!-- Card 1 -->
  <rect x="840" y="150" width="260" height="85" rx="12" fill="#1b1f36"/>
  <text x="858" y="180" font-family="Arial, sans-serif" font-size="14" font-weight="700" fill="#A78BFA">Pull Day</text>
  <text x="858" y="200" font-family="Arial, sans-serif" font-size="11" fill="#6b7280">Thu, Mar 12 · 6 exercises · 45 min</text>
  <text x="858" y="222" font-family="Arial, sans-serif" font-size="11" font-weight="600" fill="#22D3EE">8/10 sessions done</text>

  <!-- Card 2 -->
  <rect x="840" y="249" width="260" height="85" rx="12" fill="#1b1f36"/>
  <text x="858" y="279" font-family="Arial, sans-serif" font-size="14" font-weight="700" fill="#A78BFA">Core &amp; Mobility</text>
  <text x="858" y="299" font-family="Arial, sans-serif" font-size="11" fill="#6b7280">Fri, Mar 13 · 4 exercises · 30 min</text>
  <text x="858" y="321" font-family="Arial, sans-serif" font-size="11" font-weight="600" fill="#22D3EE">5/10 sessions done</text>

  <!-- Card 3 -->
  <rect x="840" y="348" width="260" height="85" rx="12" fill="#1b1f36"/>
  <text x="858" y="378" font-family="Arial, sans-serif" font-size="14" font-weight="700" fill="#A78BFA">Push Day</text>
  <text x="858" y="398" font-family="Arial, sans-serif" font-size="11" fill="#6b7280">Sat, Mar 14 · 5 exercises · 40 min</text>
  <text x="858" y="420" font-family="Arial, sans-serif" font-size="11" font-weight="600" fill="#22D3EE">3/10 sessions done</text>

  <!-- Footer -->
  <text x="1120" y="610" font-family="Arial, sans-serif" font-size="14" fill="#374151" text-anchor="end">miralab.ar</text>
</svg>`;

sharp(rizeLogo)
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
      .toFile('public/images/rize-og.jpg');
  })
  .then(info => console.log(`Done: ${info.width}x${info.height} — ${info.size} bytes`))
  .catch(err => console.error(err));
