'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { portfolioProjects } from '@/data/portfolio';
import styles from './Hero.module.scss';

export default function Hero() {
  const t = useTranslations('hero');
  const tPortfolio = useTranslations('portfolio');
  const router = useRouter();
  const heroProjects = useMemo(
    () =>
      portfolioProjects
        .filter(
          (project) =>
            project.key === 'rize' || project.key === 'matchpoint' || project.key === 'proshop'
        )
        .map((project) => ({
          ...project,
          preview:
            project.key === 'rize'
              ? '/images/rize-mobile-preview.svg'
              : project.key === 'matchpoint'
                ? '/images/matchpoint-mobile-preview.svg'
                : '/images/proshop-mobile-preview.svg',
          previewWidth: project.key === 'proshop' ? 920 : 390,
          previewHeight: project.key === 'proshop' ? 560 : 844,
        })),
    []
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [flashActive, setFlashActive] = useState(false);

  useEffect(() => {
    if (heroProjects.length <= 1) return;
    const interval = setInterval(() => {
      setFlashActive(true);
      setActiveIndex((current) => (current + 1) % heroProjects.length);
      setTimeout(() => setFlashActive(false), 280);
    }, 5200);
    return () => clearInterval(interval);
  }, [heroProjects.length]);

  const activeProject = heroProjects[activeIndex];
  const activeProjectLogo =
    activeProject.key === 'matchpoint' ? '/images/matchpoint-icon-512.png' : activeProject.image;
  const showStoreBadges = activeProject.key === 'rize' || activeProject.key === 'matchpoint';
  const isDesktopPreview = activeProject.key === 'proshop';
  const isLandingSlide =
    activeProject.key === 'matchpoint' || activeProject.key === 'rize' || activeProject.key === 'proshop';
  const landingPath =
    activeProject.key === 'rize'
      ? '/rize'
      : activeProject.key === 'matchpoint'
        ? '/matchpoint'
        : activeProject.key === 'proshop'
          ? '/proshop'
          : '';
  const handleSlideClick = () => {
    if (isLandingSlide) {
      router.push(landingPath);
    }
  };

  return (
    <section id="home" className={styles.hero}>
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.35 }}
        className={styles.fullBleed}
      >
        <div className={styles.carousel}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.id}
              className={`${styles.slide} ${isLandingSlide ? styles.clickableSlide : ''}`}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              onClick={handleSlideClick}
              onKeyDown={(event) => {
                if (!isLandingSlide) return;
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  router.push(landingPath);
                }
              }}
              role={isLandingSlide ? 'button' : undefined}
              tabIndex={isLandingSlide ? 0 : -1}
            >
              <div className={styles.leftColumn}>
                <div className={styles.projectHeader}>
                  <div className={styles.projectLogoBadge}>
                    <Image
                      src={activeProjectLogo}
                      alt={`Logo ${tPortfolio(`projects.${activeProject.key}.title`)}`}
                      width={1200}
                      height={630}
                      className={styles.projectLogo}
                      priority
                    />
                  </div>
                  <h3 className={styles.projectName}>{tPortfolio(`projects.${activeProject.key}.title`)}</h3>
                </div>
                <p className={styles.projectDescription}>
                  {tPortfolio(`projects.${activeProject.key}.description`)}
                </p>
                <button
                  className={styles.githubCta}
                  onClick={(event) => {
                    event.stopPropagation();
                    window.open(activeProject.link, '_blank', 'noopener,noreferrer');
                  }}
                >
                  {t('showcaseCta')}
                </button>
              </div>

              <div className={styles.rightColumn}>
                <div className={styles.previewWithStores}>
                  <div
                    className={`${styles.mobilePreview} ${isDesktopPreview ? styles.desktopPreview : ''}`}
                  >
                    <Image
                      src={activeProject.preview}
                      alt={`Mobile preview ${tPortfolio(`projects.${activeProject.key}.title`)}`}
                      width={activeProject.previewWidth}
                      height={activeProject.previewHeight}
                      className={`${styles.previewImage} ${
                        isDesktopPreview ? styles.desktopPreviewImage : ''
                      }`}
                      unoptimized
                      priority
                    />
                  </div>
                  {showStoreBadges ? (
                    <div className={styles.storeBadges} aria-label="Store badges">
                      <Image
                        src="/images/play-store-badge.svg"
                        alt="Google Play Store"
                        width={180}
                        height={54}
                        className={styles.storeBadge}
                        unoptimized
                        loading="lazy"
                      />
                      <Image
                        src="/images/app-store-badge.svg"
                        alt="Apple App Store"
                        width={180}
                        height={54}
                        className={styles.storeBadge}
                        unoptimized
                        loading="lazy"
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className={styles.slideDots}>
            {heroProjects.map((project, index) => (
              <button
                key={project.id}
                className={`${styles.dot} ${index === activeIndex ? styles.activeDot : ''}`}
                aria-label={tPortfolio(`projects.${project.key}.title`)}
                onClick={() => {
                  if (index !== activeIndex) {
                    setFlashActive(true);
                    setActiveIndex(index);
                    setTimeout(() => setFlashActive(false), 280);
                  }
                }}
              />
            ))}
          </div>

          <div className={`${styles.flash} ${flashActive ? styles.flashOn : ''}`} />
        </div>
      </motion.div>
    </section>
  );
}
