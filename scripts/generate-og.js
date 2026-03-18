const sharp = require('sharp');

const svgOverlay = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="20%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#8b5cf6" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#030014" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Glow -->
  <rect width="1200" height="630" fill="url(#glow)"/>

  <!-- MIRALAB label -->
  <text x="80" y="90" font-family="Arial, sans-serif" font-size="17" font-weight="700" fill="#6b7280" letter-spacing="3">MIRALAB</text>

  <!-- Matchpoint title -->
  <text x="78" y="295" font-family="Arial, sans-serif" font-size="80" font-weight="800" fill="#ffffff">Matchpoint</text>

  <!-- Subtitle -->
  <text x="80" y="342" font-family="Arial, sans-serif" font-size="22" fill="#9ca3af">Organizá torneos. Armá equipos. Gestioná inscripciones.</text>

  <!-- CTA button bg -->
  <rect x="80" y="370" width="316" height="52" rx="26" fill="#8b5cf6"/>
  <!-- CTA button text -->
  <text x="238" y="403" font-family="Arial, sans-serif" font-size="20" font-weight="700" fill="#ffffff" text-anchor="middle">Descargar en Google Play</text>

  <!-- Phone outline -->
  <rect x="820" y="70" width="300" height="490" rx="36" fill="#0d0d1a" stroke="#1e1e3a" stroke-width="2"/>

  <!-- Phone screen header -->
  <text x="848" y="126" font-family="Arial, sans-serif" font-size="15" font-weight="700" fill="#F59E0B">Torneos</text>
  <line x1="840" y1="136" x2="1110" y2="136" stroke="#1e1e3a" stroke-width="1"/>

  <!-- Card 1 -->
  <rect x="840" y="150" width="260" height="80" rx="12" fill="#1a1a2e"/>
  <text x="858" y="178" font-family="Arial, sans-serif" font-size="13" font-weight="700" fill="#F59E0B">Summer Beach Cup</text>
  <text x="858" y="200" font-family="Arial, sans-serif" font-size="11" fill="#6b7280">Jul 15 · 8/16 equipos</text>
  <text x="858" y="218" font-family="Arial, sans-serif" font-size="11" fill="#6b7280">Barceloneta Beach</text>

  <!-- Card 2 -->
  <rect x="840" y="244" width="260" height="80" rx="12" fill="#1a1a2e"/>
  <text x="858" y="272" font-family="Arial, sans-serif" font-size="13" font-weight="700" fill="#F59E0B">Weekend Volley</text>
  <text x="858" y="294" font-family="Arial, sans-serif" font-size="11" fill="#6b7280">Jul 22 · 4/16 equipos</text>
  <text x="858" y="312" font-family="Arial, sans-serif" font-size="11" fill="#6b7280">Nova Icaria</text>

  <!-- Card 3 -->
  <rect x="840" y="338" width="260" height="80" rx="12" fill="#1a1a2e"/>
  <text x="858" y="366" font-family="Arial, sans-serif" font-size="13" font-weight="700" fill="#F59E0B">City Open 2026</text>
  <text x="858" y="388" font-family="Arial, sans-serif" font-size="11" fill="#6b7280">Ago 5 · 2/16 equipos</text>
  <text x="858" y="406" font-family="Arial, sans-serif" font-size="11" fill="#6b7280">La Barceloneta</text>

  <!-- Footer -->
  <text x="1120" y="610" font-family="Arial, sans-serif" font-size="14" fill="#374151" text-anchor="end">miralab.ar</text>
</svg>`;

sharp('public/images/matchpoint-icon-512.png')
  .resize(220, null, { fit: 'inside' })
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
      .toFile('public/images/matchpoint-og.jpg');
  })
  .then(info => console.log(`Done: ${info.width}x${info.height} — ${info.size} bytes`))
  .catch(err => console.error(err));
