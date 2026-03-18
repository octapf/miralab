import Navbar from '@/components/Navbar/Navbar';
import Hero from '@/components/Hero/Hero';
import About from '@/components/About/About';
import Services from '@/components/Services/Services';
import Portfolio from '@/components/Portfolio/Portfolio';
import Contact from '@/components/Contact/Contact';
import FloatingWhatsApp from '@/components/FloatingWhatsApp/FloatingWhatsApp';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export function generateStaticParams() {
  return [{ locale: 'es' }, { locale: 'en' }, { locale: 'it' }];
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('footer');

  return (
    <main>
      <Navbar locale={locale} />
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Contact />

      <FloatingWhatsApp />

      <footer
        style={{
          textAlign: 'center',
          padding: '2rem',
          background: 'var(--bg-card)',
          borderTop: '1px solid var(--border-color)',
          color: 'var(--text-secondary)',
        }}
      >
        <p>{t('rights')}</p>
        <p style={{ fontSize: '0.82rem', marginTop: '0.25rem', opacity: 0.7 }}>{t('trademark')}</p>
        <div style={{ marginTop: '0.5rem', display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            href={`/${locale}/terminos`}
            style={{ color: 'var(--accent-primary)', textDecoration: 'underline', fontSize: '0.9rem' }}
          >
            {t('terms')}
          </Link>
          <Link
            href={`/${locale}/privacy`}
            style={{ color: 'var(--accent-primary)', textDecoration: 'underline', fontSize: '0.9rem' }}
          >
            {t('privacy')}
          </Link>
        </div>
      </footer>
    </main>
  );
}
