import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import styles from './terminos.module.scss';

export default async function TerminosPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('terms');
  
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
        
        <Link href={`/${locale}`} className={styles.backLink}>
          ← {t('backHome')}
        </Link>
      </div>
    </div>
  );
}
