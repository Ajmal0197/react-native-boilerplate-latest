declare module 'react-native-config' {
  export interface NativeConfig {
    APP_NAME?: string;
    API_BASE_URL?: string;
    APP_ENV?: 'development' | 'staging' | 'production';
    ENABLE_DEV_TOOLS?: string;
    BUNDLE_ID?: string;
    PACKAGE_ID?: string;
    TIMEOUT_MS?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
