import { Platform } from 'react-native';

export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const platformVersion = Platform.Version;

/**
 * Executes a platform-specific callback
 */
export const selectPlatform = <T>(options: {
  ios: T;
  android: T;
  default?: T;
}): T => {
  if (isIOS) return options.ios;
  if (isAndroid) return options.android;
  return options.default ?? options.ios;
};
