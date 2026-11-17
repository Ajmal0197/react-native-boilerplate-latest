import { Platform } from 'react-native';

/**
 * Typography Tokens
 *
 * System fonts ensure optimal rendering on iOS (SF Pro) and Android (Roboto)
 * without requiring bundled font assets initially.
 */
export const fontFamily = {
  regular: Platform.select({ ios: 'System', default: 'sans-serif' }),
  medium: Platform.select({ ios: 'System', default: 'sans-serif-medium' }),
  bold: Platform.select({ ios: 'System', default: 'sans-serif' }),
} as const;

export const fontSize = {
  xxs: 10,
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  display: 32,
} as const;

export const fontWeight = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

export const lineHeight = {
  xxs: 14,
  xs: 16,
  sm: 20,
  md: 24,
  lg: 26,
  xl: 28,
  xxl: 32,
  display: 40,
} as const;
