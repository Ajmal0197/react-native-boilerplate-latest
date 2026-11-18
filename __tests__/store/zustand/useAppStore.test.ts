import { UnistylesRuntime } from 'react-native-unistyles';
import { STORAGE_KEYS } from '@config/constants';
import { storage } from '@services/storage';
import { useAppStore } from '@store/zustand/useAppStore';

describe('useAppStore', () => {
  beforeEach(() => {
    storage.clearAll();
  });

  it('initializes with default light theme', () => {
    const { themeMode, isFirstLaunch } = useAppStore.getState();
    expect(themeMode).toBe('light');
    expect(typeof isFirstLaunch).toBe('boolean');
  });

  it('updates theme to dark and persists to storage', () => {
    const setThemeSpy = jest.spyOn(UnistylesRuntime, 'setTheme');
    useAppStore.getState().setThemeMode('dark');
    expect(storage.getString(STORAGE_KEYS.THEME_MODE)).toBe('dark');
    expect(useAppStore.getState().themeMode).toBe('dark');
    expect(setThemeSpy).toHaveBeenCalledWith('dark');
  });

  it('updates theme to auto and enables adaptive themes', () => {
    const setAdaptiveSpy = jest.spyOn(UnistylesRuntime, 'setAdaptiveThemes');
    useAppStore.getState().setThemeMode('auto');
    expect(storage.getString(STORAGE_KEYS.THEME_MODE)).toBe('auto');
    expect(useAppStore.getState().themeMode).toBe('auto');
    expect(setAdaptiveSpy).toHaveBeenCalledWith(true);
  });

  it('safely disables adaptive themes when switching from auto back to light without error', () => {
    const setAdaptiveSpy = jest.spyOn(UnistylesRuntime, 'setAdaptiveThemes');
    const setThemeSpy = jest.spyOn(UnistylesRuntime, 'setTheme');

    // 1. Set to auto
    useAppStore.getState().setThemeMode('auto');
    expect(setAdaptiveSpy).toHaveBeenCalledWith(true);

    // 2. Set to light
    expect(() => {
      useAppStore.getState().setThemeMode('light');
    }).not.toThrow();

    expect(setThemeSpy).toHaveBeenCalledWith('light');
    expect(useAppStore.getState().themeMode).toBe('light');
  });

  it('marks first launch as complete', () => {
    useAppStore.getState().setFirstLaunchComplete();
    expect(storage.getBoolean(STORAGE_KEYS.FIRST_LAUNCH_DONE)).toBe(true);
    expect(useAppStore.getState().isFirstLaunch).toBe(false);
  });
});
