import { logger } from '@utils/logger';

describe('logger', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('forwards log, info, warn and error with prefixes in dev', () => {
    const log = jest.spyOn(console, 'log').mockImplementation(() => {});
    const info = jest.spyOn(console, 'info').mockImplementation(() => {});
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const error = jest.spyOn(console, 'error').mockImplementation(() => {});

    logger.log('a');
    logger.info('b');
    logger.warn('c');
    logger.error('d');

    expect(log).toHaveBeenCalledWith('[LOG]', 'a');
    expect(info).toHaveBeenCalledWith('[INFO]', 'b');
    expect(warn).toHaveBeenCalledWith('[WARN]', 'c');
    expect(error).toHaveBeenCalledWith('[ERROR]', 'd');
  });
});
