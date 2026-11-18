/**
 * Crash Reporting Abstraction
 *
 * Vendor-neutral facade so the app never imports Sentry / Crashlytics directly.
 * Register an adapter once at startup, e.g.:
 *
 * ```ts
 * setCrashReporter({
 *   captureException: (error, context) => Sentry.captureException(error, { extra: context }),
 *   setUser: id => Sentry.setUser(id ? { id } : null),
 * });
 * ```
 *
 * Until a reporter is registered every call is a safe no-op.
 */
export interface CrashReporter {
  captureException: (error: Error, context?: Record<string, unknown>) => void;
  setUser?: (userId: string | null) => void;
}

let activeReporter: CrashReporter | null = null;

export const setCrashReporter = (reporter: CrashReporter | null): void => {
  activeReporter = reporter;
};

const toError = (error: unknown): Error =>
  error instanceof Error ? error : new Error(String(error));

/**
 * Report a handled or unhandled error. Never throws.
 */
export const reportError = (
  error: unknown,
  context?: Record<string, unknown>,
): void => {
  try {
    activeReporter?.captureException(toError(error), context);
  } catch {
    // Reporting must never crash the app
  }
};

/**
 * Associate subsequent reports with a user (pass null on logout).
 */
export const setCrashReportingUser = (userId: string | null): void => {
  try {
    activeReporter?.setUser?.(userId);
  } catch {
    // Reporting must never crash the app
  }
};
