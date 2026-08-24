import { useContext } from 'react';
import { FontContext, type FontContextType } from '@/app/context';

export const useFont = (): FontContextType => {
  const context = useContext(FontContext);
  if (!context) {
    throw new Error('useFont must be used within FontProvider');
  }
  return context;
};

