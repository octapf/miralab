'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { portfolioProjects } from '@/data/portfolio';
import MatchpointWordmark from '@/components/MatchpointWordmark/MatchpointWordmark';
import styles from './Portfolio.module.scss';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Portfolio() {
  const t = useTranslations('portfolio');
  const tabletSlides = Math.min(2, portfolioProjects.length);
  const useGridLayout = portfolioProjects.length <= 2;

  const openProject = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const renderProjectCard = (project: (typeof portfolioProjects)[number]) => (
    <div
      className={styles.card}
      aria-label={`${t('viewProject')}: ${t(`projects.${project.key}.title`)}`}
      role="link"
      tabIndex={0}
      onClick={() => openProject(project.link)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openProject(project.link);
        }
      }}
    >
      <div className={styles.imageContainer}>
        {project.heroUsesWordmark ? (
          <div className={styles.wordmarkInCard}>
            <MatchpointWordmark variant="portfolio" />
          </div>
        ) : (
          <Image
            src={project.image}
            alt={`Logo de ${t(`projects.${project.key}.title`)}`}
            className={styles.projectImage}
            width={project.logoIntrinsicWidth ?? 1200}
            height={project.logoIntrinsicHeight ?? 630}
            loading="lazy"
          />
        )}
      </div>

      <div className={styles.content}>
        <h3 className={styles.projectTitle}>{t(`projects.${project.key}.title`)}</h3>
        <p className={styles.projectDescription}>{t(`projects.${project.key}.description`)}</p>

        <div className={styles.techStack}>
          <span className={styles.techLabel}>{t('techStack')}:</span>
          <div className={styles.tags}>
            {project.techStack.map((tech, index) => (
              <span key={index} className={styles.tag}>
                {tech}
              </span>
            ))}
          </div>
        </div>

        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
          onClick={(event) => event.stopPropagation()}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className={styles.githubIcon}>
            <path
              fill="currentColor"
              d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.42-4.04-1.42-.55-1.38-1.33-1.75-1.33-1.75-1.1-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.08 1.84 2.84 1.31 3.53 1 .1-.78.42-1.31.76-1.62-2.66-.3-5.47-1.32-5.47-5.9 0-1.3.47-2.36 1.23-3.2-.12-.3-.53-1.53.12-3.17 0 0 1-.32 3.3 1.22A11.5 11.5 0 0 1 12 6.3c1.02 0 2.05.14 3.01.4 2.28-1.54 3.28-1.22 3.28-1.22.66 1.64.25 2.87.13 3.17.78.84 1.23 1.9 1.23 3.2 0 4.6-2.82 5.59-5.5 5.88.43.37.82 1.1.82 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z"
            />
          </svg>
          {t('viewProject')}
        </a>
      </div>
    </div>
  );

  return (
    <section id="portfolio" className={styles.portfolio}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={styles.header}
        >
          <h2 className={styles.title}>{t('title')}</h2>
          <p className={styles.subtitle}>{t('subtitle')}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={styles.swiperContainer}
        >
          {useGridLayout ? (
            <div className={styles.projectsGrid}>
              {portfolioProjects.map((project) => (
                <div key={project.id}>{renderProjectCard(project)}</div>
              ))}
            </div>
          ) : (
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              centerInsufficientSlides
              breakpoints={{
                768: {
                  slidesPerView: tabletSlides,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              className={styles.swiper}
            >
              {portfolioProjects.map((project) => (
                <SwiperSlide key={project.id}>{renderProjectCard(project)}</SwiperSlide>
              ))}
            </Swiper>
          )}
        </motion.div>
      </div>
    </section>
  );
}
