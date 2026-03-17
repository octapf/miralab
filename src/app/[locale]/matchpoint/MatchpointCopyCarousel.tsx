'use client';

import { useEffect, useState } from 'react';
import styles from './matchpoint.module.scss';

type Slide = {
  title: string;
  body: string;
};

type MatchpointCopyCarouselProps = {
  slides: Slide[];
};

export default function MatchpointCopyCarousel({ slides }: MatchpointCopyCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 4200);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className={styles.copyCarousel} aria-live="polite">
      <h2 className={styles.copyCarouselTitle}>{slides[activeIndex]?.title}</h2>
      <p className={styles.copyCarouselBody}>{slides[activeIndex]?.body}</p>
      <div className={styles.copyCarouselDots}>
        {slides.map((slide, index) => (
          <button
            key={`${slide.title}-${index}`}
            className={`${styles.copyCarouselDot} ${index === activeIndex ? styles.activeDot : ''}`}
            onClick={() => setActiveIndex(index)}
            aria-label={slide.title}
          />
        ))}
      </div>
    </div>
  );
}
