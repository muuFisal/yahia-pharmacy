import { useState, useEffect, useCallback } from 'react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import commonAr from '../locales/ar/common.json';
import commonEn from '../locales/en/common.json';

const localeModules = import.meta.glob<{ default: Record<string, unknown> }>([
  '../locales/*/*.json',
  '!../locales/*/common.json',
]);

export const viteBackend = {
  type: 'backend' as const,
  init() {},
  read(language: string, namespace: string, callback: (err: Error | null, data?: Record<string, unknown> | false) => void) {
    if (namespace === 'common') {
      const data = language === 'en' ? commonEn : commonAr;
      callback(null, data);
      return;
    }
    const pathKey = `../locales/${language}/${namespace}.json`;
    const importFn = localeModules[pathKey];
    if (!importFn) {
      if (process.env.NODE_ENV === 'development') {
        console.error(`[i18n] Translation file not found: ${language}/${namespace}`);
      }
      callback(new Error(`Locale chunk not found: ${language}/${namespace}`), false);
      return;
    }
    importFn()
      .then((mod) => callback(null, mod.default))
      .catch((err) => {
        if (process.env.NODE_ENV === 'development') {
          console.error(`[i18n] Failed to load translation namespace '${namespace}' for '${language}':`, err);
        }
        callback(err as Error, false);
      });
  },
};

const savedLang = (typeof localStorage !== 'undefined' && localStorage.getItem('language')) || 'ar';

i18n
  .use(viteBackend)
  .use(initReactI18next)
  .init({
    resources: {
      ar: { common: commonAr },
      en: { common: commonEn },
    },
    lng: savedLang,
    fallbackLng: 'ar',
    defaultNS: 'common',
    ns: ['common', 'home', 'products', 'auth', 'profile', 'static', 'dashboard'],
    partialBundledLanguages: true,
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false,
    },
  });

const dir = savedLang === 'ar' ? 'rtl' : 'ltr';
if (typeof document !== 'undefined') {
  document.documentElement.dir = dir;
  document.documentElement.lang = savedLang;
}

const pendingNamespaceLoads = new Map<string, Promise<void>>();

export interface NamespaceLoadResult {
  success: boolean;
  failedNamespaces: string[];
  error?: Error;
}

/**
 * Normalizes route path by removing query string, hash, trailing slashes,
 * and optional basename prefix.
 */
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

/**
 * Maps normalized route path to required translation namespaces.
 */
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
  if (
    p.startsWith('/auth') ||
    p.startsWith('/login') ||
    p.startsWith('/register') ||
    p.startsWith('/forgot-password') ||
    p.startsWith('/verify-otp') ||
    p.startsWith('/otp-verification')
  ) {
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

/**
 * Ensures required translation namespaces are loaded for specified language.
 * Communicates explicit success / failure without committing invalid state.
 */
export async function ensureNamespaceLoaded(
  ns: string | string[],
  lng?: string
): Promise<NamespaceLoadResult> {
  const targetLang = lng || i18n.language || 'ar';
  const namespaces = Array.isArray(ns) ? ns : [ns];
  const missing = namespaces.filter((n) => !i18n.hasResourceBundle(targetLang, n));

  if (missing.length === 0) {
    return { success: true, failedNamespaces: [] };
  }

  const failedNamespaces: string[] = [];
  let lastError: Error | undefined;

  const promises = missing.map((n) => {
    const key = `${targetLang}:${n}`;
    if (pendingNamespaceLoads.has(key)) {
      return pendingNamespaceLoads.get(key)!;
    }
    const loadPromise = new Promise<void>((resolve) => {
      viteBackend.read(targetLang, n, (err, data) => {
        if (!err && data) {
          i18n.addResourceBundle(targetLang, n, data, true, true);
        } else {
          failedNamespaces.push(n);
          if (err) lastError = err;
        }
        resolve();
      });
    });
    const pendingPromise = loadPromise.finally(() => {
      // Clear pending state so retries can execute
      pendingNamespaceLoads.delete(key);
    });
    pendingNamespaceLoads.set(key, pendingPromise);
    return pendingPromise;
  });

  await Promise.all(promises);

  if (failedNamespaces.length > 0) {
    return {
      success: false,
      failedNamespaces,
      error: lastError || new Error(`Failed to load namespaces: ${failedNamespaces.join(', ')}`),
    };
  }

  return { success: true, failedNamespaces: [] };
}

/**
 * Hook for route-level namespace readiness tracking.
 */
export function useRouteNamespaces(pathname: string, language?: string) {
  const targetLang = language || i18n.language || 'ar';
  const requiredNs = getRouteNamespaces(pathname);
  const namespaceKey = `${targetLang}:${requiredNs.join('|')}`;
  const isAlreadyLoaded = requiredNs.every((n) => i18n.hasResourceBundle(targetLang, n));

  const [state, setState] = useState<{
    loadedKey: string | null;
    error: Error | null;
    isRetrying: boolean;
  }>(() => ({
    loadedKey: isAlreadyLoaded ? namespaceKey : null,
    error: null,
    isRetrying: false,
  }));

  const ready = (state.loadedKey === namespaceKey || isAlreadyLoaded) && isAlreadyLoaded;

  const load = useCallback(async () => {
    const currentKey = namespaceKey;
    const reqNs = getRouteNamespaces(pathname);
    setState((prev) => ({ ...prev, isRetrying: true, error: null }));
    const res = await ensureNamespaceLoaded(reqNs, targetLang);
    if (getRouteNamespaces(pathname).join('|') === reqNs.join('|')) {
      if (res.success) {
        setState({ loadedKey: currentKey, error: null, isRetrying: false });
      } else {
        setState({
          loadedKey: null,
          error: res.error || new Error(`Failed to load namespaces: ${res.failedNamespaces.join(', ')}`),
          isRetrying: false,
        });
      }
    }
    return res;
  }, [pathname, targetLang, namespaceKey]);

  useEffect(() => {
    if (isAlreadyLoaded) return;

    let isMounted = true;
    const currentKey = namespaceKey;
    const reqNs = getRouteNamespaces(pathname);

    ensureNamespaceLoaded(reqNs, targetLang).then((res) => {
      if (!isMounted) return;
      if (res.success) {
        setState({ loadedKey: currentKey, error: null, isRetrying: false });
      } else {
        setState({
          loadedKey: null,
          error: res.error || new Error(`Failed to load namespaces: ${res.failedNamespaces.join(', ')}`),
          isRetrying: false,
        });
      }
    });

    return () => {
      isMounted = false;
    };
  }, [isAlreadyLoaded, namespaceKey, pathname, targetLang]);

  return {
    ready,
    error: state.error,
    retry: load,
    isRetrying: state.isRetrying,
  };
}

export default i18n;
