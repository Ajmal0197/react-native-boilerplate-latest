// Built-in Jest matchers are included directly in @testing-library/react-native v12.4+
import '../src/theme';
import '../src/services/i18n';

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

// Mock react-native-mmkv
jest.mock('react-native-mmkv', () => {
  const createMockStorage = () => {
    const store = new Map<string, any>();
    return {
      set: jest.fn((key: string, val: any) => store.set(key, val)),
      getString: jest.fn((key: string) => store.get(key)),
      getBoolean: jest.fn((key: string) => store.get(key)),
      getNumber: jest.fn((key: string) => store.get(key)),
      remove: jest.fn((key: string) => store.delete(key)),
      delete: jest.fn((key: string) => store.delete(key)),
      clearAll: jest.fn(() => store.clear()),
    };
  };
  return {
    createMMKV: jest.fn(() => createMockStorage()),
    MMKV: jest.fn().mockImplementation(() => createMockStorage()),
  };
});

// Mock react-native-localize
jest.mock('react-native-localize', () => ({
  getLocales: () => [
    {
      countryCode: 'US',
      languageTag: 'en-US',
      languageCode: 'en',
      isRTL: false,
    },
  ],
  getNumberFormatSettings: () => ({
    decimalSeparator: '.',
    groupingSeparator: ',',
  }),
  getCalendar: () => 'gregorian',
  getCountry: () => 'US',
  getCurrencies: () => ['USD'],
  getTemperatureUnit: () => 'fahrenheit',
  getTimeZone: () => 'America/New_York',
  uses24HourClock: () => false,
  usesMetricSystem: () => false,
  findBestAvailableLanguage: () => ({ languageTag: 'en', isRTL: false }),
}));

// Mock @notifee/react-native
jest.mock('@notifee/react-native', () => ({
  requestPermission: jest.fn().mockResolvedValue({ authorizationStatus: 1 }),
  createChannel: jest.fn().mockResolvedValue('default_channel'),
  displayNotification: jest.fn().mockResolvedValue('notification_id'),
  createTriggerNotification: jest.fn().mockResolvedValue('trigger_id'),
  cancelNotification: jest.fn().mockResolvedValue(undefined),
  cancelAllNotifications: jest.fn().mockResolvedValue(undefined),
  AndroidImportance: { HIGH: 4 },
  TriggerType: { TIMESTAMP: 0 },
}));

// Mock react-native-keyboard-controller
jest.mock('react-native-keyboard-controller', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    KeyboardProvider: ({ children }: any) =>
      React.createElement(View, null, children),
    useKeyboardHandler: jest.fn(),
    useKeyboardAnimation: jest.fn(() => ({
      height: { value: 0 },
      progress: { value: 0 },
    })),
  };
});

// Mock @lokal-dev/react-native-bugbubble
jest.mock('@lokal-dev/react-native-bugbubble', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    BugBubble: () => React.createElement(View, null),
  };
});

// Mock react-native-restart
jest.mock('react-native-restart', () => ({
  restart: jest.fn(),
}));

// Mock react-native-safe-area-context
jest.mock('@legendapp/list/react-native', () => {
  const React = require('react');
  const { FlatList } = require('react-native');
  return {
    LegendList: (props: any) => React.createElement(FlatList, props),
  };
});

jest.mock('react-native-safe-area-context', () => {
  const React = require('react');
  const { View } = require('react-native');
  const inset = { top: 0, right: 0, bottom: 0, left: 0 };
  const frame = { x: 0, y: 0, width: 390, height: 844 };
  return {
    SafeAreaProvider: ({ children }: any) =>
      React.createElement(View, null, children),
    SafeAreaConsumer: ({ children }: any) => children(inset),
    SafeAreaInsetsContext: React.createContext(inset),
    SafeAreaFrameContext: React.createContext(frame),
    useSafeAreaInsets: jest.fn(() => inset),
    useSafeAreaFrame: jest.fn(() => frame),
  };
});

// Mock react-native-config
jest.mock('react-native-config', () => ({
  Config: {
    APP_NAME: 'RNBoilerplate',
    API_BASE_URL: 'https://jsonplaceholder.typicode.com',
    APP_ENV: 'development',
    ENABLE_DEV_TOOLS: 'true',
    BUNDLE_ID: 'com.rn_boilerplate_latest',
    PACKAGE_ID: 'com.rn_boilerplate_latest',
    TIMEOUT_MS: '15000',
  },
  default: {
    APP_NAME: 'RNBoilerplate',
    API_BASE_URL: 'https://jsonplaceholder.typicode.com',
    APP_ENV: 'development',
    ENABLE_DEV_TOOLS: 'true',
    BUNDLE_ID: 'com.rn_boilerplate_latest',
    PACKAGE_ID: 'com.rn_boilerplate_latest',
    TIMEOUT_MS: '15000',
  },
  APP_NAME: 'RNBoilerplate',
  API_BASE_URL: 'https://jsonplaceholder.typicode.com',
  APP_ENV: 'development',
  ENABLE_DEV_TOOLS: 'true',
  BUNDLE_ID: 'com.rn_boilerplate_latest',
  PACKAGE_ID: 'com.rn_boilerplate_latest',
  TIMEOUT_MS: '15000',
}));
