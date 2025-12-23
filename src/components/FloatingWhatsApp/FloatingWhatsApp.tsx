'use client';

import { motion } from 'framer-motion';
import styles from './FloatingWhatsApp.module.scss';

export default function FloatingWhatsApp() {
  const handleWhatsApp = () => {
    const phoneNumber = '5491139131406';
    const message = encodeURIComponent('Hola! Me interesa conocer más sobre los servicios de Miralab');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <motion.button
      onClick={handleWhatsApp}
      className={styles.floatingBtn}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      aria-label="Contactar por WhatsApp"
    >
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.icon}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16 31C23.732 31 30 24.732 30 17C30 9.26801 23.732 3 16 3C8.26801 3 2 9.26801 2 17C2 19.5109 2.661 21.8674 3.81847 23.905L2 31L9.31486 29.3038C11.3014 30.3854 13.5789 31 16 31Z"
          fill="currentColor"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16 28.5C22.3513 28.5 27.5 23.3513 27.5 17C27.5 10.6487 22.3513 5.5 16 5.5C9.64873 5.5 4.5 10.6487 4.5 17C4.5 19.2925 5.16046 21.4292 6.30305 23.2163L5.09 27.91L9.96487 26.8271C11.7073 27.8885 13.7766 28.5 16 28.5Z"
          fill="white"
        />
        <path
          d="M12.5 9.49989C12.1672 8.83131 11.6565 8.8905 11.1407 8.8905C10.2188 8.8905 8.78125 9.99478 8.78125 12.05C8.78125 13.7343 9.52345 15.578 12.0244 18.3361C14.438 20.9979 17.6094 22.3748 20.2422 22.3279C22.875 22.2811 23.4167 20.0154 23.4167 19.2503C23.4167 18.9112 23.2062 18.742 23.0613 18.696C22.1641 18.2654 20.5093 17.4631 20.1328 17.3124C19.7563 17.1617 19.5597 17.3656 19.4375 17.4765C19.0961 17.8018 18.4193 18.7608 18.1875 18.9765C17.9558 19.1922 17.6103 19.083 17.4665 19.0015C16.9374 18.7892 15.5029 18.1511 14.3595 17.0426C12.9453 15.6718 12.8623 15.2001 12.5959 14.7803C12.3828 14.4444 12.5392 14.2384 12.6172 14.1483C12.9219 13.7968 13.3426 13.254 13.5313 12.9843C13.7199 12.7145 13.5702 12.305 13.4803 12.05C13.0938 10.953 12.7663 10.0347 12.5 9.49989Z"
          fill="currentColor"
        />
      </svg>
    </motion.button>
  );
}
