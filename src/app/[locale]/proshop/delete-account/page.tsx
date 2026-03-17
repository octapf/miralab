import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

type DeleteAccountPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: DeleteAccountPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'proshopDeleteAccount' });

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

const listStyle: CSSProperties = {
  listStylePosition: 'outside',
  paddingLeft: '1.3rem',
  marginTop: '0.35rem',
  marginBottom: '1.1rem',
};

const orderedListStyle: CSSProperties = {
  ...listStyle,
  listStyleType: 'decimal',
};

const unorderedListStyle: CSSProperties = {
  ...listStyle,
  listStyleType: 'disc',
};

const listItemStyle: CSSProperties = {
  marginBottom: '0.45rem',
  paddingLeft: '0.2rem',
};

const buttonStyle: CSSProperties = {
  display: 'inline-block',
  marginTop: '1.25rem',
  padding: '0.7rem 1.15rem',
  borderRadius: '999px',
  background: 'var(--accent-primary)',
  color: '#0b0b0b',
  textDecoration: 'none',
  fontWeight: 700,
};

const actionRowStyle: CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.65rem',
  marginTop: '0.35rem',
  marginBottom: '0.9rem',
};

const primaryActionStyle: CSSProperties = {
  display: 'inline-block',
  padding: '0.65rem 1rem',
  borderRadius: '999px',
  background: 'var(--accent-primary)',
  color: '#0b0b0b',
  textDecoration: 'none',
  fontWeight: 700,
};

const secondaryActionStyle: CSSProperties = {
  display: 'inline-block',
  padding: '0.65rem 1rem',
  borderRadius: '999px',
  border: '1px solid var(--border-color)',
  color: 'var(--text-primary)',
  textDecoration: 'none',
  fontWeight: 600,
};

const sectionTitleStyle: CSSProperties = {
  marginTop: '1.35rem',
  marginBottom: '0.35rem',
};

export default async function ProshopDeleteAccountPage({ params }: DeleteAccountPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'proshopDeleteAccount' });

  return (
    <main style={sectionStyle}>
      <Link href={`/${locale}/proshop`} style={buttonStyle}>
        {t('backButton')}
      </Link>

      <h1 style={headingStyle}>{t('title')}</h1>
      <p style={mutedStyle}>{t('lastUpdated')}</p>

      <p>{t('intro')}</p>
      <p>{t('quickActionText')}</p>
      <div style={actionRowStyle}>
        <a href={`mailto:${t('contactEmail')}?subject=${encodeURIComponent(t('emailSubject'))}`} style={primaryActionStyle}>
          {t('emailCta')}
        </a>
        <Link href={`/${locale}/proshop/privacy`} style={secondaryActionStyle}>
          {t('privacyCta')}
        </Link>
      </div>

      <h2 style={sectionTitleStyle}>{t('howToTitle')}</h2>
      <ol style={orderedListStyle}>
        <li style={listItemStyle}>
          {t('howToStep1Prefix')} <strong>{t('contactEmail')}</strong>
        </li>
        <li style={listItemStyle}>
          {t('howToStep2Prefix')} <strong>{t('emailSubject')}</strong>
        </li>
        <li style={listItemStyle}>{t('howToStep3')}</li>
        <li style={listItemStyle}>{t('howToStep4')}</li>
      </ol>

      <h2 style={sectionTitleStyle}>{t('deletedDataTitle')}</h2>
      <ul style={unorderedListStyle}>
        <li style={listItemStyle}>{t('deletedDataItem1')}</li>
        <li style={listItemStyle}>{t('deletedDataItem2')}</li>
        <li style={listItemStyle}>{t('deletedDataItem3')}</li>
      </ul>

      <h2 style={sectionTitleStyle}>{t('retainedDataTitle')}</h2>
      <ul style={unorderedListStyle}>
        <li style={listItemStyle}>{t('retainedDataItem1')}</li>
        <li style={listItemStyle}>{t('retainedDataItem2')}</li>
      </ul>
      <p>{t('retentionPeriod')}</p>

      <h2 style={sectionTitleStyle}>{t('partialDeletionTitle')}</h2>
      <p>{t('partialDeletionBody')}</p>

      <h2 style={sectionTitleStyle}>{t('contactTitle')}</h2>
      <p>
        {t('contactName')}
        <br />
        {t('contactWebsiteLabel')} {t('contactWebsite')}
        <br />
        {t('contactEmailLabel')} {t('contactEmail')}
      </p>

      <Link href={`/${locale}/proshop`} style={buttonStyle}>
        {t('backButton')}
      </Link>
    </main>
  );
}
