'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useTheme } from '@/contexts/ThemeContext';
import Logo from '@/components/Logo/Logo';
import styles from './Navbar.module.scss';

interface NavbarProps {
  locale: string;
}

export default function Navbar({ locale }: NavbarProps) {
  const t = useTranslations('nav');
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
      es: 'AR',
      en: 'EN',
      it: 'IT',
    };
    return displays[lang] || 'AR';
  };

  return (
    <nav className={`${styles.navbar} ${!isVisible ? styles.hidden : ''}`}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Logo theme={theme} width={130} height={35} />
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
            <button onClick={() => scrollToSection('contact')}>{t('contact')}</button>
          </li>
        </ul>

        <div className={styles.actions}>
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
            aria-label="Menu"
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
