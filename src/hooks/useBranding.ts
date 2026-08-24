import { useContext } from 'react';
import { BrandingContext, type BrandingContextType } from '@/app/context';

export const useBranding = (): BrandingContextType => {
  const context = useContext(BrandingContext);
  if (!context) {
    throw new Error('useBranding must be used within BrandingProvider');
  }
  return context;
};

export default useBranding;

