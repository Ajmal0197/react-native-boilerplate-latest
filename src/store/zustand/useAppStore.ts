import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { StatusBarStyle, UnistylesRuntime } from 'react-native-unistyles';
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
      UnistylesRuntime.statusBar?.setStyle(
        mode === 'dark' ? StatusBarStyle.Light : StatusBarStyle.Dark,
        true,
      );
    } else {
      // Auto / System
      if (!UnistylesRuntime.hasAdaptiveThemes) {
        UnistylesRuntime.setAdaptiveThemes(true);
      }
      const isSystemDark =
        UnistylesRuntime.colorScheme === 'dark' ||
        UnistylesRuntime.themeName === 'dark';
      UnistylesRuntime.statusBar?.setStyle(
        isSystemDark ? StatusBarStyle.Light : StatusBarStyle.Dark,
        true,
      );
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
      isFirstLaunch: !storage.getBoolean(STORAGE_KEYS.FIRST_LAUNCH_DONE),

      setThemeMode: (mode: ThemeMode) => {
        storage.set(STORAGE_KEYS.THEME_MODE, mode);
        applyThemeToUnistyles(mode);
        set({ themeMode: mode });
      },

      setFirstLaunchComplete: () => {
        storage.setBoolean(STORAGE_KEYS.FIRST_LAUNCH_DONE, true);
        set({ isFirstLaunch: false });
      },
    }),
    { name: 'AppStore' },
  ),
);
