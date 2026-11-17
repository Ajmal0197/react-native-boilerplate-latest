import { renderHook, act } from '@testing-library/react-native';
import { useDebounce } from '@hooks/useDebounce';

describe('useDebounce hook', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('delays updating value until delayMs passes', async () => {
    const { result, rerender } = await renderHook(
      ({ val }: { val: string }) => useDebounce(val, 300),
      {
        initialProps: { val: 'initial' },
      },
    );

    expect(result.current).toBe('initial');

    await rerender({ val: 'updated' });
    expect(result.current).toBe('initial'); // Not updated immediately

    await act(async () => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toBe('updated');
  });
});
