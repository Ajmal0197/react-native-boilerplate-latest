import axios from 'axios';
import i18n from '@services/i18n';

export interface NormalizedApiError {
  message: string;
  statusCode?: number;
  isNetworkError: boolean;
  isTimeout: boolean;
  isCanceled: boolean;
}

const build = (
  message: string,
  overrides: Partial<Omit<NormalizedApiError, 'message'>> = {},
): NormalizedApiError => ({
  message,
  isNetworkError: false,
  isTimeout: false,
  isCanceled: false,
  ...overrides,
});

/**
 * Normalizes any error (Axios, Network, Timeout, or JavaScript Error)
 * into a structured, localized, user-friendly format for UI display and analytics.
 */
export const normalizeApiError = (error: unknown): NormalizedApiError => {
  // 1. Client Cancellation / Aborted Request
  if (axios.isCancel(error)) {
    return build(i18n.t('apiErrors.cancelled'), { isCanceled: true });
  }

  // 2. Axios Errors
  if (axios.isAxiosError(error)) {
    // Timeout
    if (
      error.code === 'ECONNABORTED' ||
      error.message?.toLowerCase().includes('timeout')
    ) {
      return build(i18n.t('apiErrors.timeout'), {
        statusCode: 408,
        isNetworkError: true,
        isTimeout: true,
      });
    }

    // Offline / No Internet / Network Failure (No response from server)
    if (!error.response || error.code === 'ERR_NETWORK') {
      return build(i18n.t('apiErrors.network'), { isNetworkError: true });
    }

    const status = error.response.status;

    // Custom backend message if provided
    const data = error.response.data as
      { message?: unknown; error?: unknown } | undefined;
    const serverMessage = data?.message || data?.error;

    if (serverMessage && typeof serverMessage === 'string') {
      return build(serverMessage, { statusCode: status });
    }

    // Standard HTTP Status messages
    switch (status) {
      case 400:
        return build(i18n.t('apiErrors.badRequest'), { statusCode: status });
      case 401:
        return build(i18n.t('apiErrors.unauthorized'), { statusCode: status });
      case 403:
        return build(i18n.t('apiErrors.forbidden'), { statusCode: status });
      case 404:
        return build(i18n.t('apiErrors.notFound'), { statusCode: status });
      case 429:
        return build(i18n.t('apiErrors.tooManyRequests'), {
          statusCode: status,
        });
      case 500:
      case 502:
      case 503:
      case 504:
        return build(i18n.t('apiErrors.serverUnavailable'), {
          statusCode: status,
        });
      default:
        return build(error.message || i18n.t('apiErrors.generic'), {
          statusCode: status,
        });
    }
  }

  // 3. Standard JS Error
  if (error instanceof Error) {
    return build(error.message);
  }

  // 4. Unknown / Fallback
  return build(i18n.t('apiErrors.unexpected'));
};

export default normalizeApiError;
