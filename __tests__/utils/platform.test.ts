import { selectPlatform } from '@utils/platform';

describe('selectPlatform', () => {
  it('returns the option for the current platform', () => {
    expect(selectPlatform({ ios: 'ios', android: 'android' })).toBe('ios');
  });
});
