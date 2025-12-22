'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import styles from './About.module.scss';

export default function About() {
  const t = useTranslations('about');

  const stats = [
    { value: '10+', label: t('stats.years') },
    { value: '150+', label: t('stats.projects') },
    { value: '100+', label: t('stats.clients') },
    { value: '25+', label: t('stats.team') }
  ];

  const values = [
    {
      title: t('values.innovation'),
      description: t('values.innovationDesc'),
      icon: '💡'
    },
    {
      title: t('values.quality'),
      description: t('values.qualityDesc'),
      icon: '⭐'
    },
    {
      title: t('values.collaboration'),
      description: t('values.collaborationDesc'),
      icon: '🤝'
    },
    {
      title: t('values.integrity'),
      description: t('values.integrityDesc'),
      icon: '🎯'
    }
  ];

  return (
    <section id="about" className={styles.about}>
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
          className={styles.description}
        >
          <p>{t('description')}</p>
        </motion.div>

        <div className={styles.stats}>
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={styles.statCard}
            >
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className={styles.content}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={styles.card}
          >
            <div className={styles.cardIcon}>🎯</div>
            <h3 className={styles.cardTitle}>{t('mission.title')}</h3>
            <p className={styles.cardText}>{t('mission.description')}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={styles.card}
          >
            <div className={styles.cardIcon}>🚀</div>
            <h3 className={styles.cardTitle}>{t('vision.title')}</h3>
            <p className={styles.cardText}>{t('vision.description')}</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={styles.valuesSection}
        >
          <h3 className={styles.valuesTitle}>{t('values.title')}</h3>
          <div className={styles.valuesGrid}>
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className={styles.valueCard}
              >
                <div className={styles.valueIcon}>{value.icon}</div>
                <h4 className={styles.valueTitle}>{value.title}</h4>
                <p className={styles.valueDescription}>{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
