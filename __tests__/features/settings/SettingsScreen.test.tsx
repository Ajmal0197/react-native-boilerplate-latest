import React from 'react';
import { SettingsScreen } from '@features/settings/screens/SettingsScreen';
import { storage } from '@services/storage';
import { useAppStore } from '@store/zustand/useAppStore';
import { useAuthStore } from '@store/zustand/useAuthStore';
import { render, screen, fireEvent } from '@test-utils';

const navigation = { navigate: jest.fn(), goBack: jest.fn() } as never;
const route = { key: 'Settings-key', name: 'Settings' } as never;

describe('SettingsScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    storage.clearAll();
    useAppStore.getState().setThemeMode('light');
    useAuthStore
      .getState()
      .login({ id: '1', name: 'Jane Doe', email: 'jane@example.com' }, 't');
  });

  it('renders the signed-in user and current theme', async () => {
    await render(<SettingsScreen navigation={navigation} route={route} />);

    expect(screen.getByText('Jane Doe')).toBeTruthy();
    expect(screen.getByText('jane@example.com')).toBeTruthy();
    expect(screen.getByText('Current: LIGHT')).toBeTruthy();
  });

  it('cycles the theme mode light -> dark -> auto -> light', async () => {
    await render(<SettingsScreen navigation={navigation} route={route} />);

    await fireEvent.press(screen.getByText('Toggle'));
    expect(useAppStore.getState().themeMode).toBe('dark');

    await fireEvent.press(screen.getByText('Toggle'));
    expect(useAppStore.getState().themeMode).toBe('auto');

    await fireEvent.press(screen.getByText('Toggle'));
    expect(useAppStore.getState().themeMode).toBe('light');
  });

  it('navigates to language selection', async () => {
    await render(<SettingsScreen navigation={navigation} route={route} />);

    await fireEvent.press(screen.getByText('Language'));

    expect(
      (navigation as { navigate: jest.Mock }).navigate,
    ).toHaveBeenCalledWith('LanguageSelect');
  });

  it('shows the TurboModule battery level in the Fabric view row', async () => {
    await render(<SettingsScreen navigation={navigation} route={route} />);

    expect(await screen.findByText('85%')).toBeTruthy();
    expect(screen.getByTestId('settings-battery-view')).toBeTruthy();
  });

  it('logs the user out', async () => {
    await render(<SettingsScreen navigation={navigation} route={route} />);

    await fireEvent.press(screen.getByText('Log Out'));

    expect(useAuthStore.getState().isAuthenticated).toBe(false);
  });
});
