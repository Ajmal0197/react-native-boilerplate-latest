import { STORAGE_KEYS } from '@app/config/constants';
import { storage } from '@services/storage';
import { useAuthStore, User } from '@store/zustand/useAuthStore';

describe('useAuthStore (MMKV Persisted)', () => {
  const mockUser: User = {
    id: 'user-123',
    name: 'Alex Johnson',
    email: 'alex@example.com',
  };

  beforeEach(() => {
    useAuthStore.getState().logout();
    storage.clearAll();
  });

  it('starts in unauthenticated state when storage is empty', () => {
    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.refreshToken).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(state.isLoading).toBe(false);
  });

  it('persists credentials to MMKV upon login', () => {
    const token = 'jwt.test.token';
    const refreshToken = 'jwt.refresh.token';

    useAuthStore.getState().login(mockUser, token, refreshToken);

    const state = useAuthStore.getState();
    expect(state.user).toEqual(mockUser);
    expect(state.token).toBe(token);
    expect(state.refreshToken).toBe(refreshToken);
    expect(state.isAuthenticated).toBe(true);

    // Verify MMKV single-key slots for axios / native compatibility
    expect(storage.getString(STORAGE_KEYS.AUTH_TOKEN)).toBe(token);
    expect(storage.getString(STORAGE_KEYS.REFRESH_TOKEN)).toBe(refreshToken);
    expect(storage.getObject<User>(STORAGE_KEYS.USER_DATA)).toEqual(mockUser);

    // Verify Zustand persist storage container
    const persistedRaw = storage.getString('auth-storage');
    expect(persistedRaw).toBeDefined();
    const persisted = JSON.parse(persistedRaw || '{}');
    expect(persisted.state.token).toBe(token);
    expect(persisted.state.user).toEqual(mockUser);
    expect(persisted.state.isAuthenticated).toBe(true);
  });

  it('wipes credentials from MMKV upon logout', () => {
    useAuthStore.getState().login(mockUser, 'test-token', 'refresh-token');
    useAuthStore.getState().logout();

    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.refreshToken).toBeNull();
    expect(state.isAuthenticated).toBe(false);

    // Verify legacy slots wiped
    expect(storage.getString(STORAGE_KEYS.AUTH_TOKEN)).toBeUndefined();
    expect(storage.getString(STORAGE_KEYS.REFRESH_TOKEN)).toBeUndefined();
    expect(storage.getObject(STORAGE_KEYS.USER_DATA)).toBeNull();

    // Verify persisted state reflects unauthenticated status
    const persistedRaw = storage.getString('auth-storage');
    const persisted = JSON.parse(persistedRaw || '{}');
    expect(persisted.state.token).toBeNull();
    expect(persisted.state.isAuthenticated).toBe(false);
  });

  it('updates user data and persists changes to MMKV', () => {
    useAuthStore.getState().login(mockUser, 'test-token');
    useAuthStore.getState().updateUser({ name: 'Alexander J.' });

    const state = useAuthStore.getState();
    expect(state.user?.name).toBe('Alexander J.');
    expect(state.user?.email).toBe(mockUser.email);

    // Verify MMKV updated
    const savedUser = storage.getObject<User>(STORAGE_KEYS.USER_DATA);
    expect(savedUser?.name).toBe('Alexander J.');

    const persistedRaw = storage.getString('auth-storage');
    const persisted = JSON.parse(persistedRaw || '{}');
    expect(persisted.state.user.name).toBe('Alexander J.');
  });

  it('updates and persists isLoading state', () => {
    useAuthStore.getState().setLoading(true);

    expect(useAuthStore.getState().isLoading).toBe(true);

    const persistedRaw = storage.getString('auth-storage');
    const persisted = JSON.parse(persistedRaw || '{}');
    expect(persisted.state.isLoading).toBe(true);
  });
});
