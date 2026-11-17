import React, { ReactElement } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { render, RenderOptions } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { createTestStore, AppStore } from '../src/store/redux/store';

// Initialize theme and i18n
import '../src/theme';
import '../src/services/i18n';

export interface ExtendedRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  store?: AppStore;
}

const customRender = (ui: ReactElement, options?: ExtendedRenderOptions) => {
  const currentStore = options?.store || createTestStore();
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <Provider store={currentStore}>
      <SafeAreaProvider
        initialMetrics={{
          frame: { x: 0, y: 0, width: 390, height: 844 },
          insets: { top: 47, left: 0, right: 0, bottom: 34 },
        }}
      >
        <NavigationContainer>{children}</NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );

  return render(ui, { wrapper: Wrapper, ...options });
};

export * from '@testing-library/react-native';
export { customRender as render };
