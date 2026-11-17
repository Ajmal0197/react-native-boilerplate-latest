/**
 * Application Constants
 */
export const STORAGE_KEYS = {
  AUTH_TOKEN: '@auth_token',
  REFRESH_TOKEN: '@refresh_token',
  USER_DATA: '@user_data',
  THEME_MODE: '@theme_mode',
  LANGUAGE: '@app_language',
} as const;

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
  },
  PHOTOS: {
    LIST: '/photos',
    DETAIL: (id: number | string) => `/photos/${id}`,
  },
  POSTS: {
    LIST: '/posts',
    DETAIL: (id: number | string) => `/posts/${id}`,
  },
  PRODUCTS: {
    LIST: '/products',
    DETAIL: (id: string) => `/products/${id}`,
  },
} as const;
