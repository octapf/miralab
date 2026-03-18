import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import styles from './matchpoint.module.scss';
import MatchpointCopyCarousel from './MatchpointCopyCarousel';

type MatchpointPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: MatchpointPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'matchpointLanding' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDescription'),
      url: `https://miralab.ar/${locale}/matchpoint`,
      siteName: 'MIRALAB',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('metaTitle'),
      description: t('metaDescription'),
    },
  };
}

export default async function MatchpointLandingPage({ params }: MatchpointPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'matchpointLanding' });
  const copySlides = [
    { title: t('slidePitchTitle'), body: t('description') },
    { title: t('section1Title'), body: t('section1Body') },
    { title: t('section2Title'), body: t('section2Body') },
    { title: t('section3Title'), body: t('section3Body') },
  ];

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.textColumn}>
          <Link href="/" className={styles.brandLink} aria-label="MIRALAB home">
            <Image
              src="/images/miralab-logo.svg"
              alt="MIRALAB"
              width={360}
              height={88}
              className={styles.brandLogo}
              priority
            />
          </Link>

          <div className={styles.logoRow}>
            <Image
              src="/images/matchpoint-icon-512.png"
              alt="Matchpoint logo"
              width={368}
              height={182}
              className={styles.logo}
              priority
            />
            <h1 className={styles.title}>{t('title')}</h1>
          </div>
          <p className={styles.subtitle}>{t('subtitle')}</p>
          <MatchpointCopyCarousel slides={copySlides} />

          <a
            href="https://play.google.com/store/apps/details?id=com.miralab.matchpoint"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.downloadCta}
          >
            {t('downloadCta')}
          </a>

          <div className={styles.ctaRow}>
            <Link href={`/${locale}/matchpoint/privacy`} className={styles.primaryCta}>
              {t('privacyCta')}
            </Link>
            <Link href={`/${locale}/matchpoint/delete-account`} className={styles.secondaryCta}>
              {t('deleteAccountCta')}
            </Link>
          </div>

          <p className={styles.legalFooter}>
            <Link href={`/${locale}/privacy`}>{t('miralabPrivacyLink')}</Link>
            {' · '}
            <span>© 2026 MIRALAB</span>
          </p>
        </div>

        <div className={styles.previewColumn}>
          <Image
            src="/images/matchpoint-mobile-preview.svg"
            alt={t('previewAlt')}
            width={390}
            height={844}
            className={styles.preview}
            unoptimized
            priority
          />
          <div className={styles.storeBadges}>
            <a
              href="https://play.google.com/store/apps/details?id=com.miralab.matchpoint"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Descargar en Google Play"
            >
              <Image
                src="/images/play-store-badge.svg"
                alt="Google Play"
                width={180}
                height={54}
                className={styles.storeBadge}
                unoptimized
              />
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
