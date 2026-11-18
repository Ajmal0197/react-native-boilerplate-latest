import {
  reportError,
  setCrashReporter,
  setCrashReportingUser,
} from '@services/crashReporting';

describe('crashReporting', () => {
  afterEach(() => {
    setCrashReporter(null);
  });

  it('is a safe no-op without a reporter', () => {
    expect(() => reportError(new Error('x'))).not.toThrow();
    expect(() => setCrashReportingUser('1')).not.toThrow();
  });

  it('forwards errors and context to the registered reporter', () => {
    const captureException = jest.fn();
    setCrashReporter({ captureException });

    const error = new Error('boom');
    reportError(error, { screen: 'Home' });

    expect(captureException).toHaveBeenCalledWith(error, { screen: 'Home' });
  });

  it('wraps non-Error values', () => {
    const captureException = jest.fn();
    setCrashReporter({ captureException });

    reportError('plain string');

    const [captured] = captureException.mock.calls[0];
    expect(captured).toBeInstanceOf(Error);
    expect(captured.message).toBe('plain string');
  });

  it('never throws when the reporter fails', () => {
    setCrashReporter({
      captureException: () => {
        throw new Error('reporter down');
      },
      setUser: () => {
        throw new Error('reporter down');
      },
    });

    expect(() => reportError(new Error('x'))).not.toThrow();
    expect(() => setCrashReportingUser(null)).not.toThrow();
  });

  it('forwards the user id', () => {
    const setUser = jest.fn();
    setCrashReporter({ captureException: jest.fn(), setUser });

    setCrashReportingUser('u1');

    expect(setUser).toHaveBeenCalledWith('u1');
  });
});
