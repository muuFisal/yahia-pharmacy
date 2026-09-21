import React from 'react';
import { useLanguage } from '../../../hooks/useLanguage';

export interface LanguageSwitcherProps {
  className?: string;
  showText?: boolean;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  className = '',
  showText = true,
}) => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  const isArabic = language === 'ar';
  const targetLanguageLabel = isArabic ? 'English' : 'العربية';
  const targetBadge = isArabic ? 'EN' : 'عربي';

  return (
    <button
      onClick={toggleLanguage}
      type="button"
      className={`group relative inline-flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-full 
        border border-outline-variant/30 hover:border-primary/50 
        bg-surface/80 dark:bg-slate-800/80 hover:bg-surface-container-high dark:hover:bg-slate-700/80 
        text-on-surface-variant hover:text-primary dark:hover:text-primary-container 
        transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-primary/10 active:scale-95 select-none ${className}`}
      title={isArabic ? 'Switch to English' : 'التحويل إلى اللغة العربية'}
      aria-label={`Toggle language to ${targetLanguageLabel}`}
    >
      {/* Globe Icon with subtle rotation on hover */}
      <span className="material-symbols-outlined text-[18px] sm:text-[20px] transition-transform duration-300 group-hover:rotate-12 text-primary dark:text-primary-container">
        language
      </span>

      {/* Target Language Indicator Tag */}
      {showText && (
        <span className="text-xs font-bold font-primary tracking-wide">
          {targetBadge}
        </span>
      )}

      {/* Subtle indicator dot */}
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
    </button>
  );
};

export default LanguageSwitcher;
