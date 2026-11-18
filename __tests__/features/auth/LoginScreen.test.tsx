import React from 'react';
import { authApi } from '@features/auth/api/authApi';
import { LoginScreen } from '@features/auth/screens/LoginScreen';
import { storage } from '@services/storage';
import { useAuthStore } from '@store/zustand/useAuthStore';
import { render, screen, fireEvent, waitFor } from '@test-utils';

jest.mock('@features/auth/api/authApi', () => ({
  authApi: { login: jest.fn(), register: jest.fn() },
}));

const navigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
} as never;
const route = { key: 'Login-key', name: 'Login' } as never;

const mockedLogin = authApi.login as jest.Mock;

describe('LoginScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    storage.clearAll();
    useAuthStore.getState().logout();
  });

  it('shows localized validation errors for empty submission', async () => {
    await render(<LoginScreen navigation={navigation} route={route} />);

    await fireEvent.press(screen.getByText('Sign In'));

    expect(await screen.findByText('Email is required')).toBeTruthy();
    expect(await screen.findByText('Password is required')).toBeTruthy();
    expect(mockedLogin).not.toHaveBeenCalled();
  });

  it('rejects an invalid email address', async () => {
    await render(<LoginScreen navigation={navigation} route={route} />);

    await fireEvent.changeText(
      screen.getByPlaceholderText('name@example.com'),
      'not-an-email',
    );
    await fireEvent.changeText(
      screen.getByPlaceholderText('Enter your password'),
      'secret123',
    );
    await fireEvent.press(screen.getByText('Sign In'));

    expect(
      await screen.findByText('Please enter a valid email address'),
    ).toBeTruthy();
  });

  it('logs the user in with the API response on valid submission', async () => {
    mockedLogin.mockResolvedValue({
      user: { id: '1', name: 'Demo', email: 'demo@example.com' },
      token: 'access',
      refreshToken: 'refresh',
    });
    await render(<LoginScreen navigation={navigation} route={route} />);

    await fireEvent.changeText(
      screen.getByPlaceholderText('name@example.com'),
      'demo@example.com',
    );
    await fireEvent.changeText(
      screen.getByPlaceholderText('Enter your password'),
      'secret123',
    );
    await fireEvent.press(screen.getByText('Sign In'));

    await waitFor(() => {
      expect(useAuthStore.getState().isAuthenticated).toBe(true);
    });
    expect(mockedLogin).toHaveBeenCalledWith({
      email: 'demo@example.com',
      password: 'secret123',
    });
    expect(useAuthStore.getState().token).toBe('access');
  });

  it('shows a generic error when the API call fails', async () => {
    mockedLogin.mockRejectedValue(new Error('boom'));
    await render(<LoginScreen navigation={navigation} route={route} />);

    await fireEvent.changeText(
      screen.getByPlaceholderText('name@example.com'),
      'demo@example.com',
    );
    await fireEvent.changeText(
      screen.getByPlaceholderText('Enter your password'),
      'secret123',
    );
    await fireEvent.press(screen.getByText('Sign In'));

    expect(
      await screen.findByText('Something went wrong. Please try again.'),
    ).toBeTruthy();
    expect(useAuthStore.getState().isAuthenticated).toBe(false);
  });

  it('navigates to Register', async () => {
    await render(<LoginScreen navigation={navigation} route={route} />);

    await fireEvent.press(screen.getByText('Sign Up'));

    expect(
      (navigation as { navigate: jest.Mock }).navigate,
    ).toHaveBeenCalledWith('Register');
  });
});
