/**
 * Centralized API endpoint constants.
 *
 * Every service file imports paths from here instead of hardcoding strings.
 * This makes refactoring painless and gives us a single source of truth.
 *
 * Convention:
 *  - Static paths  → string constants
 *  - Dynamic paths → functions that accept an id/slug and return the path
 */

import { DASHBOARD_API_ENDPOINTS } from './dashboard.endpoints';

export const API_ENDPOINTS = {
  // ── Authentication (Sanctum) ─────────────────────────────────
  AUTH: {
    /** POST — Get Sanctum CSRF cookie (required before login) */
    CSRF: '/sanctum/csrf-cookie',
    /** POST — Login with email & password */
    LOGIN: '/v1/auth/login',
    /** POST — Register a new user */
    REGISTER: '/v1/auth/register',
    /** POST — Verify OTP code */
    VERIFY_OTP: '/v1/auth/verify-otp',
    /** POST — Resend verification OTP code */
    RESEND_OTP: '/v1/auth/resend-otp',
    /** POST — Logout (revoke current token) */
    LOGOUT: '/v1/auth/logout',
    /** GET  — Get the authenticated user's profile */
    ME: '/v1/auth/me',
    /** POST — Request a password reset link by phone */
    FORGOT_PASSWORD: '/v1/auth/forgot/password',
    /** POST — Verify forgot password OTP */
    FORGOT_VERIFY_OTP: '/v1/auth/forgot/verify-otp',
    /** POST — Resend forgot password OTP */
    FORGOT_RESEND_OTP: '/v1/auth/forgot/resend-otp',
    /** POST — Reset password */
    RESET_PASSWORD: '/v1/auth/forgot/reset-password',
    /** POST — Upload profile avatar */
    ME_AVATAR: '/v1/auth/me/avatar',
    /** PUT  — Change password */
    CHANGE_PASSWORD: '/v1/auth/change-password',
    /** GET  — Get profile statistics */
    STATISTICS: '/v1/auth/statistics',
  },

  // ── Locations ────────────────────────────────────────────────
  LOCATION: {
    /** GET — List active countries with their governorates */
    COUNTRIES: '/v1/countries',
    /** GET — List governorates for a country */
    GOVERNORATES: (countryId: string | number) => `/v1/countries/${countryId}/governorates`,
    /** GET — List regions/areas for a governorate */
    REGIONS: (governorateId: string | number) => `/v1/governorates/${governorateId}/regions`,
  },

  // ── Branches ─────────────────────────────────────────────────
  BRANCHES: {
    /** GET — List active branches */
    LIST: '/v1/branches',
  },

  // ── Academic Stages / Grades / Sections ──────────────────────
  ACADEMIC: {
    /** GET — List educational stages */
    STAGES: '/v1/academic/stages',
    /** GET — List grades for a stage */
    GRADES: (stageId: string | number) => `/v1/academic/stages/${stageId}/grades`,
    /** GET — List sections for a grade */
    SECTIONS: (gradeId: string | number) => `/v1/academic/grades/${gradeId}/sections`,
  },

  // ── Products ─────────────────────────────────────────────────
  PRODUCTS: {
    /** GET — List all products (supports query params for filtering) */
    LIST: '/v1/products',
    /** GET — Get a single product by slug */
    SHOW: (slug: string | number) => `/v1/products/${slug}`,
    /** GET — Get related products for a given product */
    RELATED: (slug: string | number) => `/v1/products/${slug}/related`,
    /** GET — Get reviews for a given product */
    REVIEWS: (slug: string | number) => `/v1/products/${slug}/reviews`,
  },

  // ── Categories ───────────────────────────────────────────────
  CATEGORIES: {
    /** GET — List all categories */
    LIST: '/v1/categories',
    /** GET — Get a single category by ID or slug */
    SHOW: (idOrSlug: string | number) => `/v1/categories/${idOrSlug}`,
  },

  // ── Teachers ─────────────────────────────────────────────────
  TEACHERS: {
    /** GET — List all teachers */
    LIST: '/v1/teachers',
    /** GET — Get a single teacher by slug */
    SHOW: (slug: string | number) => `/v1/teachers/${slug}`,
    /** GET — Get products of a specific teacher */
    PRODUCTS: (slug: string | number) => `/v1/teachers/${slug}/products`,
  },

  // ── Orders ───────────────────────────────────────────────────
  ORDERS: {
    /** GET  — List user's orders */
    LIST: '/v1/orders',
    /** POST — Create a new order */
    CREATE: '/v1/orders',
    /** GET  — Get a single order by ID */
    SHOW: (id: string | number) => `/v1/orders/${id}`,
    /** POST — Cancel a pending order by ID */
    /** GET  — List purchased activation codes */
    PURCHASED_CODES: '/v1/purchased-codes',
  },

  // ── Addresses ────────────────────────────────────────────────
  ADDRESSES: {
    /** GET  — List student addresses */
    LIST: '/v1/addresses',
    /** POST — Create student address */
    CREATE: '/v1/addresses',
    /** PUT  — Update student address */
    UPDATE: (id: string | number) => `/v1/addresses/${id}`,
    /** DELETE — Delete student address */
    DELETE: (id: string | number) => `/v1/addresses/${id}`,
    /** PUT  — Set address as default */
    SET_DEFAULT: (id: string | number) => `/v1/addresses/${id}/set-default`,
  },

  // ── Cart ─────────────────────────────────────────────────────
  CART: {
    /** GET  — Get current user's cart */
    LIST: '/v1/cart',
    /** POST — Add item to cart */
    ADD: '/v1/cart/items',
    /** PUT  — Update cart item quantity */
    UPDATE: (id: string | number) => `/v1/cart/items/${id}`,
    /** DELETE — Remove item from cart */
    REMOVE: (id: string | number) => `/v1/cart/items/${id}`,
    /** POST — Sync guest local storage cart */
    SYNC: '/v1/cart/sync',
  },

  // ── Checkout ─────────────────────────────────────────────────
  CHECKOUT: {
    /** POST — Place order / checkout */
    PLACE: '/v1/checkout',
    /** POST — Apply coupon to cart */
    APPLY_COUPON: '/v1/cart/coupon',
    /** DELETE — Remove coupon from cart */
    REMOVE_COUPON: '/v1/cart/coupon',
    /** GET — Get active payment methods */
    PAYMENT_METHODS: '/v1/payment-methods',
  },

  // ── User Profile ─────────────────────────────────────────────
  PROFILE: {
    /** GET  — Get user profile */
    SHOW: '/profile',
    /** PUT  — Update user profile */
    UPDATE: '/profile',
    /** POST — Update profile avatar */
    AVATAR: '/profile/avatar',
    /** PUT  — Change password */
    CHANGE_PASSWORD: '/profile/password',
  },

  // ── Dashboard Authentication ─────────────────────────────────
  DASHBOARD_AUTH: DASHBOARD_API_ENDPOINTS,

  // ── Storefront / Tenant Settings ─────────────────────────────
  STOREFRONT: {
    /** GET — Get storefront settings (branding, colors, etc.) */
    SETTINGS: '/v1/storefront/settings',
  },

  // ── CMS Content ──────────────────────────────────────────────
  CMS: {
    /** GET — Get static page details by slug */
    PAGE: (slug: string) => `/v1/pages/${slug}`,
    /** GET — Get list of FAQs */
    FAQS: '/v1/faqs',
    /** GET — Get home/hero banners */
    BANNERS: '/v1/home/banners',
    /** GET — Get home layout sections list */
    SECTIONS: '/v1/home/sections',
  },

  // ── Support Helpdesk ─────────────────────────────────────────
  SUPPORT: {
    /** POST — Create support ticket as guest */
    CREATE_GUEST: '/v1/support/tickets/guest',
    /** GET — List tickets for authenticated student */
    LIST: '/v1/support/tickets',
    /** POST — Create ticket for authenticated student */
    CREATE: '/v1/support/tickets',
    /** GET — Retrieve support ticket thread */
    SHOW: (ticketNumber: string | number) => `/v1/support/tickets/${ticketNumber}`,
    /** POST — Reply to support ticket */
    REPLY: (ticketNumber: string | number) => `/v1/support/tickets/${ticketNumber}/replies`,
  },
} as const;
