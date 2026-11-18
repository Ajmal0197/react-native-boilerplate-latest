import axios, {
  AxiosError,
  AxiosHeaders,
  type AxiosAdapter,
  type InternalAxiosRequestConfig,
} from 'axios';
import { apiClient } from '@api/client';
import { STORAGE_KEYS } from '@config/constants';
import { storage } from '@services/storage';
import { useAuthStore } from '@store/zustand/useAuthStore';

const response = (config: InternalAxiosRequestConfig, status: number) => ({
  data: { ok: status === 200 },
  status,
  statusText: String(status),
  headers: {},
  config,
});

/**
 * Adapter that returns 401 for any token other than `validToken`.
 */
const createAdapter =
  (validToken: string): AxiosAdapter =>
  async config => {
    const auth = (config.headers as AxiosHeaders).get('Authorization');
    if (auth === `Bearer ${validToken}`) {
      return response(config, 200);
    }
    throw new AxiosError(
      'Unauthorized',
      'ERR_BAD_REQUEST',
      config,
      null,
      response(config, 401),
    );
  };

describe('apiClient 401 refresh flow', () => {
  const originalAdapter = apiClient.defaults.adapter;

  beforeEach(() => {
    storage.clearAll();
    useAuthStore
      .getState()
      .login(
        { id: '1', name: 'A', email: 'a@b.c' },
        'old-token',
        'refresh-token',
      );
  });

  afterEach(() => {
    apiClient.defaults.adapter = originalAdapter;
    jest.restoreAllMocks();
  });

  it('attaches the stored bearer token', async () => {
    apiClient.defaults.adapter = createAdapter('old-token');
    const res = await apiClient.get('/ping');
    expect(res.status).toBe(200);
  });

  it('refreshes once and replays concurrent 401 requests', async () => {
    apiClient.defaults.adapter = createAdapter('new-token');
    const postSpy = jest
      .spyOn(axios, 'post')
      .mockResolvedValue({ data: { token: 'new-token' } });

    const [a, b] = await Promise.all([
      apiClient.get('/a'),
      apiClient.get('/b'),
    ]);

    expect(a.status).toBe(200);
    expect(b.status).toBe(200);
    expect(postSpy).toHaveBeenCalledTimes(1);
    expect(storage.getString(STORAGE_KEYS.AUTH_TOKEN)).toBe('new-token');
    expect(useAuthStore.getState().token).toBe('new-token');
    expect(useAuthStore.getState().isAuthenticated).toBe(true);
  });

  it('logs out when the refresh request fails', async () => {
    apiClient.defaults.adapter = createAdapter('never-valid');
    jest.spyOn(axios, 'post').mockRejectedValue(new Error('refresh failed'));

    await expect(apiClient.get('/a', { silent: true })).rejects.toThrow(
      'refresh failed',
    );

    expect(useAuthStore.getState().isAuthenticated).toBe(false);
    expect(storage.getString(STORAGE_KEYS.AUTH_TOKEN)).toBeUndefined();
  });

  it('logs out when no refresh token is stored', async () => {
    apiClient.defaults.adapter = createAdapter('never-valid');
    storage.delete(STORAGE_KEYS.REFRESH_TOKEN);
    const postSpy = jest.spyOn(axios, 'post');

    await expect(apiClient.get('/a', { silent: true })).rejects.toThrow(
      'Missing refresh token',
    );

    expect(postSpy).not.toHaveBeenCalled();
    expect(useAuthStore.getState().isAuthenticated).toBe(false);
  });
});
