'use client';

import Link from 'next/link';
import { useCallback, useState } from 'react';
import type { CvPdfPayload } from './cvPdfTypes';
import styles from './cv.module.scss';

function FlagEs({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 3 2" aria-hidden>
      <rect width="3" height="2" fill="#c60b1e" />
      <rect y="0.5" width="3" height="1" fill="#ffc400" />
    </svg>
  );
}

function FlagGb({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 60 30" aria-hidden>
      <path fill="#012169" d="M0 0h60v30H0z" />
      <path stroke="#fff" strokeWidth="6" d="M0 0l60 30M60 0L0 30" />
      <path stroke="#c8102e" strokeWidth="4" d="M0 0l60 30M60 0L0 30" />
      <path stroke="#fff" strokeWidth="10" d="M30 0v30M0 15h60" />
      <path stroke="#c8102e" strokeWidth="6" d="M30 0v30M0 15h60" />
    </svg>
  );
}

function FlagIt({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 3 2" aria-hidden>
      <rect width="1" height="2" fill="#009246" />
      <rect x="1" width="1" height="2" fill="#fff" />
      <rect x="2" width="1" height="2" fill="#ce2b37" />
    </svg>
  );
}

type CvPageActionsProps = {
  locale: string;
  langSwitchAria: string;
  langEs: string;
  langEn: string;
  langIt: string;
  pdfLabel: string;
  pdfGenerating: string;
  pdfAria: string;
  pdfFilename: string;
  cvPdfPayload: CvPdfPayload;
};

export default function CvPageActions({
  locale,
  langSwitchAria,
  langEs,
  langEn,
  langIt,
  pdfLabel,
  pdfGenerating,
  pdfAria,
  pdfFilename,
  cvPdfPayload,
}: CvPageActionsProps) {
  const [busy, setBusy] = useState(false);

  const downloadPdf = useCallback(async () => {
    if (typeof window === 'undefined' || busy) return;
    setBusy(true);
    try {
      const { pdf } = await import('@react-pdf/renderer');
      const { default: CvPdfDocument } = await import('./CvPdfDocument');
      const blob = await pdf(<CvPdfDocument data={cvPdfPayload} />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = pdfFilename;
      a.rel = 'noopener';
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setBusy(false);
    }
  }, [busy, cvPdfPayload, pdfFilename]);

  return (
    <div className={styles.topBarActions}>
      <nav className={styles.langSwitch} aria-label={langSwitchAria}>
        <Link
          href="/es/cv"
          className={`${styles.langSwitchLink} ${locale === 'es' ? styles.langSwitchLinkActive : ''}`}
          aria-current={locale === 'es' ? 'true' : undefined}
        >
          <FlagEs className={styles.langFlag} />
          <span>{langEs}</span>
        </Link>
        <span className={styles.langSwitchSep} aria-hidden="true">
          ·
        </span>
        <Link
          href="/en/cv"
          className={`${styles.langSwitchLink} ${locale === 'en' ? styles.langSwitchLinkActive : ''}`}
          aria-current={locale === 'en' ? 'true' : undefined}
        >
          <FlagGb className={styles.langFlag} />
          <span>{langEn}</span>
        </Link>
        <span className={styles.langSwitchSep} aria-hidden="true">
          ·
        </span>
        <Link
          href="/it/cv"
          className={`${styles.langSwitchLink} ${locale === 'it' ? styles.langSwitchLinkActive : ''}`}
          aria-current={locale === 'it' ? 'true' : undefined}
        >
          <FlagIt className={styles.langFlag} />
          <span>{langIt}</span>
        </Link>
      </nav>
      <button
        type="button"
        className={styles.pdfButton}
        onClick={() => void downloadPdf()}
        disabled={busy}
        aria-label={pdfAria}
        aria-busy={busy}
      >
        {busy ? pdfGenerating : pdfLabel}
      </button>
    </div>
  );
}
