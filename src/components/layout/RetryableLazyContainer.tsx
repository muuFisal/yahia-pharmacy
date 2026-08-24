import React, { useState, useCallback, Suspense } from 'react';
import type { RouteImporter } from '../../app/routeImporters';
import ChunkErrorBoundary from './ChunkErrorBoundary';

interface RetryableLazyContainerProps {
  importer: RouteImporter;
  componentProps?: Record<string, unknown>;
  fallback?: React.ReactNode;
}

interface CachedGeneration {
  resetKey: number;
  component: React.ComponentType<Record<string, unknown>>;
}

const lazyComponentCache = new WeakMap<RouteImporter, CachedGeneration>();

function getLazyComponent(importer: RouteImporter, resetKey: number): React.ComponentType<Record<string, unknown>> {
  const cached = lazyComponentCache.get(importer);
  if (cached && cached.resetKey === resetKey) {
    return cached.component;
  }
  const component = React.lazy(importer);
  lazyComponentCache.set(importer, { resetKey, component });
  return component;
}

export const RouteSpinner: React.FC = () => (
  <div className="min-h-[400px] w-full flex items-center justify-center bg-transparent" data-testid="route-lazy-loading">
    <div className="w-10 h-10 border-[3px] border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

export const RetryableLazyContainer: React.FC<RetryableLazyContainerProps> = ({
  importer,
  componentProps,
  fallback = <RouteSpinner />,
}) => {
  const [resetKey, setResetKey] = useState(0);

  const handleRetry = useCallback(() => {
    setResetKey((prev) => prev + 1);
  }, []);

  return (
    <ChunkErrorBoundary resetKey={resetKey} onRetry={handleRetry}>
      <Suspense fallback={fallback}>
        {React.createElement(getLazyComponent(importer, resetKey), componentProps || {})}
      </Suspense>
    </ChunkErrorBoundary>
  );
};
