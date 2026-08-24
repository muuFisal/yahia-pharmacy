import React, { Component } from 'react';
import i18n from '../../lib/i18n';

interface ChunkErrorBoundaryProps {
  children: React.ReactNode;
  resetKey?: number;
  onRetry?: () => void;
}

interface ChunkErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  reloadCooldownMessage: string | null;
}

const RELOAD_KEY = 'last_chunk_reload_timestamp';
const RELOAD_COOLDOWN_MS = 10000;

export class ChunkErrorBoundary extends Component<ChunkErrorBoundaryProps, ChunkErrorBoundaryState> {
  public state: ChunkErrorBoundaryState = {
    hasError: false,
    error: null,
    reloadCooldownMessage: null,
  };

  public static getDerivedStateFromError(error: Error): Partial<ChunkErrorBoundaryState> {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    if (process.env.NODE_ENV === 'development') {
      console.error('[ChunkErrorBoundary] Dynamic import failure caught:', error, errorInfo);
    }
  }

  public componentDidUpdate(prevProps: ChunkErrorBoundaryProps): void {
    if (this.state.hasError && prevProps.resetKey !== this.props.resetKey) {
      this.setState({ hasError: false, error: null, reloadCooldownMessage: null });
    }
  }

  private handleRetry = (): void => {
    if (this.props.onRetry) {
      this.props.onRetry();
    }
    this.setState({ hasError: false, error: null, reloadCooldownMessage: null });
  };

  private handleFullReload = (): void => {
    const lastReloadStr = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem(RELOAD_KEY) : null;
    const lastReload = lastReloadStr ? Number(lastReloadStr) : 0;
    const now = Date.now();

    if (now - lastReload < RELOAD_COOLDOWN_MS) {
      const waitSeconds = Math.ceil((RELOAD_COOLDOWN_MS - (now - lastReload)) / 1000);
      const isAr = i18n.language === 'ar';
      const msg = isAr
        ? `يرجى الإنتظار ${waitSeconds} ثوان قبل إعادة التحميل مرة أخرى.`
        : `Please wait ${waitSeconds} seconds before reloading again.`;
      this.setState({ reloadCooldownMessage: msg });
      return;
    }

    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.setItem(RELOAD_KEY, String(now));
    }
    window.location.reload();
  };

  public render(): React.ReactNode {
    if (this.state.hasError) {
      const isAr = i18n.language === 'ar';
      const title = isAr ? 'تعذر تحميل الصفحة' : 'Failed to load page';
      const description = isAr
        ? 'حدث خطأ أثناء تحميل جزء من التطبيق. يرجى محاولة إعادة الاتصال.'
        : 'An error occurred while loading a page component. Please try reconnecting.';
      const retryText = isAr ? 'إعادة محاولة التحميل' : 'Retry Loading';
      const reloadText = isAr ? 'إعادة تحميل الصفحة' : 'Reload Page';

      return (
        <div
          className="min-h-[400px] w-full flex flex-col items-center justify-center p-6 text-center"
          data-testid="chunk-error-boundary"
        >
          <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-950/50 flex items-center justify-center text-red-600 dark:text-red-400 mb-4">
            <span className="material-symbols-outlined text-2xl">cloud_off</span>
          </div>
          <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground max-w-md mb-6">
            {this.state.error?.message || description}
          </p>

          {this.state.reloadCooldownMessage && (
            <div
              className="mb-4 text-xs font-medium text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 px-4 py-2 rounded-xl"
              data-testid="reload-cooldown-alert"
            >
              {this.state.reloadCooldownMessage}
            </div>
          )}

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={this.handleRetry}
              data-testid="chunk-retry-btn"
              className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">refresh</span>
              <span>{retryText}</span>
            </button>
            <button
              type="button"
              onClick={this.handleFullReload}
              data-testid="chunk-reload-btn"
              className="px-5 py-2.5 rounded-xl bg-surface-container-high text-on-surface font-medium text-sm hover:bg-surface-container-highest transition-all flex items-center gap-2 border border-outline-variant/30"
            >
              <span className="material-symbols-outlined text-lg">sync</span>
              <span>{reloadText}</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ChunkErrorBoundary;
