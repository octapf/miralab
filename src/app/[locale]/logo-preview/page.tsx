import Link from 'next/link';

export default function LogoPreview() {
  return (
    <html lang="es">
      <body style={{ margin: 0, padding: 0 }}>
        <div style={{ padding: '4rem 2rem', background: '#0f0f0f', minHeight: '100vh' }}>
          <h1
            style={{
              color: 'white',
              textAlign: 'center',
              marginBottom: '4rem',
              fontSize: '2.5rem',
              fontFamily: 'Arial, sans-serif',
            }}
          >
            Opciones de Logo MIRALAB - Estilo Mar/Olas
          </h1>

          {/* COMBINACIÓN FINAL */}
          <div
            style={{
              background: '#1a1a1a',
              padding: '3rem',
              marginBottom: '3rem',
              borderRadius: '12px',
              border: '3px solid #8B5CF6',
            }}
          >
            <h2
              style={{
                color: '#8B5CF6',
                marginBottom: '2rem',
                fontFamily: 'Arial, sans-serif',
                fontSize: '1.8rem',
              }}
            >
              ✨ LOGO FINAL: Minimalista con Onda - Tipografía Ancha
            </h2>
            <div style={{ display: 'flex', gap: '3rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <svg width="260" height="70" viewBox="0 0 155 45" xmlns="http://www.w3.org/2000/svg">
                <text
                  x="0"
                  y="28"
                  fontFamily="Arial, sans-serif"
                  fontWeight="900"
                  fontSize="26"
                  letterSpacing="3"
                  fill="#8B5CF6"
                >
                  MIRA
                </text>
                <text
                  x="85"
                  y="28"
                  fontFamily="Arial, sans-serif"
                  fontWeight="900"
                  fontSize="26"
                  letterSpacing="3"
                  fill="#fff"
                >
                  LAB
                </text>
                <path
                  d="M 0 38 Q 38.75 35 77.5 38 T 155 38"
                  stroke="#8B5CF6"
                  strokeWidth="2.5"
                  fill="none"
                />
              </svg>

              <div style={{ background: 'white', padding: '1.5rem 2.5rem', borderRadius: '8px' }}>
                <svg
                  width="260"
                  height="70"
                  viewBox="0 0 155 45"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <text
                    x="0"
                    y="28"
                    fontFamily="Arial, sans-serif"
                    fontWeight="900"
                    fontSize="26"
                    letterSpacing="3"
                    fill="#8B5CF6"
                  >
                    MIRA
                  </text>
                  <text
                    x="85"
                    y="28"
                    fontFamily="Arial, sans-serif"
                    fontWeight="900"
                    fontSize="26"
                    letterSpacing="3"
                    fill="#000"
                  >
                    LAB
                  </text>
                  <path
                    d="M 0 38 Q 38.75 35 77.5 38 T 155 38"
                    stroke="#8B5CF6"
                    strokeWidth="2.5"
                    fill="none"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Opción 1a: LAB en cursiva fluida */}
          <div
            style={{
              background: '#1a1a1a',
              padding: '3rem',
              marginBottom: '3rem',
              borderRadius: '12px',
            }}
          >
            <h2 style={{ color: '#8B5CF6', marginBottom: '2rem', fontFamily: 'Arial, sans-serif' }}>
              Opción 1a: LAB Cursiva Fluida
            </h2>
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
                  fontFamily="Brush Script MT, cursive"
                  fontStyle="italic"
                  fontSize="26"
                  fill="#fff"
                >
                  Lab
                </text>
                <path
                  d="M 0 35 Q 30 32 60 35 T 120 35"
                  stroke="#8B5CF6"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>

              <div style={{ background: 'white', padding: '1rem 2rem', borderRadius: '8px' }}>
                <svg
                  width="200"
                  height="60"
                  viewBox="0 0 120 40"
                  xmlns="http://www.w3.org/2000/svg"
                >
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
                    fontFamily="Brush Script MT, cursive"
                    fontStyle="italic"
                    fontSize="26"
                    fill="#000"
                  >
                    Lab
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

          {/* Opción 1b: LAB con inclinación suave */}
          <div
            style={{
              background: '#1a1a1a',
              padding: '3rem',
              marginBottom: '3rem',
              borderRadius: '12px',
            }}
          >
            <h2 style={{ color: '#8B5CF6', marginBottom: '2rem', fontFamily: 'Arial, sans-serif' }}>
              Opción 1b: LAB Inclinada
            </h2>
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
                  x="62"
                  y="28"
                  fontFamily="Georgia, serif"
                  fontStyle="italic"
                  fontWeight="600"
                  fontSize="24"
                  fill="#fff"
                >
                  Lab
                </text>
                <path
                  d="M 0 35 Q 30 32 60 35 T 120 35"
                  stroke="#8B5CF6"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>

              <div style={{ background: 'white', padding: '1rem 2rem', borderRadius: '8px' }}>
                <svg
                  width="200"
                  height="60"
                  viewBox="0 0 120 40"
                  xmlns="http://www.w3.org/2000/svg"
                >
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
                    x="62"
                    y="28"
                    fontFamily="Georgia, serif"
                    fontStyle="italic"
                    fontWeight="600"
                    fontSize="24"
                    fill="#000"
                  >
                    Lab
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

          {/* Opción 1c: LAB con fuente ligera fluida */}
          <div
            style={{
              background: '#1a1a1a',
              padding: '3rem',
              marginBottom: '3rem',
              borderRadius: '12px',
            }}
          >
            <h2 style={{ color: '#8B5CF6', marginBottom: '2rem', fontFamily: 'Arial, sans-serif' }}>
              Opción 1c: LAB Ligera y Fluida
            </h2>
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
                  x="62"
                  y="28"
                  fontFamily="Trebuchet MS, sans-serif"
                  fontWeight="300"
                  fontSize="25"
                  fill="#fff"
                  letterSpacing="2"
                >
                  Lab
                </text>
                <path
                  d="M 0 35 Q 30 32 60 35 T 120 35"
                  stroke="#8B5CF6"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>

              <div style={{ background: 'white', padding: '1rem 2rem', borderRadius: '8px' }}>
                <svg
                  width="200"
                  height="60"
                  viewBox="0 0 120 40"
                  xmlns="http://www.w3.org/2000/svg"
                >
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
                    x="62"
                    y="28"
                    fontFamily="Trebuchet MS, sans-serif"
                    fontWeight="300"
                    fontSize="25"
                    fill="#000"
                    letterSpacing="2"
                  >
                    Lab
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

          {/* Opción 1d: LAB con letra redondeada moderna */}
          <div
            style={{
              background: '#1a1a1a',
              padding: '3rem',
              marginBottom: '3rem',
              borderRadius: '12px',
            }}
          >
            <h2 style={{ color: '#8B5CF6', marginBottom: '2rem', fontFamily: 'Arial, sans-serif' }}>
              Opción 1d: LAB Redondeada
            </h2>
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
                  x="61"
                  y="29"
                  fontFamily="Verdana, sans-serif"
                  fontWeight="500"
                  fontSize="22"
                  fill="#fff"
                >
                  Lab
                </text>
                <path
                  d="M 0 35 Q 30 32 60 35 T 120 35"
                  stroke="#8B5CF6"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>

              <div style={{ background: 'white', padding: '1rem 2rem', borderRadius: '8px' }}>
                <svg
                  width="200"
                  height="60"
                  viewBox="0 0 120 40"
                  xmlns="http://www.w3.org/2000/svg"
                >
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
                    x="61"
                    y="29"
                    fontFamily="Verdana, sans-serif"
                    fontWeight="500"
                    fontSize="22"
                    fill="#000"
                  >
                    Lab
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

          {/* Sans-Serif Minúsculas - 6 opciones */}
          <div
            style={{
              background: '#1a1a1a',
              padding: '3rem',
              marginBottom: '3rem',
              borderRadius: '12px',
            }}
          >
            <h2 style={{ color: '#8B5CF6', marginBottom: '2rem', fontFamily: 'Arial, sans-serif' }}>
              S1: lab Helvetica Light
            </h2>
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
                  fontFamily="Helvetica, Arial, sans-serif"
                  fontWeight="300"
                  fontSize="24"
                  fill="#fff"
                >
                  lab
                </text>
                <path
                  d="M 0 35 Q 30 32 60 35 T 120 35"
                  stroke="#8B5CF6"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
              <div style={{ background: 'white', padding: '1rem 2rem', borderRadius: '8px' }}>
                <svg
                  width="200"
                  height="60"
                  viewBox="0 0 120 40"
                  xmlns="http://www.w3.org/2000/svg"
                >
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
                    fontFamily="Helvetica, Arial, sans-serif"
                    fontWeight="300"
                    fontSize="24"
                    fill="#000"
                  >
                    lab
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

          <div
            style={{
              background: '#1a1a1a',
              padding: '3rem',
              marginBottom: '3rem',
              borderRadius: '12px',
            }}
          >
            <h2 style={{ color: '#8B5CF6', marginBottom: '2rem', fontFamily: 'Arial, sans-serif' }}>
              S2: lab Futura
            </h2>
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
                  fontFamily="Century Gothic, sans-serif"
                  fontWeight="400"
                  fontSize="23"
                  fill="#fff"
                >
                  lab
                </text>
                <path
                  d="M 0 35 Q 30 32 60 35 T 120 35"
                  stroke="#8B5CF6"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
              <div style={{ background: 'white', padding: '1rem 2rem', borderRadius: '8px' }}>
                <svg
                  width="200"
                  height="60"
                  viewBox="0 0 120 40"
                  xmlns="http://www.w3.org/2000/svg"
                >
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
                    fontFamily="Century Gothic, sans-serif"
                    fontWeight="400"
                    fontSize="23"
                    fill="#000"
                  >
                    lab
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

          <div
            style={{
              background: '#1a1a1a',
              padding: '3rem',
              marginBottom: '3rem',
              borderRadius: '12px',
            }}
          >
            <h2 style={{ color: '#8B5CF6', marginBottom: '2rem', fontFamily: 'Arial, sans-serif' }}>
              S3: lab Avenir
            </h2>
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
                  fontFamily="Trebuchet MS, sans-serif"
                  fontWeight="400"
                  fontSize="24"
                  fill="#fff"
                >
                  lab
                </text>
                <path
                  d="M 0 35 Q 30 32 60 35 T 120 35"
                  stroke="#8B5CF6"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
              <div style={{ background: 'white', padding: '1rem 2rem', borderRadius: '8px' }}>
                <svg
                  width="200"
                  height="60"
                  viewBox="0 0 120 40"
                  xmlns="http://www.w3.org/2000/svg"
                >
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
                    fontFamily="Trebuchet MS, sans-serif"
                    fontWeight="400"
                    fontSize="24"
                    fill="#000"
                  >
                    lab
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

          <div
            style={{
              background: '#1a1a1a',
              padding: '3rem',
              marginBottom: '3rem',
              borderRadius: '12px',
            }}
          >
            <h2 style={{ color: '#8B5CF6', marginBottom: '2rem', fontFamily: 'Arial, sans-serif' }}>
              S4: lab Thin Moderna
            </h2>
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
                  fontWeight="200"
                  fontSize="26"
                  letterSpacing="1"
                  fill="#fff"
                >
                  lab
                </text>
                <path
                  d="M 0 35 Q 30 32 60 35 T 120 35"
                  stroke="#8B5CF6"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
              <div style={{ background: 'white', padding: '1rem 2rem', borderRadius: '8px' }}>
                <svg
                  width="200"
                  height="60"
                  viewBox="0 0 120 40"
                  xmlns="http://www.w3.org/2000/svg"
                >
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
                    fontWeight="200"
                    fontSize="26"
                    letterSpacing="1"
                    fill="#000"
                  >
                    lab
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

          <div
            style={{
              background: '#1a1a1a',
              padding: '3rem',
              marginBottom: '3rem',
              borderRadius: '12px',
            }}
          >
            <h2 style={{ color: '#8B5CF6', marginBottom: '2rem', fontFamily: 'Arial, sans-serif' }}>
              S5: lab Condensada
            </h2>
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
                  fontFamily="Arial Narrow, sans-serif"
                  fontWeight="500"
                  fontSize="24"
                  letterSpacing="-1"
                  fill="#fff"
                >
                  lab
                </text>
                <path
                  d="M 0 35 Q 30 32 60 35 T 120 35"
                  stroke="#8B5CF6"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
              <div style={{ background: 'white', padding: '1rem 2rem', borderRadius: '8px' }}>
                <svg
                  width="200"
                  height="60"
                  viewBox="0 0 120 40"
                  xmlns="http://www.w3.org/2000/svg"
                >
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
                    fontFamily="Arial Narrow, sans-serif"
                    fontWeight="500"
                    fontSize="24"
                    letterSpacing="-1"
                    fill="#000"
                  >
                    lab
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

          <div
            style={{
              background: '#1a1a1a',
              padding: '3rem',
              marginBottom: '3rem',
              borderRadius: '12px',
            }}
          >
            <h2 style={{ color: '#8B5CF6', marginBottom: '2rem', fontFamily: 'Arial, sans-serif' }}>
              S6: lab Geométrica
            </h2>
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
                  fontFamily="Tahoma, sans-serif"
                  fontWeight="400"
                  fontSize="22"
                  letterSpacing="2"
                  fill="#fff"
                >
                  lab
                </text>
                <path
                  d="M 0 35 Q 30 32 60 35 T 120 35"
                  stroke="#8B5CF6"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
              <div style={{ background: 'white', padding: '1rem 2rem', borderRadius: '8px' }}>
                <svg
                  width="200"
                  height="60"
                  viewBox="0 0 120 40"
                  xmlns="http://www.w3.org/2000/svg"
                >
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
                    fontFamily="Tahoma, sans-serif"
                    fontWeight="400"
                    fontSize="22"
                    letterSpacing="2"
                    fill="#000"
                  >
                    lab
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

          {/* Cursivas - 15 opciones */}
          <div
            style={{
              background: '#1a1a1a',
              padding: '3rem',
              marginBottom: '3rem',
              borderRadius: '12px',
            }}
          >
            <h2 style={{ color: '#8B5CF6', marginBottom: '2rem', fontFamily: 'Arial, sans-serif' }}>
              C1: Lab Script Clásica
            </h2>
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
                <text x="58" y="29" fontFamily="Brush Script MT, cursive" fontSize="28" fill="#fff">
                  Lab
                </text>
                <path
                  d="M 0 35 Q 30 32 60 35 T 120 35"
                  stroke="#8B5CF6"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
              <div style={{ background: 'white', padding: '1rem 2rem', borderRadius: '8px' }}>
                <svg
                  width="200"
                  height="60"
                  viewBox="0 0 120 40"
                  xmlns="http://www.w3.org/2000/svg"
                >
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
                    x="58"
                    y="29"
                    fontFamily="Brush Script MT, cursive"
                    fontSize="28"
                    fill="#000"
                  >
                    Lab
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

          <div
            style={{
              background: '#1a1a1a',
              padding: '3rem',
              marginBottom: '3rem',
              borderRadius: '12px',
            }}
          >
            <h2 style={{ color: '#8B5CF6', marginBottom: '2rem', fontFamily: 'Arial, sans-serif' }}>
              C2: Lab Elegante Fina
            </h2>
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
                  fontFamily="Lucida Handwriting, cursive"
                  fontSize="22"
                  fill="#fff"
                >
                  Lab
                </text>
                <path
                  d="M 0 35 Q 30 32 60 35 T 120 35"
                  stroke="#8B5CF6"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
              <div style={{ background: 'white', padding: '1rem 2rem', borderRadius: '8px' }}>
                <svg
                  width="200"
                  height="60"
                  viewBox="0 0 120 40"
                  xmlns="http://www.w3.org/2000/svg"
                >
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
                    fontFamily="Lucida Handwriting, cursive"
                    fontSize="22"
                    fill="#000"
                  >
                    Lab
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

          <div
            style={{
              background: '#1a1a1a',
              padding: '3rem',
              marginBottom: '3rem',
              borderRadius: '12px',
            }}
          >
            <h2 style={{ color: '#8B5CF6', marginBottom: '2rem', fontFamily: 'Arial, sans-serif' }}>
              C3: Lab Manuscrita Suave
            </h2>
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
                <text x="60" y="28" fontFamily="Segoe Script, cursive" fontSize="24" fill="#fff">
                  Lab
                </text>
                <path
                  d="M 0 35 Q 30 32 60 35 T 120 35"
                  stroke="#8B5CF6"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
              <div style={{ background: 'white', padding: '1rem 2rem', borderRadius: '8px' }}>
                <svg
                  width="200"
                  height="60"
                  viewBox="0 0 120 40"
                  xmlns="http://www.w3.org/2000/svg"
                >
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
                  <text x="60" y="28" fontFamily="Segoe Script, cursive" fontSize="24" fill="#000">
                    Lab
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

          <div
            style={{
              background: '#1a1a1a',
              padding: '3rem',
              marginBottom: '3rem',
              borderRadius: '12px',
            }}
          >
            <h2 style={{ color: '#8B5CF6', marginBottom: '2rem', fontFamily: 'Arial, sans-serif' }}>
              C4: Lab Itálica Formal
            </h2>
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
                  fontFamily="Garamond, serif"
                  fontStyle="italic"
                  fontSize="26"
                  fill="#fff"
                >
                  Lab
                </text>
                <path
                  d="M 0 35 Q 30 32 60 35 T 120 35"
                  stroke="#8B5CF6"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
              <div style={{ background: 'white', padding: '1rem 2rem', borderRadius: '8px' }}>
                <svg
                  width="200"
                  height="60"
                  viewBox="0 0 120 40"
                  xmlns="http://www.w3.org/2000/svg"
                >
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
                    fontFamily="Garamond, serif"
                    fontStyle="italic"
                    fontSize="26"
                    fill="#000"
                  >
                    Lab
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

          <div
            style={{
              background: '#1a1a1a',
              padding: '3rem',
              marginBottom: '3rem',
              borderRadius: '12px',
            }}
          >
            <h2 style={{ color: '#8B5CF6', marginBottom: '2rem', fontFamily: 'Arial, sans-serif' }}>
              C5: Lab Caligráfica Bold
            </h2>
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
                <text x="58" y="29" fontFamily="Mistral, cursive" fontSize="30" fill="#fff">
                  Lab
                </text>
                <path
                  d="M 0 35 Q 30 32 60 35 T 120 35"
                  stroke="#8B5CF6"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
              <div style={{ background: 'white', padding: '1rem 2rem', borderRadius: '8px' }}>
                <svg
                  width="200"
                  height="60"
                  viewBox="0 0 120 40"
                  xmlns="http://www.w3.org/2000/svg"
                >
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
                  <text x="58" y="29" fontFamily="Mistral, cursive" fontSize="30" fill="#000">
                    Lab
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

          <div
            style={{
              background: '#1a1a1a',
              padding: '3rem',
              marginBottom: '3rem',
              borderRadius: '12px',
            }}
          >
            <h2 style={{ color: '#8B5CF6', marginBottom: '2rem', fontFamily: 'Arial, sans-serif' }}>
              C6: Lab Script Moderna
            </h2>
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
                  fontFamily="Courier New, monospace"
                  fontStyle="italic"
                  fontWeight="300"
                  fontSize="22"
                  fill="#fff"
                >
                  Lab
                </text>
                <path
                  d="M 0 35 Q 30 32 60 35 T 120 35"
                  stroke="#8B5CF6"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
              <div style={{ background: 'white', padding: '1rem 2rem', borderRadius: '8px' }}>
                <svg
                  width="200"
                  height="60"
                  viewBox="0 0 120 40"
                  xmlns="http://www.w3.org/2000/svg"
                >
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
                    fontFamily="Courier New, monospace"
                    fontStyle="italic"
                    fontWeight="300"
                    fontSize="22"
                    fill="#000"
                  >
                    Lab
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

          <div
            style={{
              background: '#1a1a1a',
              padding: '3rem',
              marginBottom: '3rem',
              borderRadius: '12px',
            }}
          >
            <h2 style={{ color: '#8B5CF6', marginBottom: '2rem', fontFamily: 'Arial, sans-serif' }}>
              C7: Lab Fluida Ligera
            </h2>
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
                  fontFamily="Comic Sans MS, cursive"
                  fontWeight="300"
                  fontSize="24"
                  fill="#fff"
                >
                  Lab
                </text>
                <path
                  d="M 0 35 Q 30 32 60 35 T 120 35"
                  stroke="#8B5CF6"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
              <div style={{ background: 'white', padding: '1rem 2rem', borderRadius: '8px' }}>
                <svg
                  width="200"
                  height="60"
                  viewBox="0 0 120 40"
                  xmlns="http://www.w3.org/2000/svg"
                >
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
                    fontFamily="Comic Sans MS, cursive"
                    fontWeight="300"
                    fontSize="24"
                    fill="#000"
                  >
                    Lab
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

          <div
            style={{
              background: '#1a1a1a',
              padding: '3rem',
              marginBottom: '3rem',
              borderRadius: '12px',
            }}
          >
            <h2 style={{ color: '#8B5CF6', marginBottom: '2rem', fontFamily: 'Arial, sans-serif' }}>
              C8: Lab Serifada Cursiva
            </h2>
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
                  fontFamily="Times New Roman, serif"
                  fontStyle="italic"
                  fontWeight="600"
                  fontSize="26"
                  fill="#fff"
                >
                  Lab
                </text>
                <path
                  d="M 0 35 Q 30 32 60 35 T 120 35"
                  stroke="#8B5CF6"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
              <div style={{ background: 'white', padding: '1rem 2rem', borderRadius: '8px' }}>
                <svg
                  width="200"
                  height="60"
                  viewBox="0 0 120 40"
                  xmlns="http://www.w3.org/2000/svg"
                >
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
                    fontFamily="Times New Roman, serif"
                    fontStyle="italic"
                    fontWeight="600"
                    fontSize="26"
                    fill="#000"
                  >
                    Lab
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

          <div
            style={{
              background: '#1a1a1a',
              padding: '3rem',
              marginBottom: '3rem',
              borderRadius: '12px',
            }}
          >
            <h2 style={{ color: '#8B5CF6', marginBottom: '2rem', fontFamily: 'Arial, sans-serif' }}>
              C9: Lab Inclinada Delgada
            </h2>
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
                  fontFamily="Palatino, serif"
                  fontStyle="italic"
                  fontWeight="400"
                  fontSize="25"
                  fill="#fff"
                >
                  Lab
                </text>
                <path
                  d="M 0 35 Q 30 32 60 35 T 120 35"
                  stroke="#8B5CF6"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
              <div style={{ background: 'white', padding: '1rem 2rem', borderRadius: '8px' }}>
                <svg
                  width="200"
                  height="60"
                  viewBox="0 0 120 40"
                  xmlns="http://www.w3.org/2000/svg"
                >
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
                    fontFamily="Palatino, serif"
                    fontStyle="italic"
                    fontWeight="400"
                    fontSize="25"
                    fill="#000"
                  >
                    Lab
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

          <div
            style={{
              background: '#1a1a1a',
              padding: '3rem',
              marginBottom: '3rem',
              borderRadius: '12px',
            }}
          >
            <h2 style={{ color: '#8B5CF6', marginBottom: '2rem', fontFamily: 'Arial, sans-serif' }}>
              C10: Lab Handwriting
            </h2>
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
                  x="58"
                  y="28"
                  fontFamily="Lucida Calligraphy, cursive"
                  fontSize="22"
                  fill="#fff"
                >
                  Lab
                </text>
                <path
                  d="M 0 35 Q 30 32 60 35 T 120 35"
                  stroke="#8B5CF6"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
              <div style={{ background: 'white', padding: '1rem 2rem', borderRadius: '8px' }}>
                <svg
                  width="200"
                  height="60"
                  viewBox="0 0 120 40"
                  xmlns="http://www.w3.org/2000/svg"
                >
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
                    x="58"
                    y="28"
                    fontFamily="Lucida Calligraphy, cursive"
                    fontSize="22"
                    fill="#000"
                  >
                    Lab
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

          <div
            style={{
              background: '#1a1a1a',
              padding: '3rem',
              marginBottom: '3rem',
              borderRadius: '12px',
            }}
          >
            <h2 style={{ color: '#8B5CF6', marginBottom: '2rem', fontFamily: 'Arial, sans-serif' }}>
              C11: Lab Script Conectada
            </h2>
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
                  x="58"
                  y="29"
                  fontFamily="Edwardian Script ITC, cursive"
                  fontSize="32"
                  fill="#fff"
                >
                  Lab
                </text>
                <path
                  d="M 0 35 Q 30 32 60 35 T 120 35"
                  stroke="#8B5CF6"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
              <div style={{ background: 'white', padding: '1rem 2rem', borderRadius: '8px' }}>
                <svg
                  width="200"
                  height="60"
                  viewBox="0 0 120 40"
                  xmlns="http://www.w3.org/2000/svg"
                >
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
                    x="58"
                    y="29"
                    fontFamily="Edwardian Script ITC, cursive"
                    fontSize="32"
                    fill="#000"
                  >
                    Lab
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

          <div
            style={{
              background: '#1a1a1a',
              padding: '3rem',
              marginBottom: '3rem',
              borderRadius: '12px',
            }}
          >
            <h2 style={{ color: '#8B5CF6', marginBottom: '2rem', fontFamily: 'Arial, sans-serif' }}>
              C12: Lab Oblicua Moderna
            </h2>
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
                  fontFamily="Tahoma, sans-serif"
                  fontStyle="italic"
                  fontWeight="500"
                  fontSize="23"
                  fill="#fff"
                >
                  Lab
                </text>
                <path
                  d="M 0 35 Q 30 32 60 35 T 120 35"
                  stroke="#8B5CF6"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
              <div style={{ background: 'white', padding: '1rem 2rem', borderRadius: '8px' }}>
                <svg
                  width="200"
                  height="60"
                  viewBox="0 0 120 40"
                  xmlns="http://www.w3.org/2000/svg"
                >
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
                    fontFamily="Tahoma, sans-serif"
                    fontStyle="italic"
                    fontWeight="500"
                    fontSize="23"
                    fill="#000"
                  >
                    Lab
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

          <div
            style={{
              background: '#1a1a1a',
              padding: '3rem',
              marginBottom: '3rem',
              borderRadius: '12px',
            }}
          >
            <h2 style={{ color: '#8B5CF6', marginBottom: '2rem', fontFamily: 'Arial, sans-serif' }}>
              C13: Lab Casual Script
            </h2>
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
                <text x="58" y="29" fontFamily="Bradley Hand, cursive" fontSize="26" fill="#fff">
                  Lab
                </text>
                <path
                  d="M 0 35 Q 30 32 60 35 T 120 35"
                  stroke="#8B5CF6"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
              <div style={{ background: 'white', padding: '1rem 2rem', borderRadius: '8px' }}>
                <svg
                  width="200"
                  height="60"
                  viewBox="0 0 120 40"
                  xmlns="http://www.w3.org/2000/svg"
                >
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
                  <text x="58" y="29" fontFamily="Bradley Hand, cursive" fontSize="26" fill="#000">
                    Lab
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

          <div
            style={{
              background: '#1a1a1a',
              padding: '3rem',
              marginBottom: '3rem',
              borderRadius: '12px',
            }}
          >
            <h2 style={{ color: '#8B5CF6', marginBottom: '2rem', fontFamily: 'Arial, sans-serif' }}>
              C14: Lab Bookman Itálica
            </h2>
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
                  fontFamily="Bookman Old Style, serif"
                  fontStyle="italic"
                  fontSize="24"
                  fill="#fff"
                >
                  Lab
                </text>
                <path
                  d="M 0 35 Q 30 32 60 35 T 120 35"
                  stroke="#8B5CF6"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
              <div style={{ background: 'white', padding: '1rem 2rem', borderRadius: '8px' }}>
                <svg
                  width="200"
                  height="60"
                  viewBox="0 0 120 40"
                  xmlns="http://www.w3.org/2000/svg"
                >
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
                    fontFamily="Bookman Old Style, serif"
                    fontStyle="italic"
                    fontSize="24"
                    fill="#000"
                  >
                    Lab
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

          <div
            style={{
              background: '#1a1a1a',
              padding: '3rem',
              marginBottom: '3rem',
              borderRadius: '12px',
            }}
          >
            <h2 style={{ color: '#8B5CF6', marginBottom: '2rem', fontFamily: 'Arial, sans-serif' }}>
              C15: Lab Copperplate
            </h2>
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
                  x="58"
                  y="28"
                  fontFamily="Copperplate, serif"
                  fontStyle="italic"
                  fontSize="20"
                  letterSpacing="1"
                  fill="#fff"
                >
                  Lab
                </text>
                <path
                  d="M 0 35 Q 30 32 60 35 T 120 35"
                  stroke="#8B5CF6"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
              <div style={{ background: 'white', padding: '1rem 2rem', borderRadius: '8px' }}>
                <svg
                  width="200"
                  height="60"
                  viewBox="0 0 120 40"
                  xmlns="http://www.w3.org/2000/svg"
                >
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
                    x="58"
                    y="28"
                    fontFamily="Copperplate, serif"
                    fontStyle="italic"
                    fontSize="20"
                    letterSpacing="1"
                    fill="#000"
                  >
                    Lab
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

          {/* Opción 2: Doble Ola */}
          <div
            style={{
              background: '#1a1a1a',
              padding: '3rem',
              marginBottom: '3rem',
              borderRadius: '12px',
            }}
          >
            <h2 style={{ color: '#8B5CF6', marginBottom: '2rem', fontFamily: 'Arial, sans-serif' }}>
              Opción 2: Doble Ola
            </h2>
            <div style={{ display: 'flex', gap: '3rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <svg width="200" height="60" viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg">
                <text
                  x="0"
                  y="24"
                  fontFamily="Arial, sans-serif"
                  fontWeight="700"
                  fontSize="24"
                  fill="#8B5CF6"
                >
                  MIRA
                </text>
                <text
                  x="60"
                  y="24"
                  fontFamily="Arial, sans-serif"
                  fontWeight="700"
                  fontSize="24"
                  fill="#fff"
                >
                  LAB
                </text>
                <path
                  d="M 0 32 Q 30 29 60 32 T 120 32"
                  stroke="#8B5CF6"
                  strokeWidth="2.5"
                  fill="none"
                />
                <path
                  d="M 0 37 Q 30 34 60 37 T 120 37"
                  stroke="#A78BFA"
                  strokeWidth="1.5"
                  fill="none"
                  opacity="0.7"
                />
              </svg>

              <div style={{ background: 'white', padding: '1rem 2rem', borderRadius: '8px' }}>
                <svg
                  width="200"
                  height="60"
                  viewBox="0 0 120 40"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <text
                    x="0"
                    y="24"
                    fontFamily="Arial, sans-serif"
                    fontWeight="700"
                    fontSize="24"
                    fill="#8B5CF6"
                  >
                    MIRA
                  </text>
                  <text
                    x="60"
                    y="24"
                    fontFamily="Arial, sans-serif"
                    fontWeight="700"
                    fontSize="24"
                    fill="#000"
                  >
                    LAB
                  </text>
                  <path
                    d="M 0 32 Q 30 29 60 32 T 120 32"
                    stroke="#8B5CF6"
                    strokeWidth="2.5"
                    fill="none"
                  />
                  <path
                    d="M 0 37 Q 30 34 60 37 T 120 37"
                    stroke="#A78BFA"
                    strokeWidth="1.5"
                    fill="none"
                    opacity="0.7"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Opción 3: Ola Rellena */}
          <div
            style={{
              background: '#1a1a1a',
              padding: '3rem',
              marginBottom: '3rem',
              borderRadius: '12px',
            }}
          >
            <h2 style={{ color: '#8B5CF6', marginBottom: '2rem', fontFamily: 'Arial, sans-serif' }}>
              Opción 3: Ola Rellena
            </h2>
            <div style={{ display: 'flex', gap: '3rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <svg width="200" height="60" viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M 0 35 Q 30 28 60 35 T 120 35 L 120 40 L 0 40 Z"
                  fill="#8B5CF6"
                  opacity="0.3"
                />
                <path
                  d="M 0 35 Q 30 28 60 35 T 120 35"
                  stroke="#8B5CF6"
                  strokeWidth="2.5"
                  fill="none"
                />
                <text
                  x="0"
                  y="24"
                  fontFamily="Arial, sans-serif"
                  fontWeight="700"
                  fontSize="24"
                  fill="#fff"
                >
                  MIRALAB
                </text>
              </svg>

              <div style={{ background: 'white', padding: '1rem 2rem', borderRadius: '8px' }}>
                <svg
                  width="200"
                  height="60"
                  viewBox="0 0 120 40"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M 0 35 Q 30 28 60 35 T 120 35 L 120 40 L 0 40 Z"
                    fill="#8B5CF6"
                    opacity="0.3"
                  />
                  <path
                    d="M 0 35 Q 30 28 60 35 T 120 35"
                    stroke="#8B5CF6"
                    strokeWidth="2.5"
                    fill="none"
                  />
                  <text
                    x="0"
                    y="24"
                    fontFamily="Arial, sans-serif"
                    fontWeight="700"
                    fontSize="24"
                    fill="#000"
                  >
                    MIRALAB
                  </text>
                </svg>
              </div>
            </div>
          </div>

          {/* Opción 4: Triple Ola Gradiente */}
          <div
            style={{
              background: '#1a1a1a',
              padding: '3rem',
              marginBottom: '3rem',
              borderRadius: '12px',
            }}
          >
            <h2 style={{ color: '#8B5CF6', marginBottom: '2rem', fontFamily: 'Arial, sans-serif' }}>
              Opción 4: Triple Ola Gradiente
            </h2>
            <div style={{ display: 'flex', gap: '3rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <svg width="200" height="60" viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg">
                <text
                  x="0"
                  y="20"
                  fontFamily="Arial, sans-serif"
                  fontWeight="700"
                  fontSize="24"
                  fill="#fff"
                >
                  MIRALAB
                </text>
                <path
                  d="M 0 28 Q 30 25 60 28 T 120 28"
                  stroke="#C4B5FD"
                  strokeWidth="1.5"
                  fill="none"
                />
                <path
                  d="M 0 32 Q 30 29 60 32 T 120 32"
                  stroke="#A78BFA"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M 0 37 Q 30 34 60 37 T 120 37"
                  stroke="#8B5CF6"
                  strokeWidth="2.5"
                  fill="none"
                />
              </svg>

              <div style={{ background: 'white', padding: '1rem 2rem', borderRadius: '8px' }}>
                <svg
                  width="200"
                  height="60"
                  viewBox="0 0 120 40"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <text
                    x="0"
                    y="20"
                    fontFamily="Arial, sans-serif"
                    fontWeight="700"
                    fontSize="24"
                    fill="#000"
                  >
                    MIRALAB
                  </text>
                  <path
                    d="M 0 28 Q 30 25 60 28 T 120 28"
                    stroke="#C4B5FD"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <path
                    d="M 0 32 Q 30 29 60 32 T 120 32"
                    stroke="#A78BFA"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M 0 37 Q 30 34 60 37 T 120 37"
                    stroke="#8B5CF6"
                    strokeWidth="2.5"
                    fill="none"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Opción 5: Ola Fluida Animada */}
          <div
            style={{
              background: '#1a1a1a',
              padding: '3rem',
              marginBottom: '3rem',
              borderRadius: '12px',
            }}
          >
            <h2 style={{ color: '#8B5CF6', marginBottom: '2rem', fontFamily: 'Arial, sans-serif' }}>
              Opción 5: Ola Fluida
            </h2>
            <div style={{ display: 'flex', gap: '3rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <svg width="200" height="60" viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg">
                <text
                  x="0"
                  y="26"
                  fontFamily="Arial, sans-serif"
                  fontWeight="700"
                  fontSize="24"
                  fill="#8B5CF6"
                >
                  MIRA
                </text>
                <text
                  x="60"
                  y="26"
                  fontFamily="Arial, sans-serif"
                  fontWeight="700"
                  fontSize="24"
                  fill="#fff"
                >
                  LAB
                </text>
                <path
                  d="M 0 33 Q 15 30 30 33 Q 45 36 60 33 Q 75 30 90 33 Q 105 36 120 33"
                  stroke="#8B5CF6"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>

              <div style={{ background: 'white', padding: '1rem 2rem', borderRadius: '8px' }}>
                <svg
                  width="200"
                  height="60"
                  viewBox="0 0 120 40"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <text
                    x="0"
                    y="26"
                    fontFamily="Arial, sans-serif"
                    fontWeight="700"
                    fontSize="24"
                    fill="#8B5CF6"
                  >
                    MIRA
                  </text>
                  <text
                    x="60"
                    y="26"
                    fontFamily="Arial, sans-serif"
                    fontWeight="700"
                    fontSize="24"
                    fill="#000"
                  >
                    LAB
                  </text>
                  <path
                    d="M 0 33 Q 15 30 30 33 Q 45 36 60 33 Q 75 30 90 33 Q 105 36 120 33"
                    stroke="#8B5CF6"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Opción 6: Ola con Gotas */}
          <div
            style={{
              background: '#1a1a1a',
              padding: '3rem',
              marginBottom: '3rem',
              borderRadius: '12px',
            }}
          >
            <h2 style={{ color: '#8B5CF6', marginBottom: '2rem', fontFamily: 'Arial, sans-serif' }}>
              Opción 6: Ola con Gotas
            </h2>
            <div style={{ display: 'flex', gap: '3rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <svg width="200" height="60" viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="10" r="1.5" fill="#8B5CF6" opacity="0.5" />
                <circle cx="25" cy="8" r="1" fill="#A78BFA" opacity="0.6" />
                <circle cx="40" cy="11" r="1.2" fill="#C4B5FD" opacity="0.5" />
                <text
                  x="0"
                  y="26"
                  fontFamily="Arial, sans-serif"
                  fontWeight="700"
                  fontSize="24"
                  fill="#fff"
                >
                  MIRALAB
                </text>
                <path
                  d="M 0 35 Q 30 32 60 35 T 120 35"
                  stroke="#8B5CF6"
                  strokeWidth="2.5"
                  fill="none"
                />
              </svg>

              <div style={{ background: 'white', padding: '1rem 2rem', borderRadius: '8px' }}>
                <svg
                  width="200"
                  height="60"
                  viewBox="0 0 120 40"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="10" cy="10" r="1.5" fill="#8B5CF6" opacity="0.5" />
                  <circle cx="25" cy="8" r="1" fill="#A78BFA" opacity="0.6" />
                  <circle cx="40" cy="11" r="1.2" fill="#C4B5FD" opacity="0.5" />
                  <text
                    x="0"
                    y="26"
                    fontFamily="Arial, sans-serif"
                    fontWeight="700"
                    fontSize="24"
                    fill="#000"
                  >
                    MIRALAB
                  </text>
                  <path
                    d="M 0 35 Q 30 32 60 35 T 120 35"
                    stroke="#8B5CF6"
                    strokeWidth="2.5"
                    fill="none"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Opción 7: Ola Debajo del Texto */}
          <div
            style={{
              background: '#1a1a1a',
              padding: '3rem',
              marginBottom: '3rem',
              borderRadius: '12px',
            }}
          >
            <h2 style={{ color: '#8B5CF6', marginBottom: '2rem', fontFamily: 'Arial, sans-serif' }}>
              Opción 7: Ola Integrada
            </h2>
            <div style={{ display: 'flex', gap: '3rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <svg width="200" height="60" viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M 0 20 Q 30 14 60 20 T 120 20 L 120 40 L 0 40 Z"
                  fill="#8B5CF6"
                  opacity="0.2"
                />
                <text
                  x="10"
                  y="28"
                  fontFamily="Arial, sans-serif"
                  fontWeight="800"
                  fontSize="24"
                  fill="#fff"
                >
                  MIRALAB
                </text>
              </svg>

              <div style={{ background: 'white', padding: '1rem 2rem', borderRadius: '8px' }}>
                <svg
                  width="200"
                  height="60"
                  viewBox="0 0 120 40"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M 0 20 Q 30 14 60 20 T 120 20 L 120 40 L 0 40 Z"
                    fill="#8B5CF6"
                    opacity="0.2"
                  />
                  <text
                    x="10"
                    y="28"
                    fontFamily="Arial, sans-serif"
                    fontWeight="800"
                    fontSize="24"
                    fill="#000"
                  >
                    MIRALAB
                  </text>
                </svg>
              </div>
            </div>
          </div>

          {/* Minimalista original por si acaso */}
          <div
            style={{
              background: '#1a1a1a',
              padding: '3rem',
              marginBottom: '3rem',
              borderRadius: '12px',
            }}
          >
            <h2 style={{ color: '#8B5CF6', marginBottom: '2rem', fontFamily: 'Arial, sans-serif' }}>
              Opción 1: Minimalista con Onda
            </h2>
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
                <path
                  d="M 0 35 Q 30 32 60 35 T 120 35"
                  stroke="#8B5CF6"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>

              <div style={{ background: 'white', padding: '1rem 2rem', borderRadius: '8px' }}>
                <svg
                  width="200"
                  height="60"
                  viewBox="0 0 120 40"
                  xmlns="http://www.w3.org/2000/svg"
                >
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
            <h2 style={{ color: '#8B5CF6', marginBottom: '2rem', fontFamily: 'Arial, sans-serif' }}>
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
                <svg
                  width="220"
                  height="60"
                  viewBox="0 0 140 40"
                  xmlns="http://www.w3.org/2000/svg"
                >
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
            <h2 style={{ color: '#8B5CF6', marginBottom: '2rem', fontFamily: 'Arial, sans-serif' }}>
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
                <svg
                  width="220"
                  height="60"
                  viewBox="0 0 120 40"
                  xmlns="http://www.w3.org/2000/svg"
                >
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
            <h2 style={{ color: '#8B5CF6', marginBottom: '2rem', fontFamily: 'Arial, sans-serif' }}>
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
                <svg
                  width="220"
                  height="60"
                  viewBox="0 0 140 40"
                  xmlns="http://www.w3.org/2000/svg"
                >
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
            <h2 style={{ color: '#8B5CF6', marginBottom: '2rem', fontFamily: 'Arial, sans-serif' }}>
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
                <svg
                  width="220"
                  height="60"
                  viewBox="0 0 140 40"
                  xmlns="http://www.w3.org/2000/svg"
                >
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
              href="/es"
              style={{
                color: '#8B5CF6',
                textDecoration: 'none',
                fontSize: '1.2rem',
                padding: '1rem 2rem',
                border: '2px solid #8B5CF6',
                borderRadius: '8px',
                display: 'inline-block',
                fontFamily: 'Arial, sans-serif',
              }}
            >
              {'<- Volver al sitio'}
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
