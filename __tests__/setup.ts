// Built-in Jest matchers are included directly in @testing-library/react-native v12.4+
jest.mock('react-native-keys', () => {
  const keys: Record<string, any> = {
    APP_NAME: 'RNBoilerplate',
    API_BASE_URL: 'https://jsonplaceholder.typicode.com',
    APP_ENV: 'development',
    ENABLE_DEV_TOOLS: 'true',
    BUNDLE_ID: 'com.rn_boilerplate_latest',
    PACKAGE_ID: 'com.rn_boilerplate_latest',
    TIMEOUT_MS: '15000',
    secureFor: jest.fn((k: string) => {
      if (k === 'API_BASE_URL') return 'https://jsonplaceholder.typicode.com';
      if (k === 'SECRET_KEY') return 'test_secret_key';
      if (k === 'MMKV_ENCRYPTION_KEY') return 'test_mmkv_encryption_key';
      return '';
    }),
    publicFor: jest.fn((k: string) => keys[k] || ''),
    publicKeys: jest.fn(() => ({ ...keys })),
  };

  return {
    __esModule: true,
    default: keys,
    ...keys,
  };
});

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
  const { View, ScrollView } = require('react-native');
  return {
    KeyboardProvider: ({ children }: any) =>
      React.createElement(View, null, children),
    KeyboardAwareScrollView: React.forwardRef(
      ({ children, ...props }: any, ref: any) =>
        React.createElement(ScrollView, { ...props, ref }, children),
    ),
    useKeyboardHandler: jest.fn(),
    useKeyboardAnimation: jest.fn(() => ({
      height: { value: 0 },
      progress: { value: 0 },
    })),
    useKeyboardState: jest.fn(selector =>
      selector
        ? selector({ isVisible: false, height: 0, appearance: 'light' })
        : { isVisible: false, height: 0, appearance: 'light' },
    ),
    useReanimatedKeyboardAnimation: jest.fn(() => ({
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

// Mock react-native-tab-view
jest.mock('react-native-tab-view', () => {
  const React = require('react');
  const { View, Text } = require('react-native');
  return {
    TabView: ({ renderScene, renderTabBar, navigationState }: any) => {
      return React.createElement(
        View,
        { testID: 'mock-tab-view' },
        renderTabBar ? renderTabBar({ navigationState, jumpTo: jest.fn() }) : null,
        // Render all tab scenes in test environment for seamless interaction
        navigationState.routes.map((route: any) =>
          React.createElement(
            View,
            { key: route.key, testID: `tab-scene-${route.key}` },
            renderScene ? renderScene({ route }) : null,
          ),
        ),
      );
    },
    TabBar: ({ navigationState }: any) => {
      return React.createElement(
        View,
        { testID: 'mock-tab-bar' },
        navigationState.routes.map((r: any) =>
          React.createElement(Text, { key: r.key }, r.title),
        ),
      );
    },
    SceneMap: (scenes: any) => {
      return ({ route }: any) => {
        const Component = scenes[route.key];
        return Component ? React.createElement(Component) : null;
      };
    },
  };
});


// Mock react-native-gesture-handler
jest.mock('react-native-gesture-handler', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    GestureHandlerRootView: ({ children, ...props }: any) =>
      React.createElement(View, props, children),
    PanGestureHandler: ({ children }: any) => children,
    TapGestureHandler: ({ children }: any) => children,
    State: {},
    Directions: {},
  };
});

// Mock @swmansion/react-native-bottom-sheet
jest.mock('@swmansion/react-native-bottom-sheet', () => {
  const React = require('react');
  const { View } = require('react-native');

  const BottomSheetProvider = ({ children }: any) =>
    React.createElement(View, { testID: 'mock-bottom-sheet-provider' }, children);

  const ModalBottomSheet = ({
    children,
    surface,
    ...props
  }: any) => {
    return React.createElement(
      View,
      {
        ...props,
        testID: props.testID || 'mock-modal-bottom-sheet',
      },
      surface,
      children,
    );
  };

  const BottomSheet = ({ children, ...props }: any) =>
    React.createElement(View, props, children);

  return {
    __esModule: true,
    BottomSheetProvider,
    ModalBottomSheet,
    BottomSheet,
  };
});

// Mock react-native-toast-message
jest.mock('react-native-toast-message', () => {
  const React = require('react');
  const { View } = require('react-native');

  const mockToast = {
    show: jest.fn(),
    hide: jest.fn(),
  };

  const ToastComponent = Object.assign(
    () => React.createElement(View, { testID: 'mock-toast-root' }),
    mockToast,
  );

  return {
    __esModule: true,
    default: ToastComponent,
    Toast: ToastComponent,
  };
});



