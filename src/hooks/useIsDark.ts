import { useColorScheme } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';
import { useAppStore } from '@store/zustand/useAppStore';

/**
 * Resolves whether the UI is currently rendered in dark mode.
 *
 * Honors an explicit user choice ('light' | 'dark') and falls back to the
 * system color scheme (or the active Unistyles theme) for 'auto'.
 */
export const useIsDark = (): boolean => {
  const themeMode = useAppStore(state => state.themeMode);
  const systemColorScheme = useColorScheme();
  const { rt } = useUnistyles();

  if (themeMode === 'dark') return true;
  if (themeMode === 'light') return false;
  return systemColorScheme === 'dark' || rt.themeName === 'dark';
};
