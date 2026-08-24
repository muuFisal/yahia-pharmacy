import { useContext } from 'react';
import { LanguageContext, type LanguageContextType } from '@/app/context';

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

