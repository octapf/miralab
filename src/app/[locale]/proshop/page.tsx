import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import styles from './proshop.module.scss';
import ProshopCopyCarousel from './ProshopCopyCarousel';

type ProshopPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: ProshopPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'proshopLanding' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDescription'),
      url: `https://miralab.ar/${locale}/proshop`,
      siteName: 'MIRALAB',
      images: [
        {
          url: 'https://miralab.ar/images/proshop-og.jpg',
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
      images: ['https://miralab.ar/images/proshop-og.jpg'],
    },
  };
}

export default async function ProshopLandingPage({ params }: ProshopPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'proshopLanding' });
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
              src="/images/proshop-logo.svg"
              alt="Proshop logo"
              width={72}
              height={72}
              className={styles.logo}
              priority
            />
            <h1 className={styles.title}>{t('title')}</h1>
          </div>
          <p className={styles.subtitle}>{t('subtitle')}</p>
          <ProshopCopyCarousel slides={copySlides} />

          <div className={styles.ctaRow}>
            <Link href={`/${locale}/proshop/privacy`} className={styles.primaryCta}>
              {t('privacyCta')}
            </Link>
            <Link href={`/${locale}/proshop/delete-account`} className={styles.secondaryCta}>
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
            src="/images/proshop-mobile-preview.svg"
            alt={t('previewAlt')}
            width={920}
            height={560}
            className={styles.preview}
            unoptimized
            priority
          />
        </div>
      </section>
    </main>
  );
}
