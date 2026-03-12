import Link from 'next/link';

export default function LogoPreview() {
  return (
    <div style={{ padding: '4rem 2rem', background: '#0f0f0f', minHeight: '100vh' }}>
      <h1 style={{ color: 'white', textAlign: 'center', marginBottom: '4rem', fontSize: '2.5rem' }}>
        Opciones de Logo MIRALAB
      </h1>

      {/* Opción 1: Minimalista con Onda */}
      <div
        style={{
          background: '#1a1a1a',
          padding: '3rem',
          marginBottom: '3rem',
          borderRadius: '12px',
        }}
      >
        <h2 style={{ color: '#8B5CF6', marginBottom: '2rem' }}>Opción 1: Minimalista con Onda</h2>
        <div style={{ display: 'flex', gap: '3rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <svg width="200" height="60" viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg">
            <text
              x="0"
              y="28"
              fontFamily="Arial, sans-serif"
              fontWeight="700"
              fontSize="24"
              fill="#8B5CF6"
            >
              MIRA
            </text>
            <text
              x="60"
              y="28"
              fontFamily="Arial, sans-serif"
              fontWeight="700"
              fontSize="24"
              fill="#fff"
            >
              LAB
            </text>
            <path d="M 0 35 Q 30 32 60 35 T 120 35" stroke="#8B5CF6" strokeWidth="2" fill="none" />
          </svg>

          <div style={{ background: 'white', padding: '1rem 2rem', borderRadius: '8px' }}>
            <svg width="200" height="60" viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg">
              <text
                x="0"
                y="28"
                fontFamily="Arial, sans-serif"
                fontWeight="700"
                fontSize="24"
                fill="#8B5CF6"
              >
                MIRA
              </text>
              <text
                x="60"
                y="28"
                fontFamily="Arial, sans-serif"
                fontWeight="700"
                fontSize="24"
                fill="#000"
              >
                LAB
              </text>
              <path
                d="M 0 35 Q 30 32 60 35 T 120 35"
                stroke="#8B5CF6"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Opción 2: Con Icono Molecular */}
      <div
        style={{
          background: '#1a1a1a',
          padding: '3rem',
          marginBottom: '3rem',
          borderRadius: '12px',
        }}
      >
        <h2 style={{ color: '#8B5CF6', marginBottom: '2rem' }}>
          Opción 2: Icono Molecular (Innovación)
        </h2>
        <div style={{ display: 'flex', gap: '3rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <svg width="220" height="60" viewBox="0 0 140 40" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="8" r="3" fill="#8B5CF6" />
            <circle cx="20" cy="12" r="2.5" fill="#A78BFA" />
            <circle cx="14" cy="18" r="2" fill="#C4B5FD" />
            <line x1="8" y1="8" x2="14" y2="18" stroke="#8B5CF6" strokeWidth="1" />
            <line x1="14" y1="18" x2="20" y2="12" stroke="#8B5CF6" strokeWidth="1" />
            <text
              x="30"
              y="28"
              fontFamily="Arial, sans-serif"
              fontWeight="800"
              fontSize="26"
              fill="#fff"
            >
              MIRALAB
            </text>
          </svg>

          <div style={{ background: 'white', padding: '1rem 2rem', borderRadius: '8px' }}>
            <svg width="220" height="60" viewBox="0 0 140 40" xmlns="http://www.w3.org/2000/svg">
              <circle cx="8" cy="8" r="3" fill="#8B5CF6" />
              <circle cx="20" cy="12" r="2.5" fill="#A78BFA" />
              <circle cx="14" cy="18" r="2" fill="#C4B5FD" />
              <line x1="8" y1="8" x2="14" y2="18" stroke="#8B5CF6" strokeWidth="1" />
              <line x1="14" y1="18" x2="20" y2="12" stroke="#8B5CF6" strokeWidth="1" />
              <text
                x="30"
                y="28"
                fontFamily="Arial, sans-serif"
                fontWeight="800"
                fontSize="26"
                fill="#000"
              >
                MIRALAB
              </text>
            </svg>
          </div>
        </div>
      </div>

      {/* Opción 3: Estilo Cubo 3D */}
      <div
        style={{
          background: '#1a1a1a',
          padding: '3rem',
          marginBottom: '3rem',
          borderRadius: '12px',
        }}
      >
        <h2 style={{ color: '#8B5CF6', marginBottom: '2rem' }}>
          Opción 3: Cubo 3D (Tech/Desarrollo)
        </h2>
        <div style={{ display: 'flex', gap: '3rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <svg width="220" height="60" viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg">
            <polygon points="5,15 15,10 15,25 5,30" fill="#8B5CF6" opacity="0.8" />
            <polygon points="15,10 25,15 25,30 15,25" fill="#A78BFA" opacity="0.9" />
            <polygon points="5,30 15,25 25,30 15,35" fill="#6D28D9" />
            <text
              x="35"
              y="28"
              fontFamily="Arial, sans-serif"
              fontWeight="800"
              fontSize="26"
              fill="#fff"
            >
              MIRALAB
            </text>
          </svg>

          <div style={{ background: 'white', padding: '1rem 2rem', borderRadius: '8px' }}>
            <svg width="220" height="60" viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg">
              <polygon points="5,15 15,10 15,25 5,30" fill="#8B5CF6" opacity="0.8" />
              <polygon points="15,10 25,15 25,30 15,25" fill="#A78BFA" opacity="0.9" />
              <polygon points="5,30 15,25 25,30 15,35" fill="#6D28D9" />
              <text
                x="35"
                y="28"
                fontFamily="Arial, sans-serif"
                fontWeight="800"
                fontSize="26"
                fill="#000"
              >
                MIRALAB
              </text>
            </svg>
          </div>
        </div>
      </div>

      {/* Opción 4: Flecha de Código */}
      <div
        style={{
          background: '#1a1a1a',
          padding: '3rem',
          marginBottom: '3rem',
          borderRadius: '12px',
        }}
      >
        <h2 style={{ color: '#8B5CF6', marginBottom: '2rem' }}>
          Opción 4: Código/Flecha (Desarrollo)
        </h2>
        <div style={{ display: 'flex', gap: '3rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <svg width="220" height="60" viewBox="0 0 140 40" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M 5 20 L 15 10 M 5 20 L 15 30"
              stroke="#8B5CF6"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 20 10 L 10 20 L 20 30"
              stroke="#A78BFA"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
            <text
              x="30"
              y="28"
              fontFamily="Arial, sans-serif"
              fontWeight="800"
              fontSize="26"
              fill="#fff"
            >
              MIRALAB
            </text>
          </svg>

          <div style={{ background: 'white', padding: '1rem 2rem', borderRadius: '8px' }}>
            <svg width="220" height="60" viewBox="0 0 140 40" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M 5 20 L 15 10 M 5 20 L 15 30"
                stroke="#8B5CF6"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 20 10 L 10 20 L 20 30"
                stroke="#A78BFA"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
              <text
                x="30"
                y="28"
                fontFamily="Arial, sans-serif"
                fontWeight="800"
                fontSize="26"
                fill="#000"
              >
                MIRALAB
              </text>
            </svg>
          </div>
        </div>
      </div>

      {/* Opción 5: Hexágono Tech */}
      <div
        style={{
          background: '#1a1a1a',
          padding: '3rem',
          marginBottom: '3rem',
          borderRadius: '12px',
        }}
      >
        <h2 style={{ color: '#8B5CF6', marginBottom: '2rem' }}>
          Opción 5: Hexágono (Tech/Moderno)
        </h2>
        <div style={{ display: 'flex', gap: '3rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <svg width="220" height="60" viewBox="0 0 140 40" xmlns="http://www.w3.org/2000/svg">
            <polygon
              points="12,5 22,10 22,20 12,25 2,20 2,10"
              fill="none"
              stroke="#8B5CF6"
              strokeWidth="2"
            />
            <polygon points="10,12 14,10 18,12 18,18 14,20 10,18" fill="#8B5CF6" />
            <text
              x="30"
              y="28"
              fontFamily="Arial, sans-serif"
              fontWeight="800"
              fontSize="26"
              fill="#fff"
            >
              MIRALAB
            </text>
          </svg>

          <div style={{ background: 'white', padding: '1rem 2rem', borderRadius: '8px' }}>
            <svg width="220" height="60" viewBox="0 0 140 40" xmlns="http://www.w3.org/2000/svg">
              <polygon
                points="12,5 22,10 22,20 12,25 2,20 2,10"
                fill="none"
                stroke="#8B5CF6"
                strokeWidth="2"
              />
              <polygon points="10,12 14,10 18,12 18,18 14,20 10,18" fill="#8B5CF6" />
              <text
                x="30"
                y="28"
                fontFamily="Arial, sans-serif"
                fontWeight="800"
                fontSize="26"
                fill="#000"
              >
                MIRALAB
              </text>
            </svg>
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '4rem' }}>
        <Link
          href="/"
          style={{
            color: '#8B5CF6',
            textDecoration: 'none',
            fontSize: '1.2rem',
            padding: '1rem 2rem',
            border: '2px solid #8B5CF6',
            borderRadius: '8px',
            display: 'inline-block',
          }}
        >
          {'<- Volver al sitio'}
        </Link>
      </div>
    </div>
  );
}
