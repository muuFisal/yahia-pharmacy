import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useRouteNamespaces } from '../../lib/i18n';

interface RouteTranslationBoundaryProps {
  children: React.ReactNode;
}

export const RouteTranslationBoundary: React.FC<RouteTranslationBoundaryProps> = ({ children }) => {
  const { pathname } = useLocation();
  const { ready, error, retry, isRetrying } = useRouteNamespaces(pathname);
  const { t } = useTranslation();

  if (error) {
    return (
      <div className="min-h-[400px] w-full flex flex-col items-center justify-center p-6 text-center" data-testid="route-translation-error">
        <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-950/50 flex items-center justify-center text-red-600 dark:text-red-400 mb-4">
          <span className="material-symbols-outlined text-2xl">warning</span>
        </div>
        <h3 className="text-lg font-bold text-foreground mb-2">
          {t('common:errorOccurred', 'حدث خطأ أثناء تحميل المحتوى')}
        </h3>
        <p className="text-sm text-muted-foreground max-w-md mb-6">
          {error.message || t('common:tryAgainLater', 'يرجى المحاولة مرة أخرى')}
        </p>
        <button
          type="button"
          onClick={() => retry()}
          disabled={isRetrying}
          data-testid="route-translation-retry-btn"
          className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 disabled:opacity-50 transition-all flex items-center gap-2"
        >
          {isRetrying ? (
            <>
              <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              <span>{t('common:retrying', 'جاري الإعادة...')}</span>
            </>
          ) : (
            <span>{t('common:retry', 'إعادة المحاولة')}</span>
          )}
        </button>
      </div>
    );
  }

  if (!ready) {
    return (
      <div className="min-h-[400px] w-full flex flex-col items-center justify-center p-6" data-testid="route-translation-loading">
        <div className="w-10 h-10 border-[3px] border-primary border-t-transparent rounded-full animate-spin mb-3"></div>
        <span className="text-sm text-muted-foreground font-medium">
          {t('common:loading', 'جاري التحميل...')}
        </span>
      </div>
    );
  }

  return <>{children}</>;
};

export default RouteTranslationBoundary;
