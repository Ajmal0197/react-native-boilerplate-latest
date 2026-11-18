import Keys from 'react-native-keys';

/**
 * Application Configuration
 *
 * Centralized application configuration backed by react-native-keys.
 * Supports multi-environment (keys.development.json, keys.staging.json, keys.production.json)
 * with JSI and C++ encryption for secure keys.
 */

type AppEnv = 'development' | 'staging' | 'production';

const APP_ENVS: readonly AppEnv[] = ['development', 'staging', 'production'];

const readPublic = (key: string): string => {
  const value = Keys.publicFor?.(key) || Keys[key];
  return typeof value === 'string' ? value : '';
};

const readSecure = (key: string): string => Keys.secureFor?.(key) || '';

const resolveAppEnv = (): AppEnv => {
  const value = readPublic('APP_ENV') as AppEnv;
  if (APP_ENVS.includes(value)) return value;
  return __DEV__ ? 'development' : 'production';
};

const parseBoolean = (value: string, fallback: boolean): boolean =>
  value ? value === 'true' : fallback;

const APP_ENV = resolveAppEnv();

// Dev fallback only. Release builds must provide API_BASE_URL via react-native-keys.
const DEV_API_BASE_URL = 'https://jsonplaceholder.typicode.com';

const resolveApiBaseUrl = (): string => {
  const url = readSecure('API_BASE_URL') || readPublic('API_BASE_URL');
  if (url) return url;
  if (__DEV__) return DEV_API_BASE_URL;
  throw new Error(
    'Missing API_BASE_URL. Define it in the keys.<env>.json used for this build.',
  );
};

export const Config = {
  APP_NAME: readPublic('APP_NAME') || 'RNBoilerplate',
  API_BASE_URL: resolveApiBaseUrl(),
  APP_ENV,
  ENABLE_DEV_TOOLS: parseBoolean(readPublic('ENABLE_DEV_TOOLS'), __DEV__),
  /**
   * Use the in-app mock backend (see `authApi`). Defaults to on in dev builds
   * only; set `USE_MOCK_API` to "true" / "false" in keys.<env>.json to override.
   */
  USE_MOCK_API: parseBoolean(readPublic('USE_MOCK_API'), __DEV__),
  BUNDLE_ID: readPublic('BUNDLE_ID') || 'com.rn_boilerplate_latest',
  PACKAGE_ID: readPublic('PACKAGE_ID') || 'com.rn_boilerplate_latest',
  TIMEOUT_MS: Number(readPublic('TIMEOUT_MS')) || 15000,
  /**
   * Helper to retrieve protected keys via react-native-keys
   */
  secureFor: readSecure,
  /**
   * Helper to retrieve public keys via react-native-keys
   */
  publicFor: readPublic,
} as const;

export type AppConfig = typeof Config;
export default Config;
