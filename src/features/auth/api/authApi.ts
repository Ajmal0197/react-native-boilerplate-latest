import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
} from '../types/auth.types';
import { apiClient } from '@api/client';
import { API_ENDPOINTS } from '@api/endpoints';
import { Config } from '@config/env';

const wait = (ms: number) =>
  new Promise<void>(resolve => {
    setTimeout(resolve, ms);
  });

/**
 * Local mock backend used while `Config.USE_MOCK_API` is on (demo / offline dev).
 * Tokens are obviously fake and must never be accepted by a real server.
 */
const mockAuth = async (
  name: string,
  email: string,
  delayMs: number,
): Promise<AuthResponse> => {
  await wait(delayMs);
  const stamp = Date.now();
  return {
    user: { id: `usr_${stamp}`, name, email },
    token: `mock_access_token_${stamp}`,
    refreshToken: `mock_refresh_token_${stamp}`,
  };
};

export const authApi = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    if (Config.USE_MOCK_API) {
      return mockAuth('Demo User', credentials.email, 800);
    }
    const { data } = await apiClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials,
    );
    return data;
  },

  register: async (payload: RegisterRequest): Promise<AuthResponse> => {
    if (Config.USE_MOCK_API) {
      return mockAuth(payload.name, payload.email, 1000);
    }
    const { data } = await apiClient.post<AuthResponse>(
      API_ENDPOINTS.AUTH.REGISTER,
      payload,
    );
    return data;
  },
};
