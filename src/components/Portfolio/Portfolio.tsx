'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { portfolioProjects } from '@/data/portfolio';
import styles from './Portfolio.module.scss';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Portfolio() {
  const t = useTranslations('portfolio');

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
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className={styles.swiper}
          >
            {portfolioProjects.map((project) => (
              <SwiperSlide key={project.id}>
                <div className={styles.card}>
                  <div className={styles.imageContainer}>
                    <div className={styles.imagePlaceholder}>
                      <span className={styles.imageIcon}>🖼️</span>
                    </div>
                  </div>
                  
                  <div className={styles.content}>
                    <h3 className={styles.projectTitle}>{project.title}</h3>
                    <p className={styles.projectDescription}>{project.description}</p>
                    
                    <div className={styles.techStack}>
                      <span className={styles.techLabel}>{t('techStack')}:</span>
                      <div className={styles.tags}>
                        {project.techStack.map((tech, index) => (
                          <span key={index} className={styles.tag}>{tech}</span>
                        ))}
                      </div>
                    </div>
                    
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={styles.link}
                    >
                      {t('viewProject')} →
                    </a>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}
