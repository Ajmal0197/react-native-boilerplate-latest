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

describe('Config (resolution rules)', () => {
  const loadConfig = (keys: Record<string, string>, dev: boolean) => {
    const globalWithDev = globalThis as unknown as { __DEV__: boolean };
    const originalDev = globalWithDev.__DEV__;
    globalWithDev.__DEV__ = dev;
    try {
      jest.resetModules();
      jest.doMock('react-native-keys', () => ({
        __esModule: true,
        default: {
          publicFor: (k: string) => keys[k] ?? '',
          secureFor: () => '',
        },
      }));
      return require('@config/env') as typeof import('@config/env');
    } finally {
      globalWithDev.__DEV__ = originalDev;
      jest.dontMock('react-native-keys');
    }
  };

  it('throws in release builds when API_BASE_URL is missing', () => {
    expect(() => loadConfig({}, false)).toThrow('Missing API_BASE_URL');
  });

  it('falls back to the dev API URL in dev builds', () => {
    const { Config: devConfig } = loadConfig({}, true);
    expect(devConfig.API_BASE_URL).toBe('https://jsonplaceholder.typicode.com');
    expect(devConfig.USE_MOCK_API).toBe(true);
  });

  it('honors USE_MOCK_API and rejects unknown APP_ENV values', () => {
    const { Config: cfg } = loadConfig(
      {
        API_BASE_URL: 'https://api.example.com',
        USE_MOCK_API: 'false',
        APP_ENV: 'qa',
      },
      false,
    );
    expect(cfg.API_BASE_URL).toBe('https://api.example.com');
    expect(cfg.USE_MOCK_API).toBe(false);
    expect(cfg.APP_ENV).toBe('production');
  });
});
