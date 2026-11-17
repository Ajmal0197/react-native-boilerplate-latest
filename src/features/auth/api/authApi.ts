import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
} from '../types/auth.types';

export const authApi = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    // Simulated API response for demo
    await new Promise<void>(resolve => setTimeout(() => resolve(), 800));
    return {
      user: {
        id: 'usr_123',
        name: 'Demo User',
        email: credentials.email,
      },
      token: `jwt_mock_access_token_${Date.now()}`,
      refreshToken: `jwt_mock_refresh_token_${Date.now()}`,
    };
  },

  register: async (payload: RegisterRequest): Promise<AuthResponse> => {
    await new Promise<void>(resolve => setTimeout(() => resolve(), 1000));
    return {
      user: {
        id: `usr_${Date.now()}`,
        name: payload.name,
        email: payload.email,
      },
      token: `jwt_mock_access_token_${Date.now()}`,
      refreshToken: `jwt_mock_refresh_token_${Date.now()}`,
    };
  },
};
