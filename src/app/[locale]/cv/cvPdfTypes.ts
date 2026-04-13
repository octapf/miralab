export type CvPdfSkill = { title: string; body: string };

export type CvPdfBullet = { text: string; accent?: boolean };

export type CvPdfRole = {
  title: string;
  meta: string;
  company: string;
  bullets: CvPdfBullet[];
};

export type CvPdfEducationLine =
  | { kind: 'plain'; text: string }
  | { kind: 'split'; title: string; rest: string };

export type CvPdfFeaturedProject = {
  title: string;
  description: string;
  stackLabel: string;
  stack: string;
  /** Target URL for the clickable image (repo, site, etc.) */
  repoUrl: string;
  /** Public path (e.g. `/images/...`) or absolute URL; PDF resolves against `window.location.origin` in the browser */
  imageSrc?: string;
  imageAlt: string;
  imageLinkAria: string;
  imageWidth: number;
  imageHeight: number;
  /** Aire dentro del marco (logos muy anchos al borde del PNG) */
  imageComfortPadding?: boolean;
  /** Escala ~+6–8% dentro del mismo marco (gráficos que se leen chicos con contain) */
  imageSlightScale?: boolean;
  /** Wordmark Matchpoint en PDF como texto (colores web), sin PNG */
  matchpointWordmark?: boolean;
};

export type CvPdfPayload = {
  /** BCP 47 tag for PDF metadata / accessibility */
  pdfLanguage: string;
  metaTitle: string;
  headline: string;
  location: string;
  phone: string;
  whatsappHref: string;
  email: string;
  linkedinUrl: string;
  linkedinLabel: string;
  githubUrl: string;
  githubLabel: string;
  portfolioUrl: string;
  portfolioLabel: string;
  langSpanish: string;
  langEnglish: string;
  sectionSummary: string;
  summaryRich: string;
  sectionSkills: string;
  skills: CvPdfSkill[];
  sectionExperience: string;
  roles: CvPdfRole[];
  sectionEducation: string;
  education: CvPdfEducationLine[];
  sectionFeaturedProjects: string;
  featuredProjects: CvPdfFeaturedProject[];
};
