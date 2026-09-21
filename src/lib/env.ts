/**
 * Type-safe environment variable access.
 *
 * All env vars consumed by the app are centralised here so that:
 * 1. We get auto-complete & type safety everywhere.
 * 2. Missing vars are handled gracefully.
 * 3. No raw `import.meta.env` scattered across the codebase.
 */

export const env = {
  /** Base URL for all API calls */
  API_BASE_URL: (import.meta.env.VITE_API_BASE_URL as string) || '',
} as const;

export default env;
