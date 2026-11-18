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

export interface LanguageOption {
  code: 'en' | 'es' | 'ar';
  label: string;
  subLabel?: string;
  isRTL: boolean;
}

export const LANGUAGE_OPTIONS: readonly LanguageOption[] = [
  {
    code: 'en',
    label: 'English',
    isRTL: false,
  },
  {
    code: 'es',
    label: 'Español',
    isRTL: false,
  },
  {
    code: 'ar',
    label: 'العربية (Arabic)',
    subLabel: 'Right-to-Left Layout (RTL)',
    isRTL: true,
  },
] as const;
