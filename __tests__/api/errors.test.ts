import axios, { AxiosError, AxiosHeaders } from 'axios';
import { normalizeApiError } from '@api/errors';

describe('normalizeApiError', () => {
  it('identifies cancelled requests', () => {
    const cancelError = new axios.CanceledError('Request aborted');
    const result = normalizeApiError(cancelError);

    expect(result.isCanceled).toBe(true);
    expect(result.isNetworkError).toBe(false);
    expect(result.message).toBe('Request was cancelled');
  });

  it('identifies network offline errors (no response)', () => {
    const networkError = new AxiosError(
      'Network Error',
      'ERR_NETWORK',
      { headers: new AxiosHeaders() },
      {},
      undefined,
    );
    const result = normalizeApiError(networkError);

    expect(result.isNetworkError).toBe(true);
    expect(result.isTimeout).toBe(false);
    expect(result.isCanceled).toBe(false);
    expect(result.message).toContain('Unable to connect to the server');
  });

  it('identifies timeout errors', () => {
    const timeoutError = new AxiosError(
      'timeout of 10000ms exceeded',
      'ECONNABORTED',
      { headers: new AxiosHeaders() },
      {},
      undefined,
    );
    const result = normalizeApiError(timeoutError);

    expect(result.isTimeout).toBe(true);
    expect(result.isNetworkError).toBe(true);
    expect(result.statusCode).toBe(408);
    expect(result.message).toContain('Request timed out');
  });

  it('extracts custom backend error message if provided', () => {
    const apiError = new AxiosError(
      'Bad Request',
      'ERR_BAD_REQUEST',
      { headers: new AxiosHeaders() },
      {},
      {
        status: 400,
        statusText: 'Bad Request',
        data: { message: 'Email is already registered' },
        headers: {},
        config: { headers: new AxiosHeaders() },
      },
    );
    const result = normalizeApiError(apiError);

    expect(result.message).toBe('Email is already registered');
    expect(result.statusCode).toBe(400);
    expect(result.isNetworkError).toBe(false);
  });

  it('maps HTTP 401, 403, 404, 429, 500 status codes to user-friendly messages', () => {
    const createErrorWithStatus = (status: number) =>
      new AxiosError(
        `Error ${status}`,
        undefined,
        { headers: new AxiosHeaders() },
        {},
        {
          status,
          statusText: 'Error',
          data: {},
          headers: {},
          config: { headers: new AxiosHeaders() },
        },
      );

    expect(normalizeApiError(createErrorWithStatus(401)).message).toContain(
      'Session expired',
    );
    expect(normalizeApiError(createErrorWithStatus(403)).message).toContain(
      'Access denied',
    );
    expect(normalizeApiError(createErrorWithStatus(404)).message).toContain(
      'not found',
    );
    expect(normalizeApiError(createErrorWithStatus(429)).message).toContain(
      'Too many requests',
    );
    expect(normalizeApiError(createErrorWithStatus(500)).message).toContain(
      'Server is temporarily unavailable',
    );
  });

  it('handles standard JavaScript Error instances', () => {
    const standardError = new Error('Custom JS runtime failure');
    const result = normalizeApiError(standardError);

    expect(result.message).toBe('Custom JS runtime failure');
    expect(result.isNetworkError).toBe(false);
  });

  it('handles unknown error types safely', () => {
    const result = normalizeApiError('Something random string');
    expect(result.message).toContain('An unexpected error occurred');
  });
});
