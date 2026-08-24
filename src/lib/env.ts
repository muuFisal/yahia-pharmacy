/**
 * Type-safe environment variable access.
 *
 * All env vars consumed by the app are centralised here so that:
 * 1. We get auto-complete & type safety everywhere.
 * 2. Missing vars are caught early in development.
 * 3. No raw `import.meta.env` scattered across the codebase.
 */

export const env = {
  /** Base URL for all API calls (e.g. http://localhost:8000/api) */
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL as string,

  /** Tenant token sent as X-Tenant-Token header with every request */
  TENANT_TOKEN: import.meta.env.VITE_TENANT_TOKEN as string,
} as const;

// ── Dev-only validation ─────────────────────────────────────────
// Fail fast if required env vars are missing during development.
if (import.meta.env.DEV) {
  const missing: string[] = [];

  if (!env.API_BASE_URL) missing.push('VITE_API_BASE_URL');
  if (!env.TENANT_TOKEN) missing.push('VITE_TENANT_TOKEN');

  if (missing.length > 0) {
    console.error(
      `\n❌ Missing environment variables:\n${missing.map(v => `   • ${v}`).join('\n')}\n\n` +
      `   Copy .env.example → .env and fill in the values.\n`
    );
  }
}
