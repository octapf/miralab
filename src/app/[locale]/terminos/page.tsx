import { useTranslations } from 'next-intl';
import Link from 'next/link';
import styles from './terminos.module.scss';

export default function TerminosPage({ params }: { params: Promise<{ locale: string }> }) {
  return <TerminosContent />;
}

function TerminosContent() {
  const t = useTranslations('terms');
  
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>{t('title')}</h1>
        <p className={styles.subtitle}>{t('subtitle')}</p>
        
        <section className={styles.section}>
          <h2>{t('section1Title')}</h2>
          <p>{t('section1Content')}</p>
          <p>{t('section2Content')}</p>
        </section>
        
        <Link href="/" className={styles.backLink}>
          ← {t('backHome')}
        </Link>
      </div>
    </div>
  );
}
