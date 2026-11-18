import type { RootStackParamList } from './types';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProductDetailScreen, TabViewDemoScreen } from '@features/home';
import { LanguageSelectScreen } from '@features/settings';
import { useIsDark } from '@hooks/useIsDark';
import { useAuthStore } from '@store/zustand/useAuthStore';
import { AppNavigator } from './AppNavigator';
import { AuthNavigator } from './AuthNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const isDark = useIsDark();

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
