'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import styles from './Services.module.scss';

const serviceIcons = {
  webDev: '💻',
  mobileDev: '📱',
  consulting: '🎯'
};

export default function Services() {
  const t = useTranslations('services');

  const services = [
    {
      key: 'webDev',
      icon: serviceIcons.webDev,
      title: t('webDev.title'),
      description: t('webDev.description')
    },
    {
      key: 'mobileDev',
      icon: serviceIcons.mobileDev,
      title: t('mobileDev.title'),
      description: t('mobileDev.description')
    },
    {
      key: 'consulting',
      icon: serviceIcons.consulting,
      title: t('consulting.title'),
      description: t('consulting.description')
    }
  ];

  return (
    <section id="services" className={styles.services}>
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

        <div className={styles.grid}>
          {services.map((service, index) => (
            <motion.div
              key={service.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className={styles.card}
            >
              <div className={styles.icon}>{service.icon}</div>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDescription}>{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
