import React, { useState, useEffect, useCallback, useLayoutEffect, useRef } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import type {
  AuthUser,
  LoginRequest,
  RegisterRequest,
  VerifyOtpRequest,
} from '../types/api';
import { DESIGN_TOKENS } from '../styles/tokens';
import { ToastProvider } from '../components/ui/Toast/ToastProvider';
import { LoadingContext } from '../hooks/useLoading';
import LoadingScreen from '../components/shared/LoadingScreen';
import { apiClient, API_ENDPOINTS } from '../lib/api';
import { apiCache } from '../lib/api/cache';
import { ensureNamespaceLoaded, getRouteNamespaces } from '../lib/i18n';
import { AuthService } from '../services/auth.service';
import {
  type StorefrontSettings,
  ThemeContext,
  LanguageContext,
  FontContext,
  BrandingContext,
  AuthContext,
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

  // 6. Auth State (Auth loading only true if token exists)
  const [user, setUser] = useState<AuthUser | null>(AuthService.getStoredUser());
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(() => AuthService.isAuthenticated());

  // Fail-safe maximum initialization timeout (5 seconds max safety fallback)
  useEffect(() => {
    if (!isSettingsLoading && !isAuthLoading) {
      return;
    }
    const safetyTimer = setTimeout(() => {
      initControllerRef.current.abort();
      setIsInitTimeout(true);
    }, 5000);
    return () => clearTimeout(safetyTimer);
  }, [isSettingsLoading, isAuthLoading]);

  const isLoading = (isSettingsLoading || isAuthLoading) && !isInitTimeout || isManualLoading;

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

  // 5. Branding State
  const [brandName, setBrandName] = useState<string>(
    settings?.brandName || localStorage.getItem('brandName') || 'My App'
  );
  const [primaryColor, setPrimaryColor] = useState<string>(() => {
    if (settings) {
      const themeColors = settings.colors?.[theme] || settings.colors?.light;
      if (themeColors?.primary) return themeColors.primary;
    }
    return localStorage.getItem('primaryColor') || '#3525cd';
  });
  const [secondaryColor, setSecondaryColor] = useState<string>(() => {
    if (settings) {
      const themeColors = settings.colors?.[theme] || settings.colors?.light;
      if (themeColors?.secondary) return themeColors.secondary;
    }
    return localStorage.getItem('secondaryColor') || '#855300';
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
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';
    const activeNs = getRouteNamespaces(currentPath);
    return ensureNamespaceLoaded(activeNs, lang).then((res) => {
      if (res.success) {
        setLanguageState(lang);
        localStorage.setItem('language', lang);
        i18n.changeLanguage(lang);
        const d = lang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.dir = d;
        document.documentElement.lang = lang;
        return true;
      }
      if (process.env.NODE_ENV === 'development') {
        console.error('[i18n] Language switch prevented due to namespace load failure:', res.failedNamespaces, res.error);
      }
      return false;
    });
  }, [i18n]);

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

      try {
        const { data } = await apiClient.get(API_ENDPOINTS.STOREFRONT.SETTINGS, {
          signal: initControllerRef.current.signal,
        });
        if (!initControllerRef.current.signal.aborted && data && data.data) {
          const s = data.data as StorefrontSettings & { tenant_id?: string | number; id?: string | number };
          if (s.tenant_id || s.id) {
            apiCache.setActiveTenantId(String(s.tenant_id || s.id));
          }
          setSettings(s);
          localStorage.setItem('storefront_settings', JSON.stringify(s));
          localStorage.setItem('storefront_settings_timestamp', String(now));
          const currentTheme = (localStorage.getItem('theme') || 'light') as 'light' | 'dark';
          applyStateSettings(s, currentTheme);
        }
      } catch (err: unknown) {
        const errorName = err instanceof Error ? err.name : (err as { name?: string })?.name;
        if (!axios.isCancel(err) && errorName !== 'CanceledError' && errorName !== 'AbortError') {
          console.error('Failed to load storefront settings:', err);
        }
      } finally {
        setIsSettingsLoading(false);
      }
    };

    fetchStorefrontSettings();
  }, [applyStateSettings]);

  // Synchronize dark/light class on document element and apply tenant branding settings
  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    if (settings) {
      applyDOMSettings(settings, theme);
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

    if (primaryColor.toLowerCase() === '#3525cd') {
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
    
    if (secondaryColor.toLowerCase() === '#855300') {
      document.documentElement.style.setProperty('--color-secondary-container', '#fea619');
    } else if (secondaryColor.toLowerCase() === '#3525cd') {
      document.documentElement.style.setProperty('--color-secondary-container', '#4f46e5');
    } else {
      document.documentElement.style.setProperty('--color-secondary-container', secondaryColor);
    }
  }, [secondaryColor]);

  const resetBranding = () => {
    setBrandName('My App');
    setPrimaryColor('#3525cd');
    setSecondaryColor('#855300');
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
    document.title = 'My App';

    const favEl = document.getElementById('favicon') as HTMLLinkElement;
    if (favEl) {
      favEl.href = '/src/assets/logo.svg';
    }
  };

  // Validate stored token on app mount
  useEffect(() => {
    const validateAuth = async () => {
      if (!AuthService.isAuthenticated()) {
        setIsAuthLoading(false);
        return;
      }

      try {
        const currentUser = await AuthService.getMe({ signal: initControllerRef.current.signal });
        if (!initControllerRef.current.signal.aborted) {
          setUser(currentUser);
          localStorage.setItem('user', JSON.stringify(currentUser));
        }
      } catch (err: unknown) {
        const errorName = err instanceof Error ? err.name : (err as { name?: string })?.name;
        if (!axios.isCancel(err) && errorName !== 'CanceledError' && errorName !== 'AbortError') {
          console.warn('Session validation error. Preserving session in localStorage as requested.', err);
        }
      } finally {
        setIsAuthLoading(false);
      }
    };

    validateAuth();
  }, []);

  const login = useCallback(async (credentials: LoginRequest) => {
    const response = await AuthService.login(credentials);
    setUser(response.student);
  }, []);

  const register = useCallback(async (payload: RegisterRequest) => {
    return await AuthService.register(payload);
  }, []);

  const verifyOtp = useCallback(async (payload: VerifyOtpRequest) => {
    const response = await AuthService.verifyOtp(payload);
    setUser(response.student);
    return response;
  }, []);

  const logout = useCallback(async () => {
    await AuthService.logout();
    setUser(null);
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const currentUser = await AuthService.getMe();
      setUser(currentUser);
      localStorage.setItem('user', JSON.stringify(currentUser));
    } catch {
      setUser(null);
    }
  }, []);

  const isAuthenticated = !!user;

  const loadingValue = React.useMemo(() => ({ isLoading, setIsLoading: setIsManualLoading, triggerLoading }), [isLoading, triggerLoading]);
  const authValue = React.useMemo(() => ({ user, isAuthenticated, isAuthLoading, login, register, verifyOtp, logout, refreshUser }), [user, isAuthenticated, isAuthLoading, login, register, verifyOtp, logout, refreshUser]);
  const themeValue = React.useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);
  const languageValue = React.useMemo(() => ({ language: languageState, setLanguage, dir }), [languageState, setLanguage, dir]);
  const fontValue = React.useMemo(() => ({ activeFont, setFont, fontOptions: DESIGN_TOKENS.fonts }), [activeFont, setFont]);
  const brandingValue = React.useMemo(() => ({ brandName, setBrandName, primaryColor, setPrimaryColor, secondaryColor, setSecondaryColor, resetBranding, settings }), [brandName, primaryColor, secondaryColor, settings]);

  return (
    <LoadingContext.Provider value={loadingValue}>
      <AuthContext.Provider value={authValue}>
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
      </AuthContext.Provider>
    </LoadingContext.Provider>
  );
};
