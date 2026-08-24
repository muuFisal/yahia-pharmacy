import axios from 'axios';
import { env } from '../env';
import { secureStorage } from '../../utils/secureStorage';

// ─────────────────────────────────────────────────────────────────
// Axios instance — every API call in the app goes through here.
// Automatically attaches: X-Tenant-Token, Accept-Language, Bearer token.
// ─────────────────────────────────────────────────────────────────

const apiClient = axios.create({
  baseURL: env.API_BASE_URL,
  timeout: 15_000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  // Sanctum Bearer Token Auth: do NOT send cookies as it conflicts with Bearer token authentication
  withCredentials: false,
});

// ── Request Interceptor ──────────────────────────────────────────
apiClient.interceptors.request.use(
  (config) => {
    // 1️⃣  X-Tenant-Token — always sent to identify the storefront
    config.headers['X-Tenant-Token'] = env.TENANT_TOKEN;

    // 2️⃣  Accept-Language — synced with the app's current language
    const lang = localStorage.getItem('language') || 'ar';
    config.headers['Accept-Language'] = lang;

    // 3️⃣  Authorization — Bearer token for authenticated endpoints
    const isDashboardRequest = config.url?.startsWith('/v1/dashboard');
    if (isDashboardRequest) {
      const token = secureStorage.getItem<string>('admin_auth_token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    } else {
      const token = localStorage.getItem('auth_token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// ── Response Interceptor ─────────────────────────────────────────
apiClient.interceptors.response.use(
  // Success — unwrap normally
  (response) => response,

  // Error handling
  (error) => {
    const status = error.response?.status;

    // 401 Unauthorized → clear auth state & redirect to login
    if (status === 401) {
      const isDashboardRequest = error.config?.url?.startsWith('/v1/dashboard');
      if (isDashboardRequest) {
        secureStorage.removeItem('admin_auth_token');
        secureStorage.removeItem('admin_user');
        localStorage.removeItem('isLoggedIn'); // mock login leftover flag

        // Redirect to admin login if not already there
        if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
          window.location.href = '/admin/login';
        }
      } else {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
        if (window.location.pathname !== '/login') {
          window.location.href = '/login?expired=true';
        }
      }
    }

    // 403 Forbidden → tenant token is invalid or deactivated
    if (status === 403) {
      console.error('[API] Forbidden — check X-Tenant-Token validity');
    }

    // 429 Too Many Requests → rate limited
    if (status === 429) {
      console.warn('[API] Rate limited — slow down requests');
    }

    return Promise.reject(error);
  },
);

export default apiClient;
