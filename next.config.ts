import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/cv-octavio-frangipani', destination: '/es/cv', permanent: true },
      { source: '/es/cv-octavio-frangipani', destination: '/es/cv', permanent: true },
      { source: '/en/cv-octavio-frangipani', destination: '/en/cv', permanent: true },
      { source: '/it/cv-octavio-frangipani', destination: '/it/cv', permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
