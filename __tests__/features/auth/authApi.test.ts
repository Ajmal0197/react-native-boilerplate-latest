import { apiClient } from '@api/client';
import { Config } from '@config/env';
import { authApi } from '@features/auth/api/authApi';

type MutableConfig = { USE_MOCK_API: boolean };

describe('authApi', () => {
  const mutableConfig = Config as unknown as MutableConfig;
  const original = Config.USE_MOCK_API;

  afterEach(() => {
    mutableConfig.USE_MOCK_API = original;
    jest.restoreAllMocks();
    jest.useRealTimers();
  });

  it('returns a mock session when USE_MOCK_API is on', async () => {
    jest.useFakeTimers();
    mutableConfig.USE_MOCK_API = true;
    const postSpy = jest.spyOn(apiClient, 'post');

    const promise = authApi.login({ email: 'a@b.co', password: 'secret1' });
    await jest.advanceTimersByTimeAsync(1000);
    const res = await promise;

    expect(res.user.email).toBe('a@b.co');
    expect(res.token).toContain('mock_access_token_');
    expect(postSpy).not.toHaveBeenCalled();
  });

  it('calls the real login endpoint when USE_MOCK_API is off', async () => {
    mutableConfig.USE_MOCK_API = false;
    const payload = {
      user: { id: '1', name: 'N', email: 'a@b.co' },
      token: 't',
      refreshToken: 'r',
    };
    const postSpy = jest
      .spyOn(apiClient, 'post')
      .mockResolvedValue({ data: payload });

    const res = await authApi.login({ email: 'a@b.co', password: 'secret1' });

    expect(postSpy).toHaveBeenCalledWith('/auth/login', {
      email: 'a@b.co',
      password: 'secret1',
    });
    expect(res).toEqual(payload);
  });

  it('calls the real register endpoint when USE_MOCK_API is off', async () => {
    mutableConfig.USE_MOCK_API = false;
    const postSpy = jest.spyOn(apiClient, 'post').mockResolvedValue({
      data: {
        user: { id: '2', name: 'N', email: 'a@b.co' },
        token: 't',
        refreshToken: 'r',
      },
    });

    await authApi.register({
      name: 'N',
      email: 'a@b.co',
      password: 'secret1',
    });

    expect(postSpy).toHaveBeenCalledWith('/auth/register', expect.any(Object));
  });
});
