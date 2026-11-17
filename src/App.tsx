import React, { useMemo } from 'react';
import { StatusBar } from 'react-native';
import { BugBubble } from '@lokal-dev/react-native-bugbubble';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import ErrorBoundary from 'react-native-error-boundary';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { useUnistyles } from 'react-native-unistyles';

// Initialize Theme, i18n, and Storage side-effects
import './theme';
import './services/i18n';

import { ErrorFallback } from './components/organisms/ErrorFallback';
import { linking } from './navigation/linking';
import { RootNavigator } from './navigation/RootNavigator';
import { store } from './store/redux/store';
import { useAppStore } from './store/zustand/useAppStore';

export const App = () => {
  const themeMode = useAppStore(state => state.themeMode);
  const { theme } = useUnistyles();
  const isDark = themeMode === 'dark';

  const navigationTheme = useMemo(() => {
    const baseTheme = isDark ? DarkTheme : DefaultTheme;
    return {
      ...baseTheme,
      dark: isDark,
      colors: {
        ...baseTheme.colors,
        primary: theme.colors.primary,
        background: theme.colors.background,
        card: theme.colors.surface,
        text: theme.colors.text,
        border: theme.colors.border,
        notification: theme.colors.error,
      },
    };
  }, [isDark, theme]);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Provider store={store}>
        <SafeAreaProvider>
          <KeyboardProvider>
            <NavigationContainer linking={linking} theme={navigationTheme}>
              <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
              <RootNavigator />
            </NavigationContainer>
          </KeyboardProvider>
        </SafeAreaProvider>
      </Provider>
      {__DEV__ && <BugBubble />}
    </ErrorBoundary>
  );
};

export default App;
