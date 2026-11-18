import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { STORAGE_KEYS } from '@config/constants';
import { AppConstant } from '@services/AppConstant';
import { setCrashReportingUser } from '@services/crashReporting';
import { storage } from '@services/storage';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User, token: string, refreshToken?: string) => void;
  setTokens: (token: string, refreshToken?: string) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
  setLoading: (isLoading: boolean) => void;
}

const getInitialUser = (): User | null => {
  return storage.getObject<User>(STORAGE_KEYS.USER_DATA);
};

const getInitialToken = (): string | null => {
  return storage.getString(STORAGE_KEYS.AUTH_TOKEN) || null;
};

const getInitialRefreshToken = (): string | null => {
  return storage.getString(STORAGE_KEYS.REFRESH_TOKEN) || null;
};

/**
 * Auth store. MMKV single-key slots (STORAGE_KEYS.*) are the only source of truth
 * for credentials; no second persisted copy is kept. For hardened token storage,
 * swap `storage` for a Keychain/Keystore-backed adapter.
 */
export const useAuthStore = create<AuthState>()(
  devtools(
    (set, get) => ({
      user: getInitialUser(),
      token: getInitialToken(),
      refreshToken: getInitialRefreshToken(),
      isAuthenticated: Boolean(getInitialToken()),
      isLoading: false,

      login: (user: User, token: string, refreshToken?: string) => {
        storage.setObject(STORAGE_KEYS.USER_DATA, user);
        storage.set(STORAGE_KEYS.AUTH_TOKEN, token);
        if (refreshToken) {
          storage.set(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
        }
        setCrashReportingUser(user.id);
        set({
          user,
          token,
          refreshToken: refreshToken ?? null,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      setTokens: (token: string, refreshToken?: string) => {
        storage.set(STORAGE_KEYS.AUTH_TOKEN, token);
        if (refreshToken) {
          storage.set(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
        }
        set(state => ({
          token,
          refreshToken: refreshToken ?? state.refreshToken,
          isAuthenticated: true,
        }));
      },

      logout: () => {
        AppConstant.reset();
        setCrashReportingUser(null);
        storage.delete(STORAGE_KEYS.USER_DATA);
        storage.delete(STORAGE_KEYS.AUTH_TOKEN);
        storage.delete(STORAGE_KEYS.REFRESH_TOKEN);
        set({
          user: null,
          token: null,
          refreshToken: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },

      updateUser: (updates: Partial<User>) => {
        const current = get().user;
        if (!current) return;
        const updated = { ...current, ...updates };
        storage.setObject(STORAGE_KEYS.USER_DATA, updated);
        set({ user: updated });
      },

      setLoading: (isLoading: boolean) => {
        set({ isLoading });
      },
    }),
    { name: 'AuthStore' },
  ),
);
