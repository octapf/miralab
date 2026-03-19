'use client';

import styles from './MatchpointWordmark.module.scss';

type MatchpointWordmarkProps = {
  /** Hero carousel: tamaño cercano al splash (48 en RN). Portfolio: algo menor en la tarjeta. */
  variant?: 'hero' | 'portfolio';
  className?: string;
  id?: string;
};

/**
 * Misma idea que Matchpoint app/index.tsx: MATCH (amarillo) + POINT (violeta),
 * peso 900, itálica, letterSpacing -1. Colores de constants/Colors.ts.
 */
export default function MatchpointWordmark({
  variant = 'hero',
  className,
  id,
}: MatchpointWordmarkProps) {
  return (
    <div
      id={id}
      className={`${styles.row} ${variant === 'portfolio' ? styles.portfolio : styles.hero} ${className ?? ''}`}
      aria-label="Matchpoint"
    >
      <span className={styles.match}>MATCH</span>
      <span className={styles.point}>POINT</span>
    </div>
  );
}
