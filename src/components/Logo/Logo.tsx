'use client';

import Image from 'next/image';

interface LogoProps {
  theme?: 'light' | 'dark';
  width?: number;
  height?: number;
}

export default function Logo({ theme = 'dark', width = 130, height = 35 }: LogoProps) {
  void theme;
  return (
    <Image
      src="/images/miralab-logo.svg"
      alt="MIRALAB"
      width={width}
      height={height}
      style={{ display: 'block', width: `${width}px`, height: 'auto' }}
      unoptimized
      priority
    />
  );
}
