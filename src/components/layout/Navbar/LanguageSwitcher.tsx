import React from 'react';
import { useLanguage } from '../../../hooks/useLanguage';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-high dark:hover:bg-surface-container transition-all active:scale-90 text-on-surface-variant hover:text-on-surface font-label-md text-sm"
      title={language === 'ar' ? 'English' : 'العربية'}
      aria-label="Toggle Language"
    >
      <span className="material-symbols-outlined text-[22px]">language</span>
    </button>
  );
};
export default LanguageSwitcher;
