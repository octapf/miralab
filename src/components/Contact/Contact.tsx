'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import styles from './Contact.module.scss';

export default function Contact() {
  const t = useTranslations('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for form submission
    console.log('Form submitted:', formData);
    alert('Formulario enviado (placeholder)');
  };

  const handleWhatsApp = () => {
    const phoneNumber = '1234567890'; // Replace with actual number
    const message = encodeURIComponent('Hola, me gustaría información sobre sus servicios');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <section id="contact" className={styles.contact}>
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

        <div className={styles.content}>
          <motion.form
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className={styles.form}
          >
            <div className={styles.formGroup}>
              <label htmlFor="name">{t('form.name')}</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">{t('form.email')}</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message">{t('form.message')}</label>
              <textarea
                id="message"
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={styles.submitBtn}
            >
              {t('form.send')}
            </motion.button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={styles.whatsappSection}
          >
            <div className={styles.whatsappCard}>
              <div className={styles.whatsappIcon}>📱</div>
              <h3 className={styles.whatsappTitle}>WhatsApp</h3>
              <p className={styles.whatsappDescription}>
                ¿Prefieres chatear? Contáctanos directamente por WhatsApp
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleWhatsApp}
                className={styles.whatsappBtn}
              >
                {t('whatsapp')}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
