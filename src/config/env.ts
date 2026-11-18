import Keys from 'react-native-keys';

/**
 * Application Configuration
 *
 * Centralized application configuration backed by react-native-keys.
 * Supports multi-environment (keys.development.json, keys.staging.json, keys.production.json)
 * with JSI and C++ encryption for secure keys.
 */
export const Config = {
  APP_NAME: Keys.APP_NAME || Keys.publicFor?.('APP_NAME') || 'RNBoilerplate',
  API_BASE_URL:
    Keys.secureFor?.('API_BASE_URL') ||
    Keys.API_BASE_URL ||
    'https://jsonplaceholder.typicode.com',
  APP_ENV: (Keys.APP_ENV ||
    Keys.publicFor?.('APP_ENV') ||
    (__DEV__ ? 'development' : 'production')) as
    | 'development'
    | 'staging'
    | 'production',
  ENABLE_DEV_TOOLS: (Keys.ENABLE_DEV_TOOLS || Keys.publicFor?.('ENABLE_DEV_TOOLS'))
    ? (Keys.ENABLE_DEV_TOOLS || Keys.publicFor?.('ENABLE_DEV_TOOLS')) === 'true'
    : __DEV__,
  BUNDLE_ID:
    Keys.BUNDLE_ID || Keys.publicFor?.('BUNDLE_ID') || 'com.rn_boilerplate_latest',
  PACKAGE_ID:
    Keys.PACKAGE_ID || Keys.publicFor?.('PACKAGE_ID') || 'com.rn_boilerplate_latest',
  TIMEOUT_MS:
    Number(Keys.TIMEOUT_MS || Keys.publicFor?.('TIMEOUT_MS')) || 15000,
  /**
   * Helper to retrieve protected keys via react-native-keys
   */
  secureFor: (key: string): string => Keys.secureFor?.(key) || '',
  /**
   * Helper to retrieve public keys via react-native-keys
   */
  publicFor: (key: string): string =>
    Keys.publicFor?.(key) || (Keys[key] as string) || '',
} as const;

export type AppConfig = typeof Config;
export default Config;
