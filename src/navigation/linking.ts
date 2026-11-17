import type { RootStackParamList } from './types';
import type { LinkingOptions } from '@react-navigation/native';

/**
 * Deep Linking Configuration
 *
 * Supports deep links via scheme: rnboilerplate://
 * and universal links: https://rnboilerplate.example.com
 */
export const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ['rnboilerplate://', 'https://rnboilerplate.example.com'],
  config: {
    screens: {
      Auth: {
        screens: {
          Login: 'login',
          Register: 'register',
        },
      },
      Main: {
        screens: {
          Home: 'home',
          Notifications: 'notifications',
          Settings: 'settings',
        },
      },
      LanguageSelect: 'language-select',
      ProductDetail: 'product/:productId',
    },
  },
};
