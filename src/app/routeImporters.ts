/**
 * Lazy route importers — centralised dynamic import() calls.
 *
 * Each function returns a promise that resolves to a module with a default export.
 * Used by `lazyRoute()` / `standaloneLazyRoute()` helpers for code-splitting.
 */

export type RouteImporter = () => Promise<{ default: React.ComponentType<Record<string, unknown>> }>;

// ── Website Pages ──────────────────────────────────────────────
export const importHomePage = () => import('../features/website/home/pages/HomePage');
export const importAboutPage = () => import('../features/website/static/pages/AboutPage');
export const importContactPage = () => import('../features/website/static/pages/ContactPage');
export const importLoginPage = () => import('../features/website/auth/Login');
export const importRegisterPage = () => import('../features/website/auth/Register');
export const importNotFoundPage = () => import('../pages/NotFoundPage');

// ── Dashboard Pages ────────────────────────────────────────────
export const importDashboardLayout = () => import('../features/dashboard/layout/DashboardLayout');
export const importAdminLoginPage = () => import('../features/dashboard/pages/auth/AdminLogin');
export const importDashboardOverview = () => import('../features/dashboard/pages/DashboardOverview/DashboardOverview');
export const importForbiddenPage = () => import('../features/dashboard/pages/ForbiddenPage/ForbiddenPage');
