'use client';

import Image from 'next/image';

interface LogoProps {
  theme?: 'light' | 'dark';
  width?: number;
  height?: number;
}

/** Intrinsic size of `miralab-logo-transparent.png` */
const LOGO_WIDTH = 1200;
const LOGO_HEIGHT = 272;

export default function Logo({ theme = 'dark', width = 130, height: _height = 35 }: LogoProps) {
  void _height;
  const src =
    theme === 'dark'
      ? '/images/miralab-logo-white.png'
      : '/images/miralab-logo-transparent.png';

  return (
    <Image
      src={src}
      alt="MIRALAB"
      width={LOGO_WIDTH}
      height={LOGO_HEIGHT}
      sizes={`${width}px`}
      unoptimized
      style={{
        display: 'block',
        width: `min(${width}px, 88vw)`,
        height: 'auto',
      }}
      priority
    />
  );
}
