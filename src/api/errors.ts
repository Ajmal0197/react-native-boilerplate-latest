import axios from 'axios';

export interface NormalizedApiError {
  message: string;
  statusCode?: number;
  isNetworkError: boolean;
  isTimeout: boolean;
  isCanceled: boolean;
}

/**
 * Normalizes any error (Axios, Network, Timeout, or JavaScript Error)
 * into a structured, user-friendly format for UI display and analytics.
 */
export const normalizeApiError = (error: unknown): NormalizedApiError => {
  // 1. Client Cancellation / Aborted Request
  if (axios.isCancel(error)) {
    return {
      message: 'Request was cancelled',
      isCanceled: true,
      isNetworkError: false,
      isTimeout: false,
    };
  }

  // 2. Axios Errors
  if (axios.isAxiosError(error)) {
    // Timeout
    if (
      error.code === 'ECONNABORTED' ||
      error.message?.toLowerCase().includes('timeout')
    ) {
      return {
        message: 'Request timed out. Please check your connection and try again.',
        statusCode: 408,
        isNetworkError: true,
        isTimeout: true,
        isCanceled: false,
      };
    }

    // Offline / No Internet / Network Failure (No response from server)
    if (!error.response || error.code === 'ERR_NETWORK') {
      return {
        message: 'Unable to connect to the server. Please check your internet connection.',
        isNetworkError: true,
        isTimeout: false,
        isCanceled: false,
      };
    }

    const status = error.response.status;

    // Custom backend message if provided
    const serverMessage =
      (error.response.data as { message?: string })?.message ||
      (error.response.data as { error?: string })?.error;

    if (serverMessage && typeof serverMessage === 'string') {
      return {
        message: serverMessage,
        statusCode: status,
        isNetworkError: false,
        isTimeout: false,
        isCanceled: false,
      };
    }

    // Standard HTTP Status messages
    switch (status) {
      case 400:
        return {
          message: 'Invalid request. Please verify your data and try again.',
          statusCode: status,
          isNetworkError: false,
          isTimeout: false,
          isCanceled: false,
        };
      case 401:
        return {
          message: 'Session expired. Please log in again.',
          statusCode: status,
          isNetworkError: false,
          isTimeout: false,
          isCanceled: false,
        };
      case 403:
        return {
          message: 'Access denied. You do not have permission to view this resource.',
          statusCode: status,
          isNetworkError: false,
          isTimeout: false,
          isCanceled: false,
        };
      case 404:
        return {
          message: 'The requested resource was not found.',
          statusCode: status,
          isNetworkError: false,
          isTimeout: false,
          isCanceled: false,
        };
      case 429:
        return {
          message: 'Too many requests. Please slow down and try again later.',
          statusCode: status,
          isNetworkError: false,
          isTimeout: false,
          isCanceled: false,
        };
      case 500:
      case 502:
      case 503:
      case 504:
        return {
          message: 'Server is temporarily unavailable. Please try again later.',
          statusCode: status,
          isNetworkError: false,
          isTimeout: false,
          isCanceled: false,
        };
      default:
        return {
          message: error.message || 'Something went wrong. Please try again.',
          statusCode: status,
          isNetworkError: false,
          isTimeout: false,
          isCanceled: false,
        };
    }
  }

  // 3. Standard JS Error
  if (error instanceof Error) {
    return {
      message: error.message,
      isNetworkError: false,
      isTimeout: false,
      isCanceled: false,
    };
  }

  // 4. Unknown / Fallback
  return {
    message: 'An unexpected error occurred. Please try again.',
    isNetworkError: false,
    isTimeout: false,
    isCanceled: false,
  };
};

export default normalizeApiError;
