import RNCConfig from 'react-native-config';

/**
 * Application Configuration
 *
 * Centralized application configuration backed by react-native-config.
 * Supports multi-environment (.env.development, .env.staging, .env.production).
 */
export const Config = {
  APP_NAME: RNCConfig.APP_NAME || 'RNBoilerplate',
  API_BASE_URL: RNCConfig.API_BASE_URL || 'https://jsonplaceholder.typicode.com',
  APP_ENV: (RNCConfig.APP_ENV || (__DEV__ ? 'development' : 'production')) as
    | 'development'
    | 'staging'
    | 'production',
  ENABLE_DEV_TOOLS: RNCConfig.ENABLE_DEV_TOOLS
    ? RNCConfig.ENABLE_DEV_TOOLS === 'true'
    : __DEV__,
  BUNDLE_ID: RNCConfig.BUNDLE_ID || 'com.rn_boilerplate_latest',
  PACKAGE_ID: RNCConfig.PACKAGE_ID || 'com.rn_boilerplate_latest',
  TIMEOUT_MS: Number(RNCConfig.TIMEOUT_MS) || 15000,
} as const;

export type AppConfig = typeof Config;
export default Config;
