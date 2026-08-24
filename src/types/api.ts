/**
 * Shared API response types.
 *
 * Matches standard backend ApiResponse format.
 */

// ── Generic success response ────────────────────────────────────
export interface ApiResponse<T> {
  code?: number;
  success?: boolean;
  message: string;
  data: T;
  pagination?: {
    total: number;
    current_page: number;
    last_page: number;
    per_page: number;
  };
}

// ── Paginated list response ─────────────────────────────────────
export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  meta: PaginationMeta;
}

export interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number | null;
  to: number | null;
}

// ── Error response ──────────────────────────────────────────────
export interface ApiError {
  success: false;
  message: string;
  /** Validation errors keyed by field name */
  errors?: Record<string, string[]>;
}

// ── Auth types ──────────────────────────────────────────────────
export interface AuthUser {
  id: number;
  tenant_id?: number;
  name: string;
  email: string;
  phone: string;
  gender?: 'male' | 'female';
  status?: boolean;
  image?: string | null;
  created_at?: string;
}

export interface LoginRequest {
  login: string; // email or phone
  password: string;
  fcm_token?: string;
}

export interface LoginResponse {
  student: AuthUser;
  token: string;
}

export interface RegisterRequest {
  name: string;
  email?: string;
  phone: string;
  phone_confirmation?: string;
  password: string;
  gender?: 'male' | 'female';
}

export interface RegisterResponse {
  phone: string;
}

export interface VerifyOtpRequest {
  phone: string;
  token: string;
  fcm_token?: string;
}

export interface VerifyOtpResponse {
  student: AuthUser;
  token: string;
}

// ── Dashboard Auth types ───────────────────────────────────────
export interface DashboardUser {
  id: number;
  tenant_id?: number;
  name: string;
  email: string;
  phone?: string;
  image?: string | null;
  status?: boolean;
  roles: string[];
  permissions: string[];
  created_at?: string;
}

export interface DashboardLoginRequest {
  email: string;
  password: string;
}

export interface DashboardLoginResponse {
  user: DashboardUser;
  token: string;
}

export interface DashboardResetPasswordPayload {
  email: string;
  password: string;
  password_confirmation: string;
}

export interface DashboardUpdateProfilePayload {
  name: string;
  email: string;
  phone?: string;
}

export interface DashboardChangePasswordPayload {
  current_password: string;
  new_password: string;
}

export interface ApiProfileStatisticsResponse {
  stats: {
    total_orders?: number;
    reward_points?: number;
  };
  recent_reviews?: unknown[];
}
