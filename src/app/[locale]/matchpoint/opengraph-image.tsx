import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function MatchpointOGImage() {
  const logoBuffer = readFileSync(join(process.cwd(), 'public/images/matchpoint-icon-512.png'));
  const logoSrc = `data:image/png;base64,${logoBuffer.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#030014',
          display: 'flex',
          alignItems: 'center',
          padding: '0 80px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
        }}
      >
        {/* Purple glow */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            left: '-80px',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(ellipse, rgba(139,92,246,0.18) 0%, transparent 70%)',
            display: 'flex',
          }}
        />

        {/* Left column */}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: '0px' }}>
          {/* MIRALAB label */}
          <div
            style={{
              color: '#6b7280',
              fontSize: '17px',
              letterSpacing: '0.18em',
              fontWeight: 700,
              display: 'flex',
              textTransform: 'uppercase',
            }}
          >
            MIRALAB
          </div>

          {/* Logo image */}
          <div style={{ display: 'flex', marginTop: '24px' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoSrc}
              width={220}
              height={109}
              alt="Matchpoint"
              style={{ objectFit: 'contain' }}
            />
          </div>

          {/* Title */}
          <div
            style={{
              color: '#ffffff',
              fontSize: '82px',
              fontWeight: 800,
              lineHeight: 1,
              marginTop: '12px',
              display: 'flex',
            }}
          >
            Matchpoint
          </div>

          {/* Subtitle */}
          <div
            style={{
              color: '#9ca3af',
              fontSize: '24px',
              marginTop: '18px',
              maxWidth: '580px',
              display: 'flex',
            }}
          >
            Organizá torneos. Armá equipos. Gestioná inscripciones.
          </div>

          {/* CTA button */}
          <div
            style={{
              marginTop: '32px',
              background: '#8b5cf6',
              color: '#ffffff',
              padding: '14px 32px',
              borderRadius: '999px',
              fontSize: '21px',
              fontWeight: 700,
              display: 'flex',
              alignSelf: 'flex-start',
            }}
          >
            Descargar en Google Play
          </div>
        </div>

        {/* Right column — phone mockup */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '280px',
          }}
        >
          <div
            style={{
              width: '220px',
              height: '440px',
              background: '#0d0d1a',
              borderRadius: '36px',
              border: '2px solid #1e1e3a',
              display: 'flex',
              flexDirection: 'column',
              padding: '24px 16px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                color: '#F59E0B',
                fontSize: '15px',
                fontWeight: 700,
                display: 'flex',
                marginBottom: '14px',
              }}
            >
              Torneos
            </div>

            {/* Card 1 */}
            <div
              style={{
                background: '#1a1a2e',
                borderRadius: '12px',
                padding: '12px',
                display: 'flex',
                flexDirection: 'column',
                marginBottom: '10px',
              }}
            >
              <div style={{ color: '#F59E0B', fontSize: '12px', fontWeight: 700, display: 'flex' }}>
                Summer Beach Cup
              </div>
              <div style={{ color: '#6b7280', fontSize: '11px', display: 'flex', marginTop: '4px' }}>
                Jul 15 · 8/16 equipos
              </div>
            </div>

            {/* Card 2 */}
            <div
              style={{
                background: '#1a1a2e',
                borderRadius: '12px',
                padding: '12px',
                display: 'flex',
                flexDirection: 'column',
                marginBottom: '10px',
              }}
            >
              <div style={{ color: '#F59E0B', fontSize: '12px', fontWeight: 700, display: 'flex' }}>
                Weekend Volley
              </div>
              <div style={{ color: '#6b7280', fontSize: '11px', display: 'flex', marginTop: '4px' }}>
                Jul 22 · 4/16 equipos
              </div>
            </div>

            {/* Card 3 */}
            <div
              style={{
                background: '#1a1a2e',
                borderRadius: '12px',
                padding: '12px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ color: '#F59E0B', fontSize: '12px', fontWeight: 700, display: 'flex' }}>
                City Open 2026
              </div>
              <div style={{ color: '#6b7280', fontSize: '11px', display: 'flex', marginTop: '4px' }}>
                Ago 5 · 2/16 equipos
              </div>
            </div>
          </div>
        </div>

        {/* Bottom miralab.ar */}
        <div
          style={{
            position: 'absolute',
            bottom: '28px',
            right: '60px',
            color: '#374151',
            fontSize: '15px',
            display: 'flex',
          }}
        >
          miralab.ar
        </div>
      </div>
    ),
    { ...size },
  );
}
