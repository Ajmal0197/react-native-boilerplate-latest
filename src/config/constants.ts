/**
 * Application Constants
 */
export const STORAGE_KEYS = {
  AUTH_TOKEN: '@auth_token',
  REFRESH_TOKEN: '@refresh_token',
  USER_DATA: '@user_data',
  THEME_MODE: '@theme_mode',
  LANGUAGE: '@app_language',
  FIRST_LAUNCH_DONE: '@first_launch_done',
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
