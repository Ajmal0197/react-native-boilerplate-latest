import axios, {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';
import { API_ENDPOINTS } from '@api/endpoints';
import { Toast } from '@components/organisms/Toast';
import { STORAGE_KEYS } from '@config/constants';
import { Config } from '@config/env';
import i18n from '@services/i18n';
import { storage } from '@services/storage';
import { useAuthStore } from '@store/zustand/useAuthStore';
import { normalizeApiError } from './errors';

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

interface RefreshResponse {
  token: string;
  refreshToken?: string;
}

/**
 * Production Axios Client
 *
 * Configured with baseURL, request interceptors (auto-attach token),
 * response interceptors, and a single-flight 401 token refresh: concurrent
 * 401 responses share one refresh request and replay once it settles.
 */
export const apiClient: AxiosInstance = axios.create({
  baseURL: Config.API_BASE_URL,
  timeout: Config.TIMEOUT_MS,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

let refreshPromise: Promise<string> | null = null;

/**
 * Requests a new access token. Uses a bare axios call (not `apiClient`) so the
 * refresh request never re-enters the 401 interceptor.
 */
const requestNewToken = async (): Promise<string> => {
  const refreshToken = storage.getString(STORAGE_KEYS.REFRESH_TOKEN);
  if (!refreshToken) {
    throw new Error('Missing refresh token');
  }

  const { data } = await axios.post<RefreshResponse>(
    `${Config.API_BASE_URL}${API_ENDPOINTS.AUTH.REFRESH}`,
    { refreshToken },
    { timeout: Config.TIMEOUT_MS },
  );

  useAuthStore.getState().setTokens(data.token, data.refreshToken);
  return data.token;
};

/**
 * Shares a single in-flight refresh across all concurrent 401 responses.
 */
const refreshAccessToken = (): Promise<string> => {
  if (!refreshPromise) {
    refreshPromise = requestNewToken().finally(() => {
      refreshPromise = null;
    });
  }
  return refreshPromise;
};

// Request Interceptor: inject Bearer token from MMKV
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = storage.getString(STORAGE_KEYS.AUTH_TOKEN);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

// Response Interceptor: unwrap responses & handle global errors
apiClient.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }

    const originalRequest = error.config as RetryableRequestConfig | undefined;
    const isRefreshCall = Boolean(
      originalRequest?.url?.includes(API_ENDPOINTS.AUTH.REFRESH),
    );

    // Handle 401 Unauthorized (token expired)
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !isRefreshCall
    ) {
      originalRequest._retry = true;

      try {
        const newToken = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return await apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh failed (or no refresh token): end the session so UI returns to auth
        useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }

    // Surface a toast on network failure or 5xx server errors
    if (!originalRequest?.silent) {
      const normalized = normalizeApiError(error);
      if (
        normalized.isNetworkError ||
        (normalized.statusCode && normalized.statusCode >= 500)
      ) {
        let title = i18n.t('toast.somethingWrong');
        if (normalized.isTimeout) {
          title = i18n.t('toast.requestTimeout');
        } else if (normalized.isNetworkError) {
          title = i18n.t('toast.networkError');
        }
        Toast.error(normalized.message, title);
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;
