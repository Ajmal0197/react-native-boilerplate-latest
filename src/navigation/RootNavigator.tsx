import type { RootStackParamList } from './types';
import React, { useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useUnistyles } from 'react-native-unistyles';
import { ProductDetailScreen, TabViewDemoScreen } from '@features/home';
import { LanguageSelectScreen } from '@features/settings';
import { useAppStore } from '@store/zustand/useAppStore';
import { useAuthStore } from '@store/zustand/useAuthStore';
import { AppNavigator } from './AppNavigator';
import { AuthNavigator } from './AuthNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const themeMode = useAppStore(state => state.themeMode);
  const systemColorScheme = useColorScheme();
  const { theme, rt } = useUnistyles();

  const isDark = useMemo(() => {
    if (themeMode === 'dark') return true;
    if (themeMode === 'light') return false;
    return (
      systemColorScheme === 'dark' ||
      rt.themeName === 'dark' ||
      theme.colors.background === '#000000'
    );
  }, [themeMode, systemColorScheme, rt.themeName, theme.colors.background]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        statusBarStyle: isDark ? 'light' : 'dark',
      }}
    >
      {!isAuthenticated ? (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      ) : (
        <Stack.Screen name="Main" component={AppNavigator} />
      )}

      {/* Common Modal / Deep Screen routes */}
      <Stack.Screen
        name="LanguageSelect"
        component={LanguageSelectScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="TabViewDemo"
        component={TabViewDemoScreen}
        options={{
          animation: 'slide_from_right',
        }}
      />
    </Stack.Navigator>
  );
};
