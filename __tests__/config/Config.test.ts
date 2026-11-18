import Keys from 'react-native-keys';
import { Config } from '@config';

describe('Config (react-native-keys integration)', () => {
  it('exposes public environment values correctly', () => {
    expect(Config.APP_NAME).toBe('RNBoilerplate');
    expect(Config.APP_ENV).toBe('development');
    expect(Config.BUNDLE_ID).toBe('com.rn_boilerplate_latest');
    expect(Config.PACKAGE_ID).toBe('com.rn_boilerplate_latest');
    expect(Config.TIMEOUT_MS).toBe(15000);
    expect(Config.ENABLE_DEV_TOOLS).toBe(true);
  });

  it('exposes secure environment values correctly via secureFor', () => {
    expect(Config.API_BASE_URL).toBe('https://jsonplaceholder.typicode.com');
    expect(Config.secureFor('SECRET_KEY')).toBe('test_secret_key');
    expect(Config.secureFor('MMKV_ENCRYPTION_KEY')).toBe(
      'test_mmkv_encryption_key',
    );
  });

  it('provides publicFor helper to retrieve public keys', () => {
    expect(Config.publicFor('APP_NAME')).toBe('RNBoilerplate');
  });

  it('calls Keys.secureFor when retrieving encrypted keys', () => {
    Config.secureFor('API_BASE_URL');
    expect(Keys.secureFor).toHaveBeenCalledWith('API_BASE_URL');
  });
});
