/* eslint-disable no-console */
/**
 * Safe Logger
 *
 * Stripped out in production by babel-plugin-transform-remove-console,
 * but keeps error and warn for crash reporting tools.
 */
export const logger = {
  log: (...args: unknown[]) => {
    if (__DEV__) {
      console.log('[LOG]', ...args);
    }
  },
  info: (...args: unknown[]) => {
    if (__DEV__) {
      console.info('[INFO]', ...args);
    }
  },
  warn: (...args: unknown[]) => {
    console.warn('[WARN]', ...args);
  },
  error: (...args: unknown[]) => {
    console.error('[ERROR]', ...args);
  },
};
