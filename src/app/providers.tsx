import React, { useState, useEffect, useCallback, useLayoutEffect, useRef } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { DESIGN_TOKENS } from '../styles/tokens';
import { ToastProvider } from '../components/ui/Toast/ToastProvider';
import { LoadingContext } from '../hooks/useLoading';
import LoadingScreen from '../components/shared/LoadingScreen';
import { apiClient, API_ENDPOINTS } from '../lib/api';
import { env } from '../lib/env';
import {
  type StorefrontSettings,
  ThemeContext,
  LanguageContext,
  FontContext,
  BrandingContext,
} from './context';

// --- Providers Wrapper ---
export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ToastProvider>
      <AppProvidersInner>{children}</AppProvidersInner>
    </ToastProvider>
  );
};

const AppProvidersInner: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { i18n } = useTranslation();

  // 0. Loading & Essential Init State
  const [isManualLoading, setIsManualLoading] = useState(false);
  const [isSettingsLoading, setIsSettingsLoading] = useState(true);
  const [isInitTimeout, setIsInitTimeout] = useState(false);
  const initControllerRef = useRef<AbortController>(new AbortController());

  // Fail-safe maximum initialization timeout (5 seconds max safety fallback)
  useEffect(() => {
    if (!isSettingsLoading) {
      return;
    }
    const safetyTimer = setTimeout(() => {
      initControllerRef.current.abort();
      setIsInitTimeout(true);
    }, 5000);
    return () => clearTimeout(safetyTimer);
  }, [isSettingsLoading]);

  const isLoading = (isSettingsLoading && !isInitTimeout) || isManualLoading;

  const triggerLoading = useCallback((duration = 600) => {
    setIsManualLoading(true);
    setTimeout(() => {
      setIsManualLoading(false);
    }, duration);
  }, []);

  // 1. Theme State
  const [theme, setTheme] = useState<'light' | 'dark'>(
    (localStorage.getItem('theme') as 'light' | 'dark') || 'light'
  );

  // Storefront Settings State
  const [settings, setSettings] = useState<StorefrontSettings | null>(() => {
    const saved = localStorage.getItem('storefront_settings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.warn('Failed to parse cached storefront settings:', e);
      }
    }
    return null;
  });

  // 2. Language State
  const [languageState, setLanguageState] = useState<'ar' | 'en'>(
    (localStorage.getItem('language') as 'ar' | 'en') || 'ar'
  );

  // 3. Font State
  const [activeFont, setActiveFont] = useState<string>(() => {
    const saved = localStorage.getItem('storefront_settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as StorefrontSettings;
        if (parsed.fontFamily) return parsed.fontFamily;
      } catch {
        // Ignore JSON parsing errors and let it fall back to default font
      }
    }
    return localStorage.getItem('activeFont') || 'cairo';
  });

  const dir: 'rtl' | 'ltr' = languageState === 'ar' ? 'rtl' : 'ltr';

  // 5. Branding State (Default to Yahia Pharmacy tokens)
  const [brandName, setBrandName] = useState<string>(() => {
    const saved = localStorage.getItem('brandName');
    if (saved && saved !== 'My App') return saved;
    return settings?.brandName || 'صيدلية يحيى';
  });

  const [primaryColor, setPrimaryColor] = useState<string>(() => {
    if (settings) {
      const themeColors = settings.colors?.[theme] || settings.colors?.light;
      if (themeColors?.primary) return themeColors.primary;
    }
    const saved = localStorage.getItem('primaryColor');
    if (saved && saved !== '#3525cd' && saved !== '#4f46e5') return saved;
    return DESIGN_TOKENS.colors[theme].primary;
  });

  const [secondaryColor, setSecondaryColor] = useState<string>(() => {
    if (settings) {
      const themeColors = settings.colors?.[theme] || settings.colors?.light;
      if (themeColors?.secondary) return themeColors.secondary;
    }
    const saved = localStorage.getItem('secondaryColor');
    if (saved && saved !== '#855300' && saved !== '#fea619') return saved;
    return DESIGN_TOKENS.colors[theme].secondary;
  });

  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const nextTheme = prev === 'light' ? 'dark' : 'light';
      if (settings) {
        const themeColors = settings.colors?.[nextTheme] || settings.colors?.light;
        if (themeColors) {
          if (themeColors.primary) setPrimaryColor(themeColors.primary);
          if (themeColors.secondary) setSecondaryColor(themeColors.secondary);
        }
      }
      return nextTheme;
    });
  }, [settings]);

  const setLanguage = useCallback((lang: 'ar' | 'en') => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    i18n.changeLanguage(lang);
    const d = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.dir = d;
    document.documentElement.lang = lang;
    if (!settings?.brandName) {
      setBrandName(lang === 'en' ? 'Yahia Pharmacy' : 'صيدلية يحيى');
      document.title = lang === 'en' ? 'Yahia Pharmacy | Dr. Youssif Yahia' : 'صيدلية يحيى | د/ يوسف يحيى';
    }
    return Promise.resolve(true);
  }, [i18n, settings]);

  useEffect(() => {
    localStorage.setItem('activeFont', activeFont);
    const fontConfig = DESIGN_TOKENS.fonts.find(f => f.id === activeFont);
    if (fontConfig) {
      document.documentElement.style.setProperty('--font-primary-family', fontConfig.family);
      if (activeFont === 'inter' || activeFont === 'poppins') {
        document.documentElement.style.setProperty('--font-secondary-family', fontConfig.family);
      } else {
        document.documentElement.style.setProperty('--font-secondary-family', '"Inter", sans-serif');
      }
    }
  }, [activeFont]);

  const setFont = useCallback((fontId: string) => {
    setActiveFont(fontId);
  }, []);

  const applyStateSettings = useCallback((s: StorefrontSettings, currentTheme: 'light' | 'dark') => {
    if (s.brandName) {
      setBrandName(s.brandName);
    }
    if (s.fontFamily) {
      setActiveFont(s.fontFamily);
    }
    const themeColors = s.colors?.[currentTheme] || s.colors?.light;
    if (themeColors) {
      if (themeColors.primary) setPrimaryColor(themeColors.primary);
      if (themeColors.secondary) setSecondaryColor(themeColors.secondary);
    }
  }, [setActiveFont]);

  const applyDOMSettings = useCallback((s: StorefrontSettings, currentTheme: 'light' | 'dark') => {
    if (s.brandName) {
      document.title = s.brandName;
    }

    if (s.metaDescription) {
      let descEl = document.querySelector('meta[name="description"]') as HTMLMetaElement;
      if (!descEl) {
        descEl = document.createElement('meta');
        descEl.name = 'description';
        document.head.appendChild(descEl);
      }
      descEl.content = s.metaDescription;
    }

    if (s.metaKeywords) {
      let keyEl = document.querySelector('meta[name="keywords"]') as HTMLMetaElement;
      if (!keyEl) {
        keyEl = document.createElement('meta');
        keyEl.name = 'keywords';
        document.head.appendChild(keyEl);
      }
      keyEl.content = s.metaKeywords;
    }
    
    const themeColors = s.colors?.[currentTheme] || s.colors?.light;
    if (themeColors) {
      const keys: Array<'primary' | 'secondary' | 'primaryContainer' | 'secondaryContainer' | 'background' | 'surface' | 'onBackground' | 'onSurface' | 'error'> = [
        'primary',
        'secondary',
        'primaryContainer',
        'secondaryContainer',
        'background',
        'surface',
        'onBackground',
        'onSurface',
        'error',
      ];
      keys.forEach((key) => {
        const val = themeColors[key];
        if (val) {
          const cssVarName = `--color-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
          document.documentElement.style.setProperty(cssVarName, val);
          if (key === 'primary' && val.startsWith('#')) {
            const r = parseInt(val.slice(1, 3), 16);
            const g = parseInt(val.slice(3, 5), 16);
            const b = parseInt(val.slice(5, 7), 16);
            document.documentElement.style.setProperty('--primary-rgb', `${r}, ${g}, ${b}`);
          }
        }
      });
    }

    if (s.roundness) {
      const value = parseInt(s.roundness);
      const unit = s.roundness.replace(String(value), '') || 'px';
      if (!isNaN(value)) {
        document.documentElement.style.setProperty('--radius-default', `${value / 2}${unit}`);
        document.documentElement.style.setProperty('--radius-lg', `${value}${unit}`);
        document.documentElement.style.setProperty('--radius-xl', `${value * 1.5}${unit}`);
        document.documentElement.style.setProperty('--radius-2xl', `${value * 3}${unit}`);
      }
    }
    
    if (s.favicon) {
      let favEl = document.getElementById('favicon') as HTMLLinkElement;
      if (!favEl) {
        favEl = document.createElement('link');
        favEl.id = 'favicon';
        favEl.rel = 'icon';
        document.head.appendChild(favEl);
      }
      favEl.href = s.favicon;
    }
  }, []);

  // Fetch storefront settings on mount (with caching)
  useEffect(() => {
    const fetchStorefrontSettings = async () => {
      const cached = localStorage.getItem('storefront_settings');
      const cachedTime = localStorage.getItem('storefront_settings_timestamp');
      const now = Date.now();
      const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours cache TTL

      const isReload =
        performance.navigation?.type === 1 ||
        (performance.getEntriesByType?.('navigation')?.[0] as PerformanceNavigationTiming)?.type === 'reload';

      if (cached && cachedTime && !isReload && (now - Number(cachedTime) < CACHE_TTL)) {
        setIsSettingsLoading(false);
        return;
      }

      if (!env.API_BASE_URL) {
        setIsSettingsLoading(false);
        return;
      }

      try {
        const { data } = await apiClient.get(API_ENDPOINTS.STOREFRONT.SETTINGS, {
          signal: initControllerRef.current.signal,
        });
        if (!initControllerRef.current.signal.aborted && data && data.data) {
          const s = data.data as StorefrontSettings;
          setSettings(s);
          localStorage.setItem('storefront_settings', JSON.stringify(s));
          localStorage.setItem('storefront_settings_timestamp', String(now));
          const currentTheme = (localStorage.getItem('theme') || 'light') as 'light' | 'dark';
          applyStateSettings(s, currentTheme);
        }
      } catch (err: unknown) {
        // Gracefully handle local dev / mock mode when backend is offline
        const errorStatus = (err as { response?: { status?: number } })?.response?.status;
        if (errorStatus !== 404 && !axios.isCancel(err)) {
          console.warn('Using local pharmacy storefront defaults.');
        }
      } finally {
        setIsSettingsLoading(false);
      }
    };

    fetchStorefrontSettings();
  }, [applyStateSettings]);

  // Synchronize dark/light class on document element and apply storefront branding settings
  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    if (settings) {
      applyDOMSettings(settings, theme);
    } else {
      // Inject pharmacy design tokens directly
      const currentTokens = DESIGN_TOKENS.colors[theme];
      Object.entries(currentTokens).forEach(([key, val]) => {
        const cssVarName = `--color-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
        document.documentElement.style.setProperty(cssVarName, val);
      });
      if (currentTokens.primary?.startsWith('#')) {
        const r = parseInt(currentTokens.primary.slice(1, 3), 16);
        const g = parseInt(currentTokens.primary.slice(3, 5), 16);
        const b = parseInt(currentTokens.primary.slice(5, 7), 16);
        document.documentElement.style.setProperty('--primary-rgb', `${r}, ${g}, ${b}`);
      }
    }
  }, [theme, settings, applyDOMSettings]);

  useEffect(() => {
    localStorage.setItem('brandName', brandName);
  }, [brandName]);

  useLayoutEffect(() => {
    localStorage.setItem('primaryColor', primaryColor);
    document.documentElement.style.setProperty('--color-primary', primaryColor);
    
    if (primaryColor.startsWith('#')) {
      const r = parseInt(primaryColor.slice(1, 3), 16);
      const g = parseInt(primaryColor.slice(3, 5), 16);
      const b = parseInt(primaryColor.slice(5, 7), 16);
      document.documentElement.style.setProperty('--primary-rgb', `${r}, ${g}, ${b}`);
    }

    if (primaryColor.toLowerCase() === '#00897b') {
      document.documentElement.style.setProperty('--color-primary-container', '#059669');
    } else if (primaryColor.toLowerCase() === '#3525cd') {
      document.documentElement.style.setProperty('--color-primary-container', '#4f46e5');
    } else if (primaryColor.toLowerCase() === '#fea619') {
      document.documentElement.style.setProperty('--color-primary-container', '#d97706');
    } else {
      document.documentElement.style.setProperty('--color-primary-container', primaryColor);
    }
  }, [primaryColor]);

  useLayoutEffect(() => {
    localStorage.setItem('secondaryColor', secondaryColor);
    document.documentElement.style.setProperty('--color-secondary', secondaryColor);
    
    if (secondaryColor.toLowerCase() === '#0284c7') {
      document.documentElement.style.setProperty('--color-secondary-container', '#0ea5e9');
    } else if (secondaryColor.toLowerCase() === '#855300') {
      document.documentElement.style.setProperty('--color-secondary-container', '#fea619');
    } else if (secondaryColor.toLowerCase() === '#3525cd') {
      document.documentElement.style.setProperty('--color-secondary-container', '#4f46e5');
    } else {
      document.documentElement.style.setProperty('--color-secondary-container', secondaryColor);
    }
  }, [secondaryColor]);

  const resetBranding = () => {
    setBrandName('صيدلية يحيى');
    setPrimaryColor(DESIGN_TOKENS.colors.light.primary);
    setSecondaryColor(DESIGN_TOKENS.colors.light.secondary);
    setSettings(null);
    localStorage.removeItem('brandName');
    localStorage.removeItem('primaryColor');
    localStorage.removeItem('secondaryColor');
    localStorage.removeItem('storefront_settings');
    localStorage.removeItem('storefront_settings_timestamp');
    document.documentElement.style.removeProperty('--color-primary');
    document.documentElement.style.removeProperty('--primary-rgb');
    document.documentElement.style.removeProperty('--color-primary-container');
    document.documentElement.style.removeProperty('--color-secondary');
    document.documentElement.style.removeProperty('--color-secondary-container');
    document.documentElement.style.removeProperty('--color-background');
    document.documentElement.style.removeProperty('--color-surface');
    document.documentElement.style.removeProperty('--color-on-background');
    document.documentElement.style.removeProperty('--color-on-surface');
    document.documentElement.style.removeProperty('--color-error');
    document.documentElement.style.removeProperty('--radius-default');
    document.documentElement.style.removeProperty('--radius-lg');
    document.documentElement.style.removeProperty('--radius-xl');
    document.documentElement.style.removeProperty('--radius-2xl');
    document.title = 'صيدلية يحيى';

    const favEl = document.getElementById('favicon') as HTMLLinkElement;
    if (favEl) {
      favEl.href = '/favicon.png';
    }
  };

  const loadingValue = React.useMemo(() => ({ isLoading, setIsLoading: setIsManualLoading, triggerLoading }), [isLoading, triggerLoading]);
  const themeValue = React.useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);
  const languageValue = React.useMemo(() => ({ language: languageState, setLanguage, dir }), [languageState, setLanguage, dir]);
  const fontValue = React.useMemo(() => ({ activeFont, setFont, fontOptions: DESIGN_TOKENS.fonts }), [activeFont, setFont]);
  const brandingValue = React.useMemo(() => ({ brandName, setBrandName, primaryColor, setPrimaryColor, secondaryColor, setSecondaryColor, resetBranding, settings }), [brandName, primaryColor, secondaryColor, settings]);

  return (
    <LoadingContext.Provider value={loadingValue}>
      <ThemeContext.Provider value={themeValue}>
        <LanguageContext.Provider value={languageValue}>
          <FontContext.Provider value={fontValue}>
            <BrandingContext.Provider value={brandingValue}>
              <>
                {children}
                {isLoading && <LoadingScreen />}
              </>
            </BrandingContext.Provider>
          </FontContext.Provider>
        </LanguageContext.Provider>
      </ThemeContext.Provider>
    </LoadingContext.Provider>
  );
};
