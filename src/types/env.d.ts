/* eslint-disable no-var, @typescript-eslint/no-explicit-any */
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
    secureFor(
      key: 'API_BASE_URL' | 'SECRET_KEY' | 'MMKV_ENCRYPTION_KEY' | string,
    ): string;
    publicFor(key: string): string;
    publicKeys(): Record<string, string>;
    [key: string]: any;
  }

  const Keys: KeysStatic;
  export default Keys;
}
