import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

type PrivacyPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PrivacyPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'miralabPrivacy' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDescription'),
      url: 'https://miralab.ar/privacy',
      siteName: 'MIRALAB',
    },
  };
}

const sectionStyle: CSSProperties = {
  maxWidth: '900px',
  margin: '0 auto',
  padding: '2rem 1.25rem 3rem',
  lineHeight: 1.65,
  color: 'var(--text-primary)',
};

const headingStyle: CSSProperties = {
  color: 'var(--accent-primary)',
  marginBottom: '0.25rem',
};

const mutedStyle: CSSProperties = {
  color: 'var(--text-secondary)',
  marginTop: 0,
};

const backButtonStyle: CSSProperties = {
  display: 'inline-block',
  marginTop: '1.5rem',
  padding: '0.7rem 1.15rem',
  borderRadius: '999px',
  background: 'var(--accent-primary)',
  color: '#0b0b0b',
  textDecoration: 'none',
  fontWeight: 700,
};

export default async function MiralabPrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'miralabPrivacy' });

  return (
    <main style={sectionStyle}>
      <Link href={`/${locale}`} style={backButtonStyle}>
        {t('backButton')}
      </Link>

      <h1 style={headingStyle}>{t('title')}</h1>
      <p style={mutedStyle}>{t('lastUpdated')}</p>

      <p>{t('intro')}</p>

      <h2>{t('controllerTitle')}</h2>
      <p>{t('controllerBody')}</p>

      <h2>{t('appsTitle')}</h2>
      <p>{t('appsBody')}</p>

      <h2>{t('dataCollectedTitle')}</h2>
      <p>{t('dataCollectedBody')}</p>

      <h2>{t('dataUseTitle')}</h2>
      <p>{t('dataUseBody')}</p>

      <h2>{t('sharingTitle')}</h2>
      <p>{t('sharingBody')}</p>

      <h2>{t('retentionTitle')}</h2>
      <p>{t('retentionBody')}</p>

      <h2>{t('rightsTitle')}</h2>
      <p>{t('rightsBody')}</p>

      <h2>{t('securityTitle')}</h2>
      <p>{t('securityBody')}</p>

      <h2>{t('changesTitle')}</h2>
      <p>
        {t('changesBody')}
        <br />
        <strong>{t('policyUrl')}</strong>
      </p>

      <h2>{t('contactTitle')}</h2>
      <p>
        {t('contactName')}
        <br />
        {t('contactWebsiteLabel')} {t('contactWebsite')}
        <br />
        {t('contactEmailLabel')} {t('contactEmail')}
      </p>

      <Link href={`/${locale}`} style={backButtonStyle}>
        {t('backButton')}
      </Link>
    </main>
  );
}
