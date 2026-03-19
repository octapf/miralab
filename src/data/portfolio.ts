export interface PortfolioProject {
  id: number;
  key: 'rize' | 'matchpoint' | 'proshop';
  image: string;
  /** Ancho/alto del logo en next/image (SVG u otros) */
  logoIntrinsicWidth?: number;
  logoIntrinsicHeight?: number;
  /** Matchpoint: wordmark en texto (app/index.tsx), sin imagen */
  heroUsesWordmark?: boolean;
  techStack: string[];
  link: string;
  storeUrl?: string;
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 1,
    key: 'rize',
    image: '/images/rize-logo.svg',
    techStack: ['Next.js', 'TypeScript', 'Node.js'],
    link: 'https://github.com/octapf/rize',
  },
  {
    id: 2,
    key: 'matchpoint',
    image: '/images/matchpoint-logo.svg',
    heroUsesWordmark: true,
    techStack: ['React', 'TypeScript', 'API Integrations'],
    link: 'https://github.com/octapf/matchpoint',
    storeUrl: 'https://play.google.com/store/apps/details?id=com.miralab.matchpoint',
  },
  {
    id: 3,
    key: 'proshop',
    image: '/images/proshop-logo.svg',
    techStack: ['Next.js', 'TypeScript', 'E-commerce'],
    link: 'https://github.com/octapf/proshop',
  },
];
