'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

export default function Background() {
  const { scrollY } = useScroll();

  // Parallax suave para la red (grid)
  const backgroundPositionY = useTransform(scrollY, (value) => value * -0.2);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        zIndex: -1,
        overflow: 'hidden',
        backgroundColor: '#020010', // Fondo base oscuro profundo
      }}
    >
      {/* 1. Brillos Ambientales Estáticos (Simula la luz de la imagen original) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `
          radial-gradient(circle at 20% 80%, rgba(124, 58, 237, 0.15) 0%, transparent 60%),
          radial-gradient(circle at 80% 20%, rgba(6, 182, 212, 0.15) 0%, transparent 60%)
        `,
          zIndex: 0,
        }}
      />

      {/* 2. Red Tecnológica (Grid + Puntos) animados */}
      <motion.div
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1,
          backgroundImage: "url('/images/fondo.png')",
          backgroundSize: '100% auto',
          backgroundPosition: 'center top',
          backgroundRepeat: 'repeat-y',
          backgroundPositionY,
        }}
      />

      {/* 3. Overlay sutil para asegurar que el texto se lea bien */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(to bottom, rgba(2, 0, 16, 0.2), rgba(2, 0, 16, 0.5))',
          zIndex: 2,
        }}
      />
    </div>
  );
}
