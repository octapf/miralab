export interface PortfolioProject {
  id: number;
  key: 'rize' | 'matchpoint' | 'proshop';
  image: string;
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
