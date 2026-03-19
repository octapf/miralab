'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';
import { WHATSAPP_PHONE_NUMBER } from '@/lib/constants';
import Logo from '@/components/Logo/Logo';
import styles from './Navbar.module.scss';

interface NavbarProps {
  locale: string;
}

export default function Navbar({ locale }: NavbarProps) {
  const t = useTranslations('nav');
  const tContact = useTranslations('contact');
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setIsMobileMenuOpen(false); // Cerrar menú al hacer scroll
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false); // Cerrar menú al navegar
    }
  };

  const changeLocale = (newLocale: string) => {
    // Remover el prefijo de locale del pathname actual
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '') || '/';
    const newPath = `/${newLocale}${pathWithoutLocale}`;
    setIsLangDropdownOpen(false);
    router.push(newPath);
  };

  const getLanguageDisplay = (lang: string) => {
    const displays: { [key: string]: string } = {
      es: 'ES',
      en: 'EN',
      it: 'IT',
    };
    return displays[lang] || 'ES';
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent(tContact('whatsappDefaultMessage'));
    window.open(`https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <nav className={`${styles.navbar} ${!isVisible ? styles.hidden : ''}`}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href={`/${locale}`} className={styles.logoLink} aria-label="MIRALAB — Inicio">
            <Logo theme={theme} width={220} height={42} />
          </Link>
        </div>

        <ul className={styles.navLinks}>
          <li>
            <button onClick={() => scrollToSection('home')}>{t('home')}</button>
          </li>
          <li>
            <button onClick={() => scrollToSection('about')}>{t('about')}</button>
          </li>
          <li>
            <button onClick={() => scrollToSection('services')}>{t('services')}</button>
          </li>
          <li>
            <button onClick={() => scrollToSection('portfolio')}>{t('portfolio')}</button>
          </li>
          <li>
            <button onClick={() => scrollToSection('contact')}>{t('contact')}</button>
          </li>
        </ul>

        <div className={styles.actions}>
          <button
            onClick={openWhatsApp}
            className={styles.whatsappBtn}
            aria-label={tContact('whatsappAria')}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
                fill="currentColor"
              />
            </svg>
          </button>
          <div className={styles.langDropdown}>
            <button
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              className={styles.langBtn}
            >
              {getLanguageDisplay(locale)}
            </button>
            {isLangDropdownOpen && (
              <div className={styles.langDropdownMenu}>
                <button
                  onClick={() => changeLocale('es')}
                  className={locale === 'es' ? styles.active : ''}
                >
                  {getLanguageDisplay('es')} Español
                </button>
                <button
                  onClick={() => changeLocale('en')}
                  className={locale === 'en' ? styles.active : ''}
                >
                  {getLanguageDisplay('en')} English
                </button>
                <button
                  onClick={() => changeLocale('it')}
                  className={locale === 'it' ? styles.active : ''}
                >
                  {getLanguageDisplay('it')} Italiano
                </button>
              </div>
            )}
          </div>
          <button onClick={toggleTheme} className={styles.themeBtn}>
            {theme === 'dark' ? '🌙' : '☀️'}
          </button>
          <button
            className={styles.hamburger}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={t('menu')}
          >
            <span className={isMobileMenuOpen ? styles.open : ''}></span>
            <span className={isMobileMenuOpen ? styles.open : ''}></span>
            <span className={isMobileMenuOpen ? styles.open : ''}></span>
          </button>
        </div>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div className={styles.overlay} onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ''}`}>
        <ul className={styles.mobileNavLinks}>
          <li>
            <button onClick={() => scrollToSection('home')}>{t('home')}</button>
          </li>
          <li>
            <button onClick={() => scrollToSection('about')}>{t('about')}</button>
          </li>
          <li>
            <button onClick={() => scrollToSection('services')}>{t('services')}</button>
          </li>
          <li>
            <button onClick={() => scrollToSection('portfolio')}>{t('portfolio')}</button>
          </li>
          <li>
            <button onClick={() => scrollToSection('contact')}>{t('contact')}</button>
          </li>
        </ul>
        <div className={styles.mobileActions}>
          <div className={styles.langDropdown}>
            <button
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              className={styles.langBtn}
            >
              {getLanguageDisplay(locale)}
            </button>
            {isLangDropdownOpen && (
              <div className={styles.langDropdownMenu}>
                <button
                  onClick={() => changeLocale('es')}
                  className={locale === 'es' ? styles.active : ''}
                >
                  {getLanguageDisplay('es')} Español
                </button>
                <button
                  onClick={() => changeLocale('en')}
                  className={locale === 'en' ? styles.active : ''}
                >
                  {getLanguageDisplay('en')} English
                </button>
                <button
                  onClick={() => changeLocale('it')}
                  className={locale === 'it' ? styles.active : ''}
                >
                  {getLanguageDisplay('it')} Italiano
                </button>
              </div>
            )}
          </div>
          <button onClick={toggleTheme} className={styles.themeBtn}>
            {theme === 'dark' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </nav>
  );
}
