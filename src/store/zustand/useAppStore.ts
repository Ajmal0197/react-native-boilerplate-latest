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

const applyThemeToUnistyles = (mode: ThemeMode) => {
  try {
    if (mode === 'light' || mode === 'dark') {
      if (UnistylesRuntime.hasAdaptiveThemes) {
        UnistylesRuntime.setAdaptiveThemes(false);
      }
      UnistylesRuntime.setTheme(mode);
    } else {
      // Auto / System
      if (!UnistylesRuntime.hasAdaptiveThemes) {
        UnistylesRuntime.setAdaptiveThemes(true);
      }
    }
  } catch {
    // Graceful safeguard
  }
};

const initialTheme = getInitialTheme();
applyThemeToUnistyles(initialTheme);

export const useAppStore = create<AppState>()(
  devtools(
    set => ({
      themeMode: initialTheme,
      isFirstLaunch: !storage.getBoolean('@first_launch_done'),

      setThemeMode: (mode: ThemeMode) => {
        storage.set(STORAGE_KEYS.THEME_MODE, mode);
        applyThemeToUnistyles(mode);
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
