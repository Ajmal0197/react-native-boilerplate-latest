import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

/**
 * Auth Stack Parameter List
 */
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

/**
 * Main Bottom Tab Parameter List
 */
export type MainTabParamList = {
  Home: undefined;
  Notifications: undefined;
  Settings: undefined;
};

/**
 * Root Stack Parameter List
 */
export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
  LanguageSelect: undefined;
  ProductDetail: { productId: string; title: string };
};

/**
 * Generic Screen Props Helper
 */
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type AuthScreenProps<T extends keyof AuthStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<AuthStackParamList, T>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type TabScreenProps<T extends keyof MainTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<MainTabParamList, T>,
    NativeStackScreenProps<RootStackParamList>
  >;
