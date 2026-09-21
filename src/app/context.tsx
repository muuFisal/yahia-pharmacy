import { createContext } from 'react';
import { DESIGN_TOKENS } from '../styles/tokens';

export interface StorefrontSettings {
  brandName?: string;
  themeMode?: string;
  colors?: {
    light?: {
      primary?: string;
      primaryContainer?: string;
      secondary?: string;
      secondaryContainer?: string;
      background?: string;
      surface?: string;
      onBackground?: string;
      onSurface?: string;
      error?: string;
    };
    dark?: {
      primary?: string;
      primaryContainer?: string;
      secondary?: string;
      secondaryContainer?: string;
      background?: string;
      surface?: string;
      onBackground?: string;
      onSurface?: string;
      error?: string;
    };
  };
  fonts?: Array<{ id: string; label: string; family: string }>;
  fontFamily?: string;
  roundness?: string;
  logo?: string;
  favicon?: string;
  contactEmail?: string;
  contactPhone?: string;
  socialLinks?: {
    facebook?: string | null;
    youtube?: string | null;
    instagram?: string | null;
    tiktok?: string | null;
    xUrl?: string | null;
    linkedin?: string | null;
    whatsapp?: string | null;
  };
  metaKeywords?: string;
  metaDescription?: string;
  announcementText?: string;
}

// --- Theme Context ---
export interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// --- Language Context ---
export interface LanguageContextType {
  language: 'ar' | 'en';
  setLanguage: (lang: 'ar' | 'en') => Promise<boolean> | void;
  dir: 'rtl' | 'ltr';
}
export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// --- Font Context ---
export interface FontContextType {
  activeFont: string;
  setFont: (fontId: string) => void;
  fontOptions: typeof DESIGN_TOKENS.fonts;
}
export const FontContext = createContext<FontContextType | undefined>(undefined);

// --- Branding Context ---
export interface BrandingContextType {
  brandName: string;
  setBrandName: (name: string) => void;
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
  secondaryColor: string;
  setSecondaryColor: (color: string) => void;
  resetBranding: () => void;
  settings: StorefrontSettings | null;
}
export const BrandingContext = createContext<BrandingContextType | undefined>(undefined);
