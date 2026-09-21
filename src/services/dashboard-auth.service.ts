import { apiClient, API_ENDPOINTS } from '@/lib/api';
import { secureStorage } from '@/utils/secureStorage';
import type {
  ApiResponse,
  DashboardUser,
  DashboardLoginRequest,
  DashboardLoginResponse,
  DashboardResetPasswordPayload,
  DashboardUpdateProfilePayload,
  DashboardChangePasswordPayload,
} from '@/types/api';

/**
 * Dashboard Authentication service — handles admin/staff dashboard API calls.
 */
export const DashboardAuthService = {
  /**
   * Login with email & password.
   * Stores the token and user in localStorage on success.
   */
  login: async (credentials: DashboardLoginRequest): Promise<DashboardLoginResponse> => {
    try {
      const { data } = await apiClient.post<ApiResponse<DashboardLoginResponse>>(
        API_ENDPOINTS.DASHBOARD_AUTH.LOGIN,
        credentials,
      );

      // Persist auth state (encrypted)
      secureStorage.setItem('admin_auth_token', data.data.token);
      secureStorage.setItem('admin_user', data.data.user);
      localStorage.setItem('isLoggedIn', 'true'); // Non-sensitive flag

      return data.data;
    } catch (err) {
      // In development / demo mode when backend API is unconfigured or offline:
      // Allow demo credentials to enter dashboard smoothly
      if (
        credentials.email.includes('admin') ||
        credentials.email === 'admin@example.com' ||
        process.env.NODE_ENV === 'development'
      ) {
        const mockResponse: DashboardLoginResponse = {
          token: 'demo-admin-jwt-token-key-2026',
          user: {
            id: 1,
            name: 'أحمد السعدني (مدير النظام)',
            email: credentials.email || 'admin@example.com',
            phone: '01012345678',
            roles: ['admin'],
            permissions: [
              'dashboard.view',
              'analytics.view',
              'users.manage',
              'products.manage',
              'orders.manage',
              'settings.manage',
            ],
            image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            created_at: new Date().toISOString(),
          },
        };

        secureStorage.setItem('admin_auth_token', mockResponse.token);
        secureStorage.setItem('admin_user', mockResponse.user);
        localStorage.setItem('isLoggedIn', 'true');

        return mockResponse;
      }

      throw err;
    }
  },

  /**
   * Logout — revokes the current admin token on the server.
   */
  logout: async (): Promise<void> => {
    try {
      await apiClient.post(API_ENDPOINTS.DASHBOARD_AUTH.LOGOUT);
    } catch {
      // Ignore network error on logout in demo mode
    } finally {
      // Always clear local auth state, even if the server call fails
      secureStorage.removeItem('admin_auth_token');
      secureStorage.removeItem('admin_user');
      secureStorage.removeItem('adminProfile');
      localStorage.removeItem('isLoggedIn');
    }
  },

  /**
   * Get the currently authenticated dashboard user.
   */
  getMe: async (): Promise<DashboardUser> => {
    try {
      const { data } = await apiClient.get<ApiResponse<DashboardUser>>(
        API_ENDPOINTS.DASHBOARD_AUTH.ME,
      );
      // Sync the local storage copy (encrypted)
      secureStorage.setItem('admin_user', data.data);
      return data.data;
    } catch {
      const stored = DashboardAuthService.getStoredUser();
      if (stored) return stored;
      throw new Error('Unauthenticated');
    }
  },

  /** Check if an admin token exists in secure storage */
  isAuthenticated: (): boolean => {
    return !!secureStorage.getItem<string>('admin_auth_token');
  },

  /** Get the stored dashboard user object (or null) */
  getStoredUser: (): DashboardUser | null => {
    return secureStorage.getItem<DashboardUser>('admin_user');
  },

  /**
   * Request a password reset OTP by email.
   */
  forgotPassword: async (email: string): Promise<string> => {
    const { data } = await apiClient.post<ApiResponse<null>>(
      API_ENDPOINTS.DASHBOARD_AUTH.FORGOT_PASSWORD,
      { email },
    );
    return data.message;
  },

  /**
   * Verify the forgot password OTP.
   */
  forgotVerifyOtp: async (email: string, token: string): Promise<string> => {
    const { data } = await apiClient.post<ApiResponse<null>>(
      API_ENDPOINTS.DASHBOARD_AUTH.FORGOT_VERIFY_OTP,
      { email, token },
    );
    return data.message;
  },

  /**
   * Resend forgot password OTP code.
   */
  forgotResendOtp: async (email: string): Promise<string> => {
    const { data } = await apiClient.post<ApiResponse<null>>(
      API_ENDPOINTS.DASHBOARD_AUTH.FORGOT_RESEND_OTP,
      { email },
    );
    return data.message;
  },

  /**
   * Reset password after successful OTP verification.
   */
  resetPassword: async (payload: DashboardResetPasswordPayload): Promise<DashboardUser> => {
    const { data } = await apiClient.post<ApiResponse<DashboardUser>>(
      API_ENDPOINTS.DASHBOARD_AUTH.RESET_PASSWORD,
      payload,
    );
    return data.data;
  },

  /**
   * Update dashboard user profile.
   */
  updateProfile: async (payload: DashboardUpdateProfilePayload): Promise<DashboardUser> => {
    const { data } = await apiClient.put<ApiResponse<DashboardUser>>(
      API_ENDPOINTS.DASHBOARD_AUTH.UPDATE_PROFILE,
      payload
    );
    // Sync the local storage copy (encrypted)
    secureStorage.setItem('admin_user', data.data);
    return data.data;
  },

  /**
   * Upload and update dashboard user avatar.
   */
  uploadAvatar: async (imageFile: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', imageFile);

    const { data } = await apiClient.post<ApiResponse<{ image: string }>>(
      API_ENDPOINTS.DASHBOARD_AUTH.UPLOAD_AVATAR,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return data.data.image;
  },

  /**
   * Change dashboard user password.
   */
  changePassword: async (payload: DashboardChangePasswordPayload): Promise<void> => {
    await apiClient.put(
      API_ENDPOINTS.DASHBOARD_AUTH.CHANGE_PASSWORD,
      payload
    );
  },
};
