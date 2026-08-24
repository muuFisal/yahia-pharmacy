import React, { Suspense } from 'react';

/**
 * Higher-Order Component / helper to wrap lazy-loaded components with a Suspense loading indicator.
 */
export const withSuspense = (Component: React.ComponentType) => (
  <Suspense
    fallback={
      <div className="h-screen w-screen flex items-center justify-center bg-background">
        <div className="w-10 h-10 border-[3px] border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    }
  >
    <Component />
  </Suspense>
);
