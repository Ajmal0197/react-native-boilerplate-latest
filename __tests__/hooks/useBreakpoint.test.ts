import {
  isBreakpointAtLeast,
  breakpointIndex,
  type AppBreakpoint,
} from '@hooks/useBreakpoint';

describe('useBreakpoint helpers', () => {
  it('orders breakpoints from xs through xl', () => {
    const order: AppBreakpoint[] = ['xs', 'sm', 'fold', 'md', 'lg', 'xl'];
    order.forEach((key, idx) => {
      expect(breakpointIndex(key)).toBe(idx);
    });
  });

  it('isBreakpointAtLeast treats lg as wide and expanded', () => {
    expect(isBreakpointAtLeast('lg', 'md')).toBe(true);
    expect(isBreakpointAtLeast('lg', 'lg')).toBe(true);
    expect(isBreakpointAtLeast('fold', 'md')).toBe(false);
  });

  it('treats fold as wider than sm but narrower than md', () => {
    expect(isBreakpointAtLeast('fold', 'sm')).toBe(true);
    expect(isBreakpointAtLeast('fold', 'md')).toBe(false);
  });
});