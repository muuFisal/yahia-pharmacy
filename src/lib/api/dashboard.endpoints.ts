/**
 * Dashboard API Endpoints.
 * Contains all backend URL paths for administrator & dashboard actions.
 */
export const DASHBOARD_API_ENDPOINTS = {
  /** POST — Login admin/staff */
  LOGIN: '/v1/dashboard/auth/login',
  /** GET  — Get current dashboard user profile */
  ME: '/v1/dashboard/auth/me',
  /** POST — Logout dashboard user */
  LOGOUT: '/v1/dashboard/auth/logout',
  /** POST — Request password reset OTP */
  FORGOT_PASSWORD: '/v1/dashboard/auth/forgot/password',
  /** POST — Verify forgot password OTP */
  FORGOT_VERIFY_OTP: '/v1/dashboard/auth/forgot/verify-otp',
  /** POST — Resend forgot password OTP */
  FORGOT_RESEND_OTP: '/v1/dashboard/auth/forgot/resend-otp',
  /** POST — Reset password */
  RESET_PASSWORD: '/v1/dashboard/auth/forgot/reset-password',
  /** PUT  — Update dashboard user profile */
  UPDATE_PROFILE: '/v1/dashboard/auth/me',
  /** POST — Upload dashboard user avatar */
  UPLOAD_AVATAR: '/v1/dashboard/auth/me/avatar',
  /** PUT  — Change dashboard user password */
  CHANGE_PASSWORD: '/v1/dashboard/auth/change-password',
  /** GET/POST — Retrieve/Update General Settings */
  SETTINGS_GENERAL: '/v1/dashboard/settings/general',
  /** GET/POST — Retrieve/Update Static Page content */
  SETTINGS_PAGE: (slug: string) => `/v1/dashboard/settings/pages/${slug}`,
  /** GET/POST — Retrieve/Create FAQs */
  FAQS: '/v1/dashboard/faqs',
  /** PUT/DELETE — Update/Delete FAQ */
  FAQS_DETAIL: (id: string | number) => `/v1/dashboard/faqs/${id}`,
  /** GET — Retrieve Audit Logs */
  AUDITS: '/v1/dashboard/audits',
  /** GET — Retrieve Audit Log Details */
  AUDITS_DETAIL: (id: string | number) => `/v1/dashboard/audits/${id}`,
  /** POST — Clear Audit Logs */
  AUDITS_CLEAR: '/v1/dashboard/audits/clear',
  /** GET/POST — Retrieve/Create Branches */
  BRANCHES: '/v1/dashboard/branches',
  /** PUT/DELETE — Update/Delete Branch */
  BRANCHES_DETAIL: (id: string | number) => `/v1/dashboard/branches/${id}`,
  /** POST — Restore soft-deleted branch */
  BRANCHES_RESTORE: (id: string | number) => `/v1/dashboard/branches/${id}/restore`,
  /** DELETE — Permanently delete branch */
  BRANCHES_FORCE_DELETE: (id: string | number) => `/v1/dashboard/branches/${id}/force-delete`,
  /** POST — Restore soft-deleted FAQ */
  FAQS_RESTORE: (id: string | number) => `/v1/dashboard/faqs/${id}/restore`,
  /** DELETE — Permanently delete FAQ */
  FAQS_FORCE_DELETE: (id: string | number) => `/v1/dashboard/faqs/${id}/force-delete`,
  /** PATCH — Toggle FAQ status */
  FAQS_TOGGLE_STATUS: (id: string | number) => `/v1/dashboard/faqs/${id}/status`,
  /** PATCH — Toggle Branch status */
  BRANCHES_TOGGLE_STATUS: (id: string | number) => `/v1/dashboard/branches/${id}/status`,

  /** GET/POST — Retrieve/Create Admins (Users) */
  USERS: '/v1/dashboard/users',
  /** PUT/DELETE — Update/Delete Admin (User) */
  USERS_DETAIL: (id: string | number) => `/v1/dashboard/users/${id}`,
  /** PATCH — Toggle Admin active status */
  USERS_TOGGLE_STATUS: (id: string | number) => `/v1/dashboard/users/${id}/status`,
  /** POST — Restore soft-deleted Admin */
  USERS_RESTORE: (id: string | number) => `/v1/dashboard/users/${id}/restore`,
  /** DELETE — Permanently delete Admin */
  USERS_FORCE_DELETE: (id: string | number) => `/v1/dashboard/users/${id}/force-delete`,

  /** GET/POST — Retrieve/Create Roles */
  ROLES: '/v1/dashboard/roles',
  /** PUT/DELETE — Update/Delete Role */
  ROLES_DETAIL: (id: string | number) => `/v1/dashboard/roles/${id}`,
  /** POST — Restore soft-deleted Role */
  ROLES_RESTORE: (id: string | number) => `/v1/dashboard/roles/${id}/restore`,
  /** DELETE — Permanently delete Role */
  ROLES_FORCE_DELETE: (id: string | number) => `/v1/dashboard/roles/${id}/force-delete`,

  /** GET — Retrieve Grouped Permissions */
  PERMISSIONS: '/v1/dashboard/permissions',

  /** GET — Retrieve Categories List */
  CATEGORIES: '/v1/dashboard/categories',
  /** PATCH — Toggle Category Visibility */
  CATEGORIES_TOGGLE_VISIBILITY: (id: string | number) => `/v1/dashboard/categories/${id}/visibility`,
  CATEGORIES_TOGGLE_DELIVERY_ONLY: (id: string | number) => `/v1/dashboard/categories/${id}/delivery-only`,

  /** GET — Retrieve Subjects List */
  SUBJECTS: '/v1/dashboard/subjects',
  /** PATCH — Toggle Subject Visibility */
  SUBJECTS_TOGGLE_VISIBILITY: (id: string | number) => `/v1/dashboard/subjects/${id}/visibility`,

  /** GET/POST — Retrieve/Create Teachers */
  TEACHERS: '/v1/dashboard/teachers',
  /** GET/POST — Retrieve/Update Teacher Details (POST for compatibility with multipart/form-data) */
  TEACHERS_DETAIL: (id: string | number) => `/v1/dashboard/teachers/${id}`,
  /** PATCH — Toggle Teacher active status / storefront visibility */
  TEACHERS_TOGGLE_STATUS: (id: string | number) => `/v1/dashboard/teachers/${id}/status`,
  TEACHERS_TOGGLE_DELIVERY_ONLY: (id: string | number) => `/v1/dashboard/teachers/${id}/delivery-only`,
  /** POST — Restore soft-deleted Teacher */
  TEACHERS_RESTORE: (id: string | number) => `/v1/dashboard/teachers/${id}/restore`,
  /** DELETE — Permanently delete Teacher */
  TEACHERS_FORCE_DELETE: (id: string | number) => `/v1/dashboard/teachers/${id}/force-delete`,
  /** GET — Products & Financial Report for a specific teacher */
  TEACHER_PRODUCTS_REPORT: (id: string | number) => `/v1/dashboard/teachers/${id}/products-report`,

  /** GET/POST — Retrieve/Create Students */
  STUDENTS: '/v1/dashboard/students',
  /** GET/POST — Retrieve/Update Student Details (POST for compatibility with multipart/form-data) */
  STUDENTS_DETAIL: (id: string | number) => `/v1/dashboard/students/${id}`,
  /** PATCH — Toggle Student active status */
  STUDENTS_TOGGLE_STATUS: (id: string | number) => `/v1/dashboard/students/${id}/status`,
  /** POST — Restore soft-deleted Student */
  STUDENTS_RESTORE: (id: string | number) => `/v1/dashboard/students/${id}/restore`,
  /** DELETE — Permanently delete Student */
  STUDENTS_FORCE_DELETE: (id: string | number) => `/v1/dashboard/students/${id}/force-delete`,

  /** GET/POST — Retrieve/Create Products */
  PRODUCTS: '/v1/dashboard/products',
  /** GET/POST — Retrieve/Update Product Details */
  PRODUCTS_DETAIL: (id: string | number) => `/v1/dashboard/products/${id}`,
  /** PATCH — Toggle Product active/visibility status */
  PRODUCTS_TOGGLE_STATUS: (id: string | number) => `/v1/dashboard/products/${id}/status`,
  PRODUCTS_TOGGLE_DELIVERY_ONLY: (id: string | number) => `/v1/dashboard/products/${id}/delivery-only`,
  /** POST — Restore soft-deleted Product */
  PRODUCTS_RESTORE: (id: string | number) => `/v1/dashboard/products/${id}/restore`,
  /** DELETE — Permanently delete Product */
  PRODUCTS_FORCE_DELETE: (id: string | number) => `/v1/dashboard/products/${id}/force-delete`,
  
  /** GET — Retrieve digital codes for a specific product */
  PRODUCT_CODES: (productId: string | number) => `/v1/dashboard/products/${productId}/codes`,
  /** GET — Download template for uploading codes */
  PRODUCT_CODES_TEMPLATE: '/v1/dashboard/products/codes/template',
  /** POST — Create a single digital code manually */
  PRODUCT_CODES_SINGLE: (productId: string | number) => `/v1/dashboard/products/${productId}/codes/single`,
  /** POST — Upload Excel sheet containing digital codes */
  PRODUCT_CODES_EXCEL: (productId: string | number) => `/v1/dashboard/products/${productId}/codes/excel`,
  /** DELETE — Delete an unsold/unreserved digital code */
  PRODUCT_CODES_DELETE_SINGLE: (codeId: string | number) => `/v1/dashboard/products/codes/${codeId}`,
  
  /** GET — Retrieve support tickets list */
  SUPPORT_TICKETS: '/v1/dashboard/support-tickets',
  /** GET — Retrieve support ticket details */
  SUPPORT_TICKETS_DETAIL: (id: string | number) => `/v1/dashboard/support-tickets/${id}`,
  /** POST — Reply to support ticket */
  SUPPORT_TICKETS_REPLY: (id: string | number) => `/v1/dashboard/support-tickets/${id}/reply`,
  /** POST — Escalate support ticket to platform */
  SUPPORT_TICKETS_ESCALATE: (id: string | number) => `/v1/dashboard/support-tickets/${id}/escalate`,

  /** GET — Retrieve wallet summary and transaction ledger */
  WALLET: '/v1/dashboard/wallet',
  /** POST — Submit withdrawal request */
  WALLET_WITHDRAW: '/v1/dashboard/wallet/withdraw',
  /** GET — List withdrawal requests */
  WALLET_WITHDRAWALS: '/v1/dashboard/wallet/withdrawals',
  /** GET/POST — List/Create B2B procurement orders */
  PROCUREMENT: '/v1/dashboard/procurement',
  /** POST — Cancel B2B procurement order */
  PROCUREMENT_CANCEL: (id: string | number) => `/v1/dashboard/procurement/${id}/cancel`,
  /** GET — View owned physical product stock levels */
  PROCUREMENT_STOCK: '/v1/dashboard/procurement/stock',
  /** GET — View owned digital product codes */
  PROCUREMENT_CODES: '/v1/dashboard/procurement/codes',
  /** GET — Look up student pickup order */
  PICKUP_LOOKUP: '/v1/dashboard/orders/pickup/look-up',
  /** POST — Confirm student pickup handover */
  PICKUP_CONFIRM: '/v1/dashboard/orders/pickup/confirm',
  /** GET — Retrieve orders list */
  ORDERS: '/v1/dashboard/orders',
  /** GET — Retrieve order details */
  ORDERS_DETAIL: (id: string | number) => `/v1/dashboard/orders/${id}`,
  /** PUT — Update order status fields */
  ORDERS_STATUS: (id: string | number) => `/v1/dashboard/orders/${id}/status`,
  /** POST — Restore soft-deleted order */
  ORDERS_RESTORE: (id: string | number) => `/v1/dashboard/orders/${id}/restore`,
  /** DELETE — Permanently delete order */
  ORDERS_FORCE_DELETE: (id: string | number) => `/v1/dashboard/orders/${id}/force-delete`,
  /** GET — Get order timeline logs */
  ORDERS_LOGS: (id: string | number) => `/v1/dashboard/orders/${id}/logs`,
  /** POST — Direct Counter sale at branch */
  DIRECT_SALE: '/v1/dashboard/branches/direct-sale',
  /** GET — Paginated direct sales history list */
  DIRECT_SALES: '/v1/dashboard/branches/direct-sales',

  /** GET/POST — List/Create Banners */
  BANNERS: '/v1/dashboard/banners',
  /** POST/DELETE/GET — Detail operations on banner */
  BANNERS_DETAIL: (id: string | number) => `/v1/dashboard/banners/${id}`,
  /** PATCH — Toggle banner active status */
  BANNERS_TOGGLE_STATUS: (id: string | number) => `/v1/dashboard/banners/${id}/status`,
  /** POST — Restore soft-deleted banner */
  BANNERS_RESTORE: (id: string | number) => `/v1/dashboard/banners/${id}/restore`,
  /** DELETE — Permanently delete banner */
  BANNERS_FORCE_DELETE: (id: string | number) => `/v1/dashboard/banners/${id}/force-delete`,

  /** GET/POST — List/Create Coupons */
  COUPONS: '/v1/dashboard/coupons',
  /** POST/DELETE/GET — Detail operations on coupon */
  COUPONS_DETAIL: (id: string | number) => `/v1/dashboard/coupons/${id}`,
  /** PATCH — Toggle coupon active status */
  COUPONS_TOGGLE_STATUS: (id: string | number) => `/v1/dashboard/coupons/${id}/status`,
  /** POST — Restore soft-deleted coupon */
  COUPONS_RESTORE: (id: string | number) => `/v1/dashboard/coupons/${id}/restore`,
  /** DELETE — Permanently delete coupon */
  COUPONS_FORCE_DELETE: (id: string | number) => `/v1/dashboard/coupons/${id}/force-delete`,

  /** GET — Retrieve abandoned carts list */
  ABANDONED_CARTS: '/v1/dashboard/abandoned-carts',
  /** POST — WhatsApp reminder */
  ABANDONED_CARTS_WHATSAPP: (id: string | number) => `/v1/dashboard/abandoned-carts/${id}/whatsapp`,
  /** POST — Email reminder */
  ABANDONED_CARTS_EMAIL: (id: string | number) => `/v1/dashboard/abandoned-carts/${id}/email`,
  /** DELETE — Delete abandoned cart */
  ABANDONED_CARTS_DELETE: (id: string | number) => `/v1/dashboard/abandoned-carts/${id}`,
  /** GET — Retrieve dashboard overview statistics */
  OVERVIEW_STATS: '/v1/dashboard/overview/stats',
  
  /** GET — Export products to Excel */
  EXPORT_PRODUCTS: '/v1/dashboard/products/export',
  /** GET — Export teachers to Excel */
  EXPORT_TEACHERS: '/v1/dashboard/teachers/export',
  /** GET — Export orders to Excel */
  EXPORT_ORDERS: '/v1/dashboard/orders/export',
} as const;


