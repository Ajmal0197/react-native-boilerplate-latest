import type { RootStackParamList } from './types';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LanguageSelectScreen } from '@features/settings';
import { useAuthStore } from '@store/zustand/useAuthStore';
import { AppNavigator } from './AppNavigator';
import { AuthNavigator } from './AuthNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
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
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }}
      />
    </Stack.Navigator>
  );
};
