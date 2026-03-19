import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import styles from './rize.module.scss';
import RizeCopyCarousel from './RizeCopyCarousel';

type RizePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: RizePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'rizeLanding' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDescription'),
      url: `https://miralab.ar/${locale}/rize`,
      siteName: 'MIRALAB',
      images: [
        {
          url: 'https://miralab.ar/images/rize-og.jpg',
          width: 1200,
          height: 630,
          alt: t('metaTitle'),
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('metaTitle'),
      description: t('metaDescription'),
      images: ['https://miralab.ar/images/rize-og.jpg'],
    },
  };
}

export default async function RizeLandingPage({ params }: RizePageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'rizeLanding' });
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
              src="/images/miralab-logo-transparent.png"
              alt="MIRALAB"
              width={360}
              height={82}
              className={styles.brandLogo}
              priority
            />
          </Link>

          <div className={styles.logoRow}>
            <Image
              src="/images/rize-logo.svg"
              alt="Rize logo"
              width={72}
              height={72}
              className={styles.logo}
              priority
            />
            <h1 className={styles.title}>{t('title')}</h1>
          </div>
          <p className={styles.subtitle}>{t('subtitle')}</p>
          <RizeCopyCarousel slides={copySlides} />

          <div className={styles.ctaRow}>
            <Link href={`/${locale}/rize/privacy`} className={styles.primaryCta}>
              {t('privacyCta')}
            </Link>
            <Link href={`/${locale}/rize/delete-account`} className={styles.secondaryCta}>
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
            src="/images/rize-mobile-preview.svg"
            alt={t('previewAlt')}
            width={390}
            height={844}
            className={styles.preview}
            unoptimized
            priority
          />
          <div className={styles.storeBadges}>
            <Image
              src="/images/play-store-badge.svg"
              alt="Google Play"
              width={180}
              height={54}
              className={styles.storeBadge}
              unoptimized
            />
          </div>
        </div>
      </section>
    </main>
  );
}
