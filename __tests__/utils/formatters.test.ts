import { formatCurrency, capitalize } from '@utils/formatters';

describe('formatters utility', () => {
  it('formats currency correctly', () => {
    const result = formatCurrency(120.5);
    expect(result).toContain('120.50');
  });

  it('capitalizes words properly', () => {
    expect(capitalize('developer')).toBe('Developer');
    expect(capitalize('')).toBe('');
  });
});
