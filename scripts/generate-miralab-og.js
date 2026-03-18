const sharp = require('sharp');
const fs = require('fs');

const miralabLogoSvg = fs.readFileSync('public/images/miralab-logo.svg');

const svgOverlay = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow1" cx="25%" cy="40%" r="55%">
      <stop offset="0%" stop-color="#8b5cf6" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#030014" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="75%" cy="60%" r="45%">
      <stop offset="0%" stop-color="#22d3ee" stop-opacity="0.10"/>
      <stop offset="100%" stop-color="#030014" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Glows -->
  <rect width="1200" height="630" fill="url(#glow1)"/>
  <rect width="1200" height="630" fill="url(#glow2)"/>

  <!-- Tagline -->
  <text x="80" y="300" font-family="Arial, sans-serif" font-size="46" font-weight="800" fill="#ffffff">Innovación Digital &amp;</text>
  <text x="80" y="358" font-family="Arial, sans-serif" font-size="46" font-weight="800" fill="#ffffff">Desarrollo de Software</text>

  <!-- Subtitle -->
  <text x="80" y="408" font-family="Arial, sans-serif" font-size="22" fill="#9ca3af">Transformamos tus ideas en aplicaciones web y móviles</text>
  <text x="80" y="436" font-family="Arial, sans-serif" font-size="22" fill="#9ca3af">de calidad, desde Argentina.</text>

  <!-- Product chips -->
  <rect x="80" y="472" width="150" height="40" rx="20" fill="rgba(139,92,246,0.18)" stroke="#8b5cf6" stroke-width="1.5"/>
  <text x="155" y="498" font-family="Arial, sans-serif" font-size="16" font-weight="600" fill="#8b5cf6" text-anchor="middle">Matchpoint</text>

  <rect x="246" y="472" width="90" height="40" rx="20" fill="rgba(139,92,246,0.12)" stroke="#8b5cf6" stroke-width="1.5"/>
  <text x="291" y="498" font-family="Arial, sans-serif" font-size="16" font-weight="600" fill="#8b5cf6" text-anchor="middle">Rize</text>

  <rect x="352" y="472" width="110" height="40" rx="20" fill="rgba(139,92,246,0.12)" stroke="#8b5cf6" stroke-width="1.5"/>
  <text x="407" y="498" font-family="Arial, sans-serif" font-size="16" font-weight="600" fill="#8b5cf6" text-anchor="middle">Proshop</text>

  <!-- Right side vertical accent line -->
  <line x1="780" y1="80" x2="780" y2="550" stroke="rgba(139,92,246,0.12)" stroke-width="1"/>

  <!-- Right side: miralab.ar URL -->
  <text x="990" y="560" font-family="Arial, sans-serif" font-size="18" fill="#4b5563" text-anchor="middle">miralab.ar</text>
</svg>`;

// Resize MIRALAB logo SVG to ~360x88 → display at ~340px wide
sharp(miralabLogoSvg)
  .resize(380, null)
  .toBuffer()
  .then(logoBuffer => {
    const bg = {
      create: { width: 1200, height: 630, channels: 3, background: { r: 3, g: 0, b: 20 } }
    };
    return sharp(bg)
      .composite([
        { input: Buffer.from(svgOverlay), top: 0, left: 0 },
        { input: logoBuffer, top: 100, left: 78 },
      ])
      .jpeg({ quality: 88 })
      .toFile('public/images/miralab-og.jpg');
  })
  .then(info => console.log(`Done: ${info.width}x${info.height} — ${info.size} bytes`))
  .catch(err => console.error(err));
