import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import CvPageActions from './CvPageActions';
import CvMatchpointWordmarkSvg from './CvMatchpointWordmarkSvg';
import PlayStoreGlyph from './PlayStoreGlyph';
import type { CvPdfEducationLine, CvPdfPayload } from './cvPdfTypes';
import styles from './cv.module.scss';

/** Marcador en `matchpointDescription` (solo icono en web); en PDF se omite. */
const PLAYSTORE_PLACEHOLDER = '|PS|';

type CvPageProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return [{ locale: 'es' }, { locale: 'en' }, { locale: 'it' }];
}

const linkedinProfileUrl =
  process.env.NEXT_PUBLIC_LINKEDIN_URL?.trim() || 'https://www.linkedin.com/in/octaviofrangipani/';

const CV_WHATSAPP_E164 = '34722696514';
const whatsappChatHref = `https://wa.me/${CV_WHATSAPP_E164}`;

const EDUCATION_TITLE_SEP = ' · ';

const MATCHPOINT_REPO_URL = 'https://github.com/octapf/matchpoint';
const MATCHPOINT_WEB_REPO_URL = 'https://github.com/octapf/matchpoint-web';
const MATCHPOINT_WEB_SITE_URL = 'https://matchpoint.miralab.ar/';
const MIRALAB_SITE_URL = 'https://miralab.ar';
const MIRALAB_LOGO_IMAGE = '/images/miralab-logo-transparent.png';

function FeaturedProjectBody({ text }: { text: string }) {
  if (!text.includes(PLAYSTORE_PLACEHOLDER)) {
    return <>{text}</>;
  }
  const [before, after] = text.split(PLAYSTORE_PLACEHOLDER);
  return (
    <>
      {before}
      <span className={styles.playStoreInline} aria-label="Google Play" title="Google Play">
        <PlayStoreGlyph className={styles.playStoreGlyph} />
      </span>
      {after}
    </>
  );
}

const EXPERIENCE_ROLES = [
  { title: 'roleMinsaitTitle', meta: 'roleMinsaitMeta', company: 'roleMinsaitCompany', bullets: 'roleMinsaitBullets' },
  { title: 'roleUrbanyTitle', meta: 'roleUrbanyMeta', company: 'roleUrbanyCompany', bullets: 'roleUrbanyBullets' },
  { title: 'roleWorksutTitle', meta: 'roleWorksutMeta', company: 'roleWorksutCompany', bullets: 'roleWorksutBullets' },
  { title: 'roleLetiziaTitle', meta: 'roleLetiziaMeta', company: 'roleLetiziaCompany', bullets: 'roleLetiziaBullets' },
  { title: 'roleSodimacTitle', meta: 'roleSodimacMeta', company: 'roleSodimacCompany', bullets: 'roleSodimacBullets' },
] as const;

export async function generateMetadata({ params }: CvPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'cvOctavio' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDescription'),
      url: `https://miralab.ar/${locale}/cv`,
      siteName: 'MIRALAB',
      type: 'website',
    },
  };
}

