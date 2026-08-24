import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const ScrollToTop: React.FC = () => {
  const { i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  const isRtl = i18n.language === 'ar';

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      
      if (scrollTop > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = (e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } catch {
      window.scrollTo(0, 0);
    }

    try {
      document.documentElement.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } catch {
      document.documentElement.scrollTop = 0;
    }

    try {
      document.body.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } catch {
      document.body.scrollTop = 0;
    }
  };

  return (
    <button
      onClick={handleScrollToTop}
      onTouchEnd={handleScrollToTop}
      className={`fixed bottom-6 ${
        isRtl ? 'left-6' : 'right-6'
      } z-50 w-12 h-12 rounded-full bg-gradient-to-b from-primary to-primary-container text-white dark:from-slate-900/90 dark:to-slate-950/90 dark:text-primary dark:backdrop-blur-md shadow-lg shadow-primary/10 flex items-center justify-center transition-all duration-300 md:hover:scale-110 md:hover:-translate-y-1 active:scale-95 border border-slate-200/20 dark:border-primary/25 cursor-pointer ${
        isVisible
          ? 'opacity-100 scale-100 pointer-events-auto'
          : 'opacity-0 scale-50 pointer-events-none'
      }`}
      aria-label="Scroll to top"
    >
      <span className="material-symbols-outlined text-[26px]" style={{ fontVariationSettings: "'wght' 700" }}>
        arrow_upward
      </span>
    </button>
  );
};

export default ScrollToTop;
