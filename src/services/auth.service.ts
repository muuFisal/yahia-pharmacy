import { apiClient, API_ENDPOINTS } from '@/lib/api';
import type {
  ApiResponse,
  AuthUser,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
  ApiProfileStatisticsResponse,
} from '@/types/api';

/**
 * Authentication service — handles all auth API calls.
 *
 * Uses Laravel Sanctum token-based auth:
 *  1. Login  → receives a Bearer token → stored in localStorage
 *  2. Logout → revokes the token on the server
 *  3. Me     → returns the authenticated user
 */
export const AuthService = {
  /**
   * Login with email/phone & password.
   * Stores the token and student in localStorage on success.
   * Bubbles up errors so that 419 (Unverified) can be handled by UI navigation to OTP.
   */
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const { data } = await apiClient.post<ApiResponse<LoginResponse>>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials,
    );

    // Persist auth state
    localStorage.setItem('auth_token', data.data.token);
    localStorage.setItem('user', JSON.stringify(data.data.student));

    return data.data;
  },

  /**
   * Register a new account.
   * Does NOT persist token immediately since student status = 0 (unverified).
   * The caller redirects to login while mobile OTP is disabled.
   */
  register: async (payload: RegisterRequest): Promise<RegisterResponse> => {
    const { data } = await apiClient.post<ApiResponse<RegisterResponse>>(
      API_ENDPOINTS.AUTH.REGISTER,
      payload,
    );
    return data.data;
  },

  /**
   * Verify the phone OTP code.
   * On success, activates account, returns Sanctum access token, and persists auth state.
   */
  verifyOtp: async (payload: VerifyOtpRequest): Promise<VerifyOtpResponse> => {
    const { data } = await apiClient.post<ApiResponse<VerifyOtpResponse>>(
      API_ENDPOINTS.AUTH.VERIFY_OTP,
      payload,
    );

    // Persist auth state on successful verification
    localStorage.setItem('auth_token', data.data.token);
    localStorage.setItem('user', JSON.stringify(data.data.student));

    return data.data;
  },

  /**
   * Resend verification OTP code to the student's phone.
   */
  resendOtp: async (phone: string): Promise<string> => {
    const { data } = await apiClient.post<ApiResponse<{ phone: string }>>(
      API_ENDPOINTS.AUTH.RESEND_OTP,
      { phone },
    );
    return data.message;
  },

  /**
   * Logout — revokes the current token on the server.
   */
  logout: async (): Promise<void> => {
    try {
      await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    } finally {
      // Always clear local auth state, even if the server call fails
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
    }
  },

  /**
   * Get the currently authenticated user.
   * Useful for validating a stored token on app mount.
   */
  getMe: async (options?: { signal?: AbortSignal }): Promise<AuthUser> => {
    const { data } = await apiClient.get<ApiResponse<AuthUser>>(
      API_ENDPOINTS.AUTH.ME,
      { signal: options?.signal }
    );
    return data.data;
  },

  /**
   * Request a password reset OTP by phone number.
   */
  forgotPassword: async (phone: string): Promise<string> => {
    const { data } = await apiClient.post<ApiResponse<null>>(
      API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
      { phone },
    );
    return data.message;
  },

  /**
   * Verify the forgot password OTP.
   */
  forgotVerifyOtp: async (payload: { phone: string; token: string }): Promise<string> => {
    const { data } = await apiClient.post<ApiResponse<null>>(
      API_ENDPOINTS.AUTH.FORGOT_VERIFY_OTP,
      payload,
    );
    return data.message;
  },

  /**
   * Resend forgot password OTP code.
   */
  forgotResendOtp: async (phone: string): Promise<string> => {
    const { data } = await apiClient.post<ApiResponse<null>>(
      API_ENDPOINTS.AUTH.FORGOT_RESEND_OTP,
      { phone },
    );
    return data.message;
  },

  resetPassword: async (payload: {
    phone: string;
    password: string;
    password_confirmation: string;
  }): Promise<AuthUser> => {
    const { data } = await apiClient.post<ApiResponse<AuthUser>>(
      API_ENDPOINTS.AUTH.RESET_PASSWORD,
      payload,
    );
    return data.data;
  },

  /**
   * Update student profile.
   */
  updateProfile: async (payload: {
    name: string;
    parent_name?: string;
    educational_stage_id?: number;
    educational_grade_id?: number;
    educational_section_id?: number;
  }): Promise<AuthUser> => {
    const { data } = await apiClient.put<ApiResponse<AuthUser>>(
      API_ENDPOINTS.AUTH.ME,
      payload,
    );
    // Update local storage
    localStorage.setItem('user', JSON.stringify(data.data));
    return data.data;
  },

  /**
   * Upload student avatar.
   */
  uploadAvatar: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);
    const { data } = await apiClient.post<ApiResponse<{ image: string }>>(
      API_ENDPOINTS.AUTH.ME_AVATAR,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    return data.data.image;
  },

  /**
   * Change student password.
   */
  changePassword: async (payload: {
    current_password: string;
    new_password: string;
  }): Promise<void> => {
    await apiClient.put<ApiResponse<null>>(
      API_ENDPOINTS.AUTH.CHANGE_PASSWORD,
      payload,
    );
  },

  /**
   * Get student profile statistics.
   */
  getStatistics: async (): Promise<ApiProfileStatisticsResponse> => {
    const { data } = await apiClient.get<ApiResponse<ApiProfileStatisticsResponse>>(
      API_ENDPOINTS.AUTH.STATISTICS,
    );
    return data.data;
  },

  // ── Helpers (no API calls) ───────────────────────────────────

  /** Check if a token exists in localStorage */
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('auth_token');
  },

  /** Get the stored user object (or null) */
  getStoredUser: (): AuthUser | null => {
    const raw = localStorage.getItem('user');
    if (!raw) return null;
    try {
      return JSON.parse(raw) as AuthUser;
    } catch {
      return null;
    }
  },
};
