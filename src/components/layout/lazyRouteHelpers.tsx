import React from 'react';
import type { RouteImporter } from '../../app/routeImporters';
import { RetryableLazyContainer } from './RetryableLazyContainer';
import RouteTranslationBoundary from './RouteTranslationBoundary';

export const lazyRoute = (importer: RouteImporter, fallback?: React.ReactNode) => (
  <RetryableLazyContainer importer={importer} fallback={fallback} />
);

export const standaloneLazyRoute = (importer: RouteImporter, fallback?: React.ReactNode) => (
  <RouteTranslationBoundary>
    <RetryableLazyContainer importer={importer} fallback={fallback} />
  </RouteTranslationBoundary>
);
