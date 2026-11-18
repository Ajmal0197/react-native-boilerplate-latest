import { isValidEmail, isValidPassword } from '@utils/validators';

describe('validators', () => {
  it('validates emails', () => {
    expect(isValidEmail(' user@example.com ')).toBe(true);
    expect(isValidEmail('user@')).toBe(false);
  });

  it('validates passwords (8+ chars, letter and number)', () => {
    expect(isValidPassword('abc12345')).toBe(true);
    expect(isValidPassword('abcdefgh')).toBe(false);
    expect(isValidPassword('12345678')).toBe(false);
    expect(isValidPassword('a1')).toBe(false);
  });
});
