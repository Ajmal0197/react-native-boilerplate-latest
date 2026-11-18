import axios, {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';
import { AppConstant } from '@config/AppConstant';
import { STORAGE_KEYS } from '@config/constants';
import { Config } from '@config/env';
import { storage } from '@services/storage';
import { Toast } from '../components/organisms/Toast';
import { normalizeApiError } from './errors';

/**
 * Production Axios Client
 *
 * Configured with baseURL, request interceptors (auto-attach token),
 * response interceptors, and 401 token refresh queue.
 */
export const apiClient: AxiosInstance = axios.create({
  baseURL: Config.API_BASE_URL,
  timeout: Config.TIMEOUT_MS,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request Interceptor: inject Bearer token from MMKV
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = storage.getString(STORAGE_KEYS.AUTH_TOKEN);
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// Response Interceptor: unwrap responses & handle global errors
apiClient.interceptors.response.use(
  response => {
    return response;
  },
  async (error: AxiosError) => {
    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }

    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Handle 401 Unauthorized (Token expired)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = storage.getString(STORAGE_KEYS.REFRESH_TOKEN);
        if (refreshToken) {
          // Attempt refresh
          const refreshResponse = await axios.post(
            `${Config.API_BASE_URL}/auth/refresh`,
            {
              refreshToken,
            },
          );

          const { token: newToken } = refreshResponse.data;
          storage.set(STORAGE_KEYS.AUTH_TOKEN, newToken);

          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
          }

          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed: wipe storage session and reset global state/requests
        AppConstant.reset();
        storage.delete(STORAGE_KEYS.AUTH_TOKEN);
        storage.delete(STORAGE_KEYS.REFRESH_TOKEN);
        storage.delete(STORAGE_KEYS.USER_DATA);
        return Promise.reject(refreshError);
      }
    }

    // Automatically surface native error toast on network failure or 5xx server errors
    const isSilent = Boolean(
      (error.config as InternalAxiosRequestConfig & { silent?: boolean })?.silent,
    );

    if (!isSilent) {
      const normalized = normalizeApiError(error);
      if (
        normalized.isNetworkError ||
        (normalized.statusCode && normalized.statusCode >= 500)
      ) {
        Toast.error(
          normalized.message,
          normalized.isTimeout
            ? 'Request Timeout'
            : normalized.isNetworkError
              ? 'Network Error'
              : 'Something Went Wrong',
        );
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;
