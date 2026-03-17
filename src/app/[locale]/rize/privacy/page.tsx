import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

type PrivacyPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PrivacyPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'rizePrivacy' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
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

export default async function RizePrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'rizePrivacy' });

  return (
    <main style={sectionStyle}>
      <Link href={`/${locale}/rize`} style={backButtonStyle}>
        {t('backButton')}
      </Link>

      <h1 style={headingStyle}>{t('title')}</h1>
      <p style={mutedStyle}>{t('lastUpdated')}</p>

      <p>{t('intro')}</p>

      <h2>{t('controllerTitle')}</h2>
      <p>{t('controllerBody')}</p>

      <h2>{t('scopeTitle')}</h2>
      <p>{t('scopeBody')}</p>

      <h2>{t('dataCollectedTitle')}</h2>
      <ul>
        <li>{t('dataCollectedItem1')}</li>
        <li>{t('dataCollectedItem2')}</li>
        <li>{t('dataCollectedItem3')}</li>
        <li>{t('dataCollectedItem4')}</li>
      </ul>

      <h2>{t('dataUseTitle')}</h2>
      <p>{t('dataUseIntro')}</p>
      <ul>
        <li>{t('dataUseItem1')}</li>
        <li>{t('dataUseItem2')}</li>
        <li>{t('dataUseItem3')}</li>
        <li>{t('dataUseItem4')}</li>
      </ul>

      <h2>{t('devicePermissionsTitle')}</h2>
      <p>{t('devicePermissionsBody')}</p>

      <h2>{t('sharingTitle')}</h2>
      <p>{t('sharingBody')}</p>

      <h2>{t('transfersTitle')}</h2>
      <p>{t('transfersBody')}</p>

      <h2>{t('retentionTitle')}</h2>
      <p>{t('retentionBody')}</p>

      <h2>{t('securityTitle')}</h2>
      <p>{t('securityBody')}</p>

      <h2>{t('childrenTitle')}</h2>
      <p>{t('childrenBody')}</p>

      <h2>{t('rightsTitle')}</h2>
      <p>{t('rightsBody')}</p>

      <h2>{t('accountDeletionTitle')}</h2>
      <p>{t('accountDeletionBody')}</p>

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

      <Link href={`/${locale}/rize`} style={backButtonStyle}>
        {t('backButton')}
      </Link>
    </main>
  );
}
