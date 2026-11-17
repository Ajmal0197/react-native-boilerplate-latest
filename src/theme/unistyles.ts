import { StyleSheet } from 'react-native-unistyles';
import { lightColors, darkColors } from './colors';
import { spacing, borderRadius } from './spacing';
import { fontSize, fontWeight, lineHeight } from './typography';

/**
 * Breakpoints configuration for responsive design
 */
export const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
} as const;

export const lightTheme = {
  colors: lightColors,
  spacing,
  borderRadius,
  fontSize,
  fontWeight,
  lineHeight,
} as const;

export const darkTheme = {
  colors: darkColors,
  spacing,
  borderRadius,
  fontSize,
  fontWeight,
  lineHeight,
} as const;

export const themes = {
  light: lightTheme,
  dark: darkTheme,
} as const;

type AppThemes = typeof themes;
type AppBreakpoints = typeof breakpoints;

// TypeScript module augmentation for full autocompletion inside StyleSheet.create()
declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
  export interface UnistylesBreakpoints extends AppBreakpoints {}
}

// Initialize Unistyles globally
StyleSheet.configure({
  settings: {
    initialTheme: 'light',
  },
  breakpoints,
  themes,
});
