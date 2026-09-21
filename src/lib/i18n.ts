import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Static pre-bundled translations for instant zero-latency language switching
import commonAr from '../locales/ar/common.json';
import commonEn from '../locales/en/common.json';
import homeAr from '../locales/ar/home.json';
import homeEn from '../locales/en/home.json';
import productsAr from '../locales/ar/products.json';
import productsEn from '../locales/en/products.json';
import staticAr from '../locales/ar/static.json';
import staticEn from '../locales/en/static.json';
import authAr from '../locales/ar/auth.json';
import authEn from '../locales/en/auth.json';
import profileAr from '../locales/ar/profile.json';
import profileEn from '../locales/en/profile.json';
import dashboardAr from '../locales/ar/dashboard.json';
import dashboardEn from '../locales/en/dashboard.json';

const resources = {
  ar: {
    common: commonAr,
    home: homeAr,
    products: productsAr,
    static: staticAr,
    auth: authAr,
    profile: profileAr,
    dashboard: dashboardAr,
  },
  en: {
    common: commonEn,
    home: homeEn,
    products: productsEn,
    static: staticEn,
    auth: authEn,
    profile: profileEn,
    dashboard: dashboardEn,
  },
};

const savedLang = (typeof localStorage !== 'undefined' && localStorage.getItem('language')) || 'ar';

export const viteBackend = {
  type: 'backend' as const,
  init() {},
  read(language: string, namespace: string, callback: (err: Error | null, data?: Record<string, unknown> | false) => void) {
    const langData = resources[language as 'ar' | 'en']?.[namespace as keyof typeof resources['ar']];
    if (langData) {
      callback(null, langData as Record<string, unknown>);
    } else {
      callback(null, {});
    }
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLang,
    fallbackLng: 'ar',
    defaultNS: 'common',
    ns: ['common', 'home', 'products', 'auth', 'profile', 'static', 'dashboard'],
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

// Apply document direction and language code immediately
export const updateDocumentDirection = (lng: string) => {
  if (typeof document !== 'undefined') {
    const dir = lng === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = lng;
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('language', lng);
    }
  }
};

updateDocumentDirection(savedLang);

// Listen to all language switch events globally
i18n.on('languageChanged', (lng) => {
  updateDocumentDirection(lng);
});

export interface NamespaceLoadResult {
  success: boolean;
  failedNamespaces: string[];
  error?: Error;
}

export function normalizeRoutePath(pathname: string, basename = ''): string {
  let clean = pathname.split('?')[0].split('#')[0];
  if (basename && clean.startsWith(basename)) {
    clean = clean.slice(basename.length);
  }
  if (clean.length > 1 && clean.endsWith('/')) {
    clean = clean.slice(0, -1);
  }
  return clean.toLowerCase() || '/';
}

export function getRouteNamespaces(pathname: string, basename = ''): string[] {
  const p = normalizeRoutePath(pathname, basename);
  if (p.startsWith('/dashboard') || p.startsWith('/admin')) {
    return ['common', 'dashboard'];
  }
  if (
    p.startsWith('/profile') ||
    p.startsWith('/orders') ||
    p.startsWith('/my-codes') ||
    p.startsWith('/purchased-codes') ||
    p.startsWith('/addresses') ||
    p.startsWith('/support')
  ) {
    return ['common', 'profile'];
  }
  if (
    p.startsWith('/products') ||
    p.startsWith('/cart') ||
    p.startsWith('/checkout') ||
    p.startsWith('/payment') ||
    p.startsWith('/order-success') ||
    p.startsWith('/order-failed')
  ) {
    return ['common', 'products'];
  }
  if (p.startsWith('/auth') || p.startsWith('/forgot-password')) {
    return ['common', 'auth'];
  }
  if (
    p.startsWith('/faq') ||
    p.startsWith('/terms') ||
    p.startsWith('/privacy') ||
    p.startsWith('/about') ||
    p.startsWith('/contact') ||
    p.startsWith('/refund') ||
    p.startsWith('/refund-policy')
  ) {
    return ['common', 'static'];
  }
  if (p === '/' || p.startsWith('/teachers')) {
    return ['common', 'home'];
  }
  return ['common'];
}

export async function ensureNamespaceLoaded(
  _ns: string | string[],
  _lng?: string
): Promise<NamespaceLoadResult> {
  // Pre-bundled: instant guaranteed success
  return { success: true, failedNamespaces: [] };
}

export function useRouteNamespaces(_pathname: string, _language?: string) {
  // Since all namespaces are synchronously available, routes are always ready
  return {
    ready: true,
    error: null as Error | null,
    retry: () => Promise.resolve({ success: true, failedNamespaces: [] as string[] }),
    isRetrying: false,
  };
}

export default i18n;