export default async function CvOctavioFrangipaniPage({ params }: CvPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'cvOctavio' });
  const educationLines = t.raw('educationLines') as string[];

  const educationPdf: CvPdfEducationLine[] = educationLines.map((line) => {
    const cut = line.indexOf(EDUCATION_TITLE_SEP);
    if (cut === -1) return { kind: 'plain', text: line };
    return {
      kind: 'split',
      title: line.slice(0, cut),
      rest: line.slice(cut + EDUCATION_TITLE_SEP.length),
    };
  });

  const rolesPdf = EXPERIENCE_ROLES.map((role) => ({
    title: t(role.title),
    meta: t(role.meta),
    company: t(role.company),
    bullets: (t.raw(role.bullets) as string[]).map((text, index) => ({
      text,
      accent: role.bullets === 'roleMinsaitBullets' && index === 0,
    })),
  }));

  const cvPdfPayload: CvPdfPayload = {
    pdfLanguage: locale === 'es' ? 'es' : locale === 'it' ? 'it' : 'en',
    metaTitle: t('metaTitle'),
    headline: t('headline'),
    location: t('location'),
    phone: '+34 722 696 514',
    whatsappHref: whatsappChatHref,
    email: 'frangipani.octavio@gmail.com',
    linkedinUrl: linkedinProfileUrl,
    linkedinLabel: t('linkedin'),
    githubUrl: 'https://github.com/octapf',
    githubLabel: t('github'),
    portfolioUrl: 'https://miralab.ar',
    portfolioLabel: t('portfolio'),
    langSpanish: t('langSpanish'),
    langEnglish: t('langEnglish'),
    sectionSummary: t('sectionSummary'),
    // Raw string keeps <k>…</k> for CvPdfDocument; plain t() would require rich-text `k` parts.
    summaryRich: t.raw('summaryRich') as string,
    sectionSkills: t('sectionSkills'),
    skills: [
      { title: t('skillFrontendTitle'), body: t('skillFrontendBody') },
      { title: t('skillBackendTitle'), body: t('skillBackendBody') },
      { title: t('skillTestingTitle'), body: t('skillTestingBody') },
      { title: t('skillToolingTitle'), body: t('skillToolingBody') },
    ],
    sectionExperience: t('sectionExperience'),
    roles: rolesPdf,
    sectionEducation: t('sectionEducation'),
    education: educationPdf,
    sectionFeaturedProjects: t('sectionFeaturedProjects'),
    featuredProjects: [
      {
        title: t('matchpointTitle'),
        description: t('matchpointDescription'),
        stackLabel: t('matchpointStackLabel'),
        stack: t('matchpointStack'),
        repoUrl: MATCHPOINT_REPO_URL,
        imageAlt: t('matchpointImageAlt'),
        imageLinkAria: t('matchpointImageLinkAria'),
        imageWidth: 1200,
        imageHeight: 586,
        imageComfortPadding: true,
        matchpointWordmark: true,
        matchpointWordmarkVariant: 'mobile',
      },
      {
        title: t('matchpointWebTitle'),
        description: t('matchpointWebDescription'),
        stackLabel: t('matchpointStackLabel'),
        stack: t('matchpointWebStack'),
        repoUrl: MATCHPOINT_WEB_REPO_URL,
        imageAlt: t('matchpointWebImageAlt'),
        imageLinkAria: t('matchpointWebImageLinkAria'),
        imageWidth: 1200,
        imageHeight: 586,
        imageComfortPadding: true,
        matchpointWordmark: true,
        matchpointWordmarkVariant: 'web',
      },
      {
        title: t('miralabTitle'),
        description: t('miralabDescription'),
        stackLabel: t('matchpointStackLabel'),
        stack: t('miralabStack'),
        repoUrl: MIRALAB_SITE_URL,
        imageSrc: MIRALAB_LOGO_IMAGE,
        imageAlt: t('miralabImageAlt'),
        imageLinkAria: t('miralabImageLinkAria'),
        imageWidth: 1200,
        imageHeight: 272,
        imageComfortPadding: true,
      },
    ],
  };

  return (
    <main className={styles.page}>
      <div className={styles.topBar}>
        <Link href={`/${locale}`} className={styles.backLink} aria-label={t('backAria')}>
          <span aria-hidden="true">←</span>
          <span>{t('back')}</span>
        </Link>
        <CvPageActions
          key={locale}
          locale={locale}
          langSwitchAria={t('langSwitchAria')}
          langEs={t('langEs')}
          langEn={t('langEn')}
          pdfLabel={t('pdfDownload')}
          pdfGenerating={t('pdfGenerating')}
          pdfAria={t('pdfAria')}
          pdfFilename={t('pdfFilename')}
          cvPdfPayload={cvPdfPayload}
        />
      </div>

      <div id="cv-pdf-content" className={styles.pdfContent}>
      <header className={styles.header}>
        <h1 className={styles.name}>Octavio Frangipani</h1>
        <p className={styles.headline}>{t('headline')}</p>

        <div className={styles.meta} aria-label={t('metaContactAria')}>
          <span className={styles.metaLocation}>
            <svg
              className={styles.metaIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>
            <span>{t('location')}</span>
          </span>
          <span className={styles.metaDot} aria-hidden="true">
            ·
          </span>
          <a
            href={whatsappChatHref}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.metaLinkWithIcon}
            aria-label={t('whatsappAria')}
          >
            <svg className={styles.metaIcon} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            <span className={styles.metaLinkLabel}>+34 722 696 514</span>
          </a>
          <span className={styles.metaDot} aria-hidden="true">
            ·
          </span>
          <a
            href="mailto:frangipani.octavio@gmail.com"
            className={styles.metaLinkWithIcon}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              className={styles.metaIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
            <span className={styles.metaLinkLabel}>frangipani.octavio@gmail.com</span>
          </a>
          <span className={styles.metaDot} aria-hidden="true">
            ·
          </span>
          <a
            href={linkedinProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.metaLinkWithIcon}
          >
            <svg className={styles.metaIcon} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            <span className={styles.metaLinkLabel}>{t('linkedin')}</span>
          </a>
          <span className={styles.metaDot} aria-hidden="true">
            ·
          </span>
          <a
            href="https://github.com/octapf"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.metaLinkWithIcon}
          >
            <svg className={styles.metaIcon} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.755 0 1.266-.012 2.285-.012 2.593 0 .263.18.572.681.475A9.947 9.947 0 0022 12.017C22 6.484 17.522 2 12 2z"
              />
            </svg>
            <span className={styles.metaLinkLabel}>{t('github')}</span>
          </a>
          <span className={styles.metaDot} aria-hidden="true">
            ·
          </span>
          <a
            href="https://miralab.ar"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.metaLinkWithIcon}
          >
            <svg
              className={styles.metaIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
              />
            </svg>
            <span className={styles.metaLinkLabel}>{t('portfolio')}</span>
          </a>
        </div>

        <div className={styles.langs} aria-label={t('langsAria')}>
          <svg
            className={styles.langIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802"
            />
          </svg>
          <span>{t('langSpanish')}</span>
          <span className={styles.langSep} aria-hidden="true">
            ·
          </span>
          <span>{t('langEnglish')}</span>
        </div>
      </header>

      <section className={styles.section} aria-labelledby="summary">
        <h2 id="summary" className={styles.sectionTitle}>
          {t('sectionSummary')}
        </h2>
        <p className={styles.summary}>
          {t.rich('summaryRich', {
            k: (chunks) => <span className={styles.summaryEm}>{chunks}</span>,
          })}
        </p>
      </section>

      <section className={styles.section} aria-labelledby="skills">
        <h2 id="skills" className={styles.sectionTitle}>
          {t('sectionSkills')}
        </h2>

        <div className={styles.skillsGrid}>
          <div className={styles.skillCard}>
            <h3 className={styles.skillTitle}>{t('skillFrontendTitle')}</h3>
            <p className={styles.skillBody}>{t('skillFrontendBody')}</p>
          </div>
          <div className={styles.skillCard}>
            <h3 className={styles.skillTitle}>{t('skillBackendTitle')}</h3>
            <p className={styles.skillBody}>{t('skillBackendBody')}</p>
          </div>
          <div className={styles.skillCard}>
            <h3 className={styles.skillTitle}>{t('skillTestingTitle')}</h3>
            <p className={styles.skillBody}>{t('skillTestingBody')}</p>
          </div>
          <div className={styles.skillCard}>
            <h3 className={styles.skillTitle}>{t('skillToolingTitle')}</h3>
            <p className={styles.skillBody}>{t('skillToolingBody')}</p>
          </div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="experience">
        <h2 id="experience" className={styles.sectionTitle}>
          {t('sectionExperience')}
        </h2>

        <div className={styles.experienceList}>
          {EXPERIENCE_ROLES.map((role) => {
            const bullets = t.raw(role.bullets) as string[];
            return (
              <article key={role.title} className={styles.role}>
                <div className={styles.roleTop}>
                  <h3 className={styles.roleTitle}>{t(role.title)}</h3>
                  <span className={styles.roleMeta}>{t(role.meta)}</span>
                </div>
                <p className={styles.roleCompany}>{t(role.company)}</p>
                <ul className={styles.bullets}>
                  {bullets.map((line, index) => (
                    <li key={`${role.bullets}-${index}`}>
                      {role.bullets === 'roleMinsaitBullets' && index === 0 ? (
                        <span className={styles.bulletAccent}>{line}</span>
                      ) : (
                        line
                      )}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="education">
        <h2 id="education" className={styles.sectionTitle}>
          {t('sectionEducation')}
        </h2>
        <article className={styles.educationCard}>
          <ul className={styles.educationBullets}>
            {educationLines.map((line, index) => {
              const cut = line.indexOf(EDUCATION_TITLE_SEP);
              if (cut === -1) {
                return (
                  <li key={`education-${index}`}>
                    <span className={styles.summaryEm}>{line}</span>
                  </li>
                );
              }
              const titlePart = line.slice(0, cut);
              const rest = line.slice(cut + EDUCATION_TITLE_SEP.length);
              return (
                <li key={`education-${index}`}>
                  <span className={styles.summaryEm}>{titlePart}</span>
                  {EDUCATION_TITLE_SEP}
                  {rest}
                </li>
              );
            })}
          </ul>
        </article>
      </section>

      <section className={styles.section} aria-labelledby="featured-projects">
        <h2 id="featured-projects" className={styles.sectionTitle}>
          {t('sectionFeaturedProjects')}
        </h2>
        <div className={styles.featuredProjectsList}>
          {cvPdfPayload.featuredProjects.map((fp) => (
            <article key={fp.repoUrl} className={styles.featuredProject} aria-label={fp.title}>
              <div className={styles.featuredProjectImageWrap}>
                <Link
                  href={fp.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={
                    fp.matchpointWordmark && fp.imageComfortPadding
                      ? `${styles.featuredProjectImageLink} ${styles.featuredProjectImageLinkWordmarkPadded}`
                      : fp.imageComfortPadding
                        ? `${styles.featuredProjectImageLink} ${styles.featuredProjectImageLinkPadded}`
                        : `${styles.featuredProjectImageLink} ${styles.featuredProjectImageLinkFull}`
                  }
                  aria-label={fp.imageLinkAria}
                >
                  {fp.matchpointWordmark ? (
                    <CvMatchpointWordmarkSvg
                      variant={fp.matchpointWordmarkVariant}
                      className={styles.featuredProjectWordmarkSvg}
                    />
                  ) : (
                    <Image
                      src={fp.imageSrc ?? ''}
                      alt={fp.imageAlt}
                      fill
                      className={
                        fp.imageSlightScale
                          ? `${styles.featuredProjectImage} ${styles.featuredProjectImageScaleUp}`
                          : styles.featuredProjectImage
                      }
                      sizes="(max-width: 720px) min(90vw, 280px), min(45vw, 280px)"
                    />
                  )}
                </Link>
              </div>
              {fp.repoUrl === MATCHPOINT_WEB_REPO_URL ? (
                <div className={styles.featuredProjectQuickLinks} aria-label="Matchpoint Web links">
                  <Link
                    href={MATCHPOINT_WEB_SITE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.featuredProjectQuickLink}
                    aria-label="Abrir Matchpoint Web"
                  >
                    <span className={styles.featuredProjectQuickLinkLabel}>Web</span>
                  </Link>
                  <Link
                    href={MATCHPOINT_WEB_REPO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.featuredProjectQuickLink}
                    aria-label="Abrir repositorio en GitHub"
                  >
                    <span className={styles.featuredProjectQuickLinkLabel}>GitHub</span>
                  </Link>
                </div>
              ) : fp.repoUrl === MATCHPOINT_REPO_URL ? (
                <div
                  className={`${styles.featuredProjectQuickLinks} ${styles.featuredProjectQuickLinksSingle}`}
                  aria-label="Matchpoint Mobile links"
                >
                  <Link
                    href={MATCHPOINT_REPO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.featuredProjectQuickLink}
                    aria-label="Abrir repositorio en GitHub"
                  >
                    <span className={styles.featuredProjectQuickLinkLabel}>GitHub</span>
                  </Link>
                </div>
              ) : fp.repoUrl === MIRALAB_SITE_URL ? (
                <div
                  className={`${styles.featuredProjectQuickLinks} ${styles.featuredProjectQuickLinksSingle}`}
                  aria-label="Miralab links"
                >
                  <Link
                    href={MIRALAB_SITE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.featuredProjectQuickLink}
                    aria-label="Abrir Miralab"
                  >
                    <span className={styles.featuredProjectQuickLinkLabel}>Web</span>
                  </Link>
                </div>
              ) : null}
              <p className={styles.featuredProjectBody}>
                <FeaturedProjectBody text={fp.description} />
              </p>
              {fp.stack.trim() ? (
                <p className={styles.featuredProjectStack}>
                  <span className={styles.featuredProjectStackLabel}>{fp.stackLabel}: </span>
                  {fp.stack}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </section>
      </div>

      <div className={styles.bottomActions} aria-label={t('langSwitchAria')}>
        <Link href={`/${locale}`} className={styles.bottomBackLink} aria-label={t('backAria')}>
          <span aria-hidden="true">←</span>
          <span>{t('back')}</span>
        </Link>
        <CvPageActions
          key={`${locale}-bottom`}
          locale={locale}
          langSwitchAria={t('langSwitchAria')}
          langEs={t('langEs')}
          langEn={t('langEn')}
          pdfLabel={t('pdfDownload')}
          pdfGenerating={t('pdfGenerating')}
          pdfAria={t('pdfAria')}
          pdfFilename={t('pdfFilename')}
          cvPdfPayload={cvPdfPayload}
        />
      </div>
    </main>
  );
}
