/**
 * Color Palette and Theme Definitions
 *
 * Follows design tokens pattern for consistent cross-app theming.
 * Supports light and dark mode automatically via Unistyles.
 */
export const palette = {
  // Primary brand colors
  primary: '#0066FF',
  primaryDark: '#0A84FF',
  primaryLight: '#E5F0FF',

  // Neutrals
  white: '#FFFFFF',
  black: '#000000',
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',

  // Semantic feedback colors
  success: '#34C759',
  successDark: '#30D158',
  warning: '#FF9500',
  warningDark: '#FF9F0A',
  error: '#FF3B30',
  errorDark: '#FF453A',
  info: '#5856D6',
} as const;

export interface AppThemeColors {
  primary: string;
  primaryLight: string;
  background: string;
  surface: string;
  card: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  divider: string;
  error: string;
  success: string;
  warning: string;
  info: string;
  tint: string;
  overlay: string;
}

export const lightColors: AppThemeColors = {
  primary: palette.primary,
  primaryLight: palette.primaryLight,
  background: palette.white,
  surface: palette.gray50,
  card: palette.white,
  text: palette.gray900,
  textSecondary: palette.gray600,
  textMuted: palette.gray400,
  border: palette.gray200,
  divider: palette.gray100,
  error: palette.error,
  success: palette.success,
  warning: palette.warning,
  info: palette.info,
  tint: palette.primary,
  overlay: 'rgba(0, 0, 0, 0.4)',
};

export const darkColors: AppThemeColors = {
  primary: palette.primaryDark,
  primaryLight: 'rgba(10, 132, 255, 0.15)',
  background: palette.black,
  surface: '#121212',
  card: palette.gray800,
  text: palette.white,
  textSecondary: palette.gray300,
  textMuted: palette.gray500,
  border: palette.gray700,
  divider: '#2A2A2A',
  error: palette.errorDark,
  success: palette.successDark,
  warning: palette.warningDark,
  info: '#5E5CE6',
  tint: palette.primaryDark,
  overlay: 'rgba(0, 0, 0, 0.7)',
};

export type ColorKeys = keyof AppThemeColors;
