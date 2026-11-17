import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { UnistylesRuntime } from 'react-native-unistyles';
import { STORAGE_KEYS } from '@config/constants';
import { storage } from '@services/storage';

export type ThemeMode = 'light' | 'dark' | 'auto';

interface AppState {
  themeMode: ThemeMode;
  isFirstLaunch: boolean;
  setThemeMode: (mode: ThemeMode) => void;
  setFirstLaunchComplete: () => void;
}

const getInitialTheme = (): ThemeMode => {
  const saved = storage.getString(STORAGE_KEYS.THEME_MODE) as
    ThemeMode | undefined;
  return saved || 'light';
};

export const useAppStore = create<AppState>()(
  devtools(
    set => ({
      themeMode: getInitialTheme(),
      isFirstLaunch: !storage.getBoolean('@first_launch_done'),

      setThemeMode: (mode: ThemeMode) => {
        storage.set(STORAGE_KEYS.THEME_MODE, mode);
        if (mode === 'light' || mode === 'dark') {
          UnistylesRuntime.setTheme(mode);
        } else {
          // Auto / System
          UnistylesRuntime.setAdaptiveThemes(true);
        }
        set({ themeMode: mode });
      },

      setFirstLaunchComplete: () => {
        storage.setBoolean('@first_launch_done', true);
        set({ isFirstLaunch: false });
      },
    }),
    { name: 'AppStore' },
  ),
);
