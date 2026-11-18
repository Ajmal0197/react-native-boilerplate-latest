import React from 'react';
import { authApi } from '@features/auth/api/authApi';
import { RegisterScreen } from '@features/auth/screens/RegisterScreen';
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
const route = { key: 'Register-key', name: 'Register' } as never;

const mockedRegister = authApi.register as jest.Mock;

describe('RegisterScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    storage.clearAll();
    useAuthStore.getState().logout();
  });

  const fillForm = async (confirm: string) => {
    await fireEvent.changeText(screen.getByPlaceholderText('Jane Doe'), 'Jane');
    await fireEvent.changeText(
      screen.getByPlaceholderText('name@example.com'),
      'jane@example.com',
    );
    await fireEvent.changeText(
      screen.getByPlaceholderText('Choose a strong password'),
      'password123',
    );
    await fireEvent.changeText(
      screen.getByPlaceholderText('Re-enter your password'),
      confirm,
    );
  };

  it('requires all fields', async () => {
    await render(<RegisterScreen navigation={navigation} route={route} />);

    await fireEvent.press(screen.getByText('Register'));

    expect(await screen.findByText('Full name is required')).toBeTruthy();
    expect(await screen.findByText('Email is required')).toBeTruthy();
    expect(mockedRegister).not.toHaveBeenCalled();
  });

  it('rejects mismatching passwords', async () => {
    await render(<RegisterScreen navigation={navigation} route={route} />);

    await fillForm('different123');
    await fireEvent.press(screen.getByText('Register'));

    expect(await screen.findByText('Passwords must match')).toBeTruthy();
    expect(mockedRegister).not.toHaveBeenCalled();
  });

  it('registers and signs the user in', async () => {
    mockedRegister.mockResolvedValue({
      user: { id: '2', name: 'Jane', email: 'jane@example.com' },
      token: 'access',
      refreshToken: 'refresh',
    });
    await render(<RegisterScreen navigation={navigation} route={route} />);

    await fillForm('password123');
    await fireEvent.press(screen.getByText('Register'));

    await waitFor(() => {
      expect(useAuthStore.getState().isAuthenticated).toBe(true);
    });
    expect(mockedRegister).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'Jane', email: 'jane@example.com' }),
    );
  });

  it('shows a generic error when registration fails', async () => {
    mockedRegister.mockRejectedValue(new Error('boom'));
    await render(<RegisterScreen navigation={navigation} route={route} />);

    await fillForm('password123');
    await fireEvent.press(screen.getByText('Register'));

    expect(
      await screen.findByText('Something went wrong. Please try again.'),
    ).toBeTruthy();
  });
});
