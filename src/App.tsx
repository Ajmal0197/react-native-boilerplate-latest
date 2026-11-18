import React, { useEffect, useMemo } from 'react';
import { StatusBar } from 'react-native';
import { BugBubble } from '@lokal-dev/react-native-bugbubble';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { BottomSheetProvider } from '@swmansion/react-native-bottom-sheet';
import ErrorBoundary from 'react-native-error-boundary';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { RootSiblingParent } from 'react-native-root-siblings';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RNToastMessage from 'react-native-toast-message';
import { Provider } from 'react-redux';
import {
  StatusBarStyle,
  StyleSheet,
  UnistylesRuntime,
  useUnistyles,
} from 'react-native-unistyles';

// Initialize Theme, i18n, and Storage side-effects
import './theme';
import './services/i18n';

import { ErrorFallback } from '@components/organisms/ErrorFallback';
import { toastConfig } from '@components/organisms/Toast';
import { Config } from '@config/env';
import { useIsDark } from '@hooks/useIsDark';
import { linking } from '@navigation/linking';
import { RootNavigator } from '@navigation/RootNavigator';
import { reportError } from '@services/crashReporting';
import { store } from '@store/redux/store';
import { logger } from '@utils/logger';

const handleBoundaryError = (error: Error, stackTrace: string) => {
  logger.error('Unhandled render error', error);
  reportError(error, { stackTrace });
};

export const App = () => {
  const { theme } = useUnistyles();
  const isDark = useIsDark();

  useEffect(() => {
    try {
      UnistylesRuntime.statusBar?.setStyle(
        isDark ? StatusBarStyle.Light : StatusBarStyle.Dark,
        true,
      );
      UnistylesRuntime.setRootViewBackgroundColor?.(theme.colors.background);
    } catch {
      // Graceful safeguard
    }
  }, [isDark, theme.colors.background]);

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
    <GestureHandlerRootView style={styles.root}>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onError={handleBoundaryError}
      >
        <SafeAreaProvider>
          <KeyboardProvider>
            <BottomSheetProvider>
              <RootSiblingParent>
                <Provider store={store}>
                  <NavigationContainer
                    linking={linking}
                    theme={navigationTheme}
                  >
                    <StatusBar
                      barStyle={isDark ? 'light-content' : 'dark-content'}
                      animated
                    />
                    <RootNavigator />
                  </NavigationContainer>
                </Provider>
              </RootSiblingParent>
              <RNToastMessage config={toastConfig} />
            </BottomSheetProvider>
            {Config.APP_ENV !== 'production' && <BugBubble />}
          </KeyboardProvider>
        </SafeAreaProvider>
      </ErrorBoundary>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create(theme => ({
  root: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
}));

export default App;
