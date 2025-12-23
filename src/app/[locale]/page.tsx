import Navbar from '@/components/Navbar/Navbar';
import Hero from '@/components/Hero/Hero';
import About from '@/components/About/About';
import Services from '@/components/Services/Services';
import Portfolio from '@/components/Portfolio/Portfolio';
import Contact from '@/components/Contact/Contact';
import FloatingWhatsApp from '@/components/FloatingWhatsApp/FloatingWhatsApp';

export function generateStaticParams() {
  return [{ locale: 'es' }, { locale: 'en' }, { locale: 'it' }];
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <main>
      <Navbar locale={locale} />
      <Hero />
      <About />
      <Contact />
      <Services />
      <Portfolio />
      
      <FloatingWhatsApp />
      
      <footer style={{
        textAlign: 'center',
        padding: '2rem',
        background: 'var(--bg-card)',
        borderTop: '1px solid var(--border-color)',
        color: 'var(--text-secondary)'
      }}>
        <p>© 2025 MIRALAB. Todos los derechos reservados.</p>
      </footer>
    </main>
  );
}
