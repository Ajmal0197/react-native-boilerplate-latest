import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import { STORAGE_KEYS } from '@config/constants';
import { storage, zustandStorage } from '@services/storage';

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

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
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
          set({
            user,
            token,
            refreshToken: refreshToken ?? null,
            isAuthenticated: true,
            isLoading: false,
          });
        },

        logout: () => {
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
      {
        name: 'auth-storage',
        storage: createJSONStorage(() => zustandStorage),
        partialize: state => ({
          user: state.user,
          token: state.token,
          refreshToken: state.refreshToken,
          isAuthenticated: state.isAuthenticated,
          isLoading: state.isLoading,
        }),
      },
    ),
    { name: 'AuthStore' },
  ),
);
