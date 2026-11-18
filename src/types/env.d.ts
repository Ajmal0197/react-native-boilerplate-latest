/* eslint-disable no-var */
declare var global: typeof globalThis;

declare module 'react-native-keys' {
  export interface KeysStatic {
    APP_NAME: string;
    API_BASE_URL: string;
    APP_ENV: 'development' | 'staging' | 'production';
    ENABLE_DEV_TOOLS: string;
    BUNDLE_ID: string;
    PACKAGE_ID: string;
    TIMEOUT_MS: string;
    USE_MOCK_API?: string;
    secureFor(
      key: 'API_BASE_URL' | 'SECRET_KEY' | 'MMKV_ENCRYPTION_KEY' | string,
    ): string;
    publicFor(key: string): string;
    publicKeys(): Record<string, string>;
    [key: string]: unknown;
  }

  const Keys: KeysStatic;
  export default Keys;
}
