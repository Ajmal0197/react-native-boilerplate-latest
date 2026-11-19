import { useUnistyles } from 'react-native-unistyles';
import { breakpoints } from '@theme/unistyles';

export type AppBreakpoint = keyof typeof breakpoints;

const BREAKPOINT_ORDER = Object.keys(breakpoints) as AppBreakpoint[];

export const breakpointIndex = (key: AppBreakpoint): number =>
  BREAKPOINT_ORDER.indexOf(key);

export const isBreakpointAtLeast = (
  current: AppBreakpoint,
  target: AppBreakpoint,
): boolean => breakpointIndex(current) >= breakpointIndex(target);

/**
 * Reads the active Unistyles breakpoint (updates on resize / fold unfold).
 */
export const useBreakpoint = () => {
  const { rt } = useUnistyles();
  const breakpoint = (rt.breakpoint ?? 'xs') as AppBreakpoint;

  const isAtLeast = (key: AppBreakpoint): boolean =>
    isBreakpointAtLeast(breakpoint, key);

  return {
    breakpoint,
    isAtLeast,
    /** Unfolded foldables, large phones, small tablets (≥ md). */
    isWide: isAtLeast('md'),
    /** Master–detail / two-pane layouts (≥ lg). */
    isExpanded: isAtLeast('lg'),
  };
};