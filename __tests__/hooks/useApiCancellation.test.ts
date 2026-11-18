import { renderHook } from '@testing-library/react-native';
import { AppConstant } from '@config';
import { useApiCancellation } from '@hooks/useApiCancellation';

describe('useApiCancellation hook', () => {
  beforeEach(() => {
    AppConstant.reset();
  });

  it('provides an active AbortSignal on mount', async () => {
    const { result } = await renderHook(() => useApiCancellation());

    expect(result.current?.signal).toBeDefined();
    expect(result.current?.signal.aborted).toBe(false);
  });

  it('automatically aborts signal when component unmounts', async () => {
    const { result, unmount } = await renderHook(() => useApiCancellation());
    const signal = result.current?.signal;

    expect(signal?.aborted).toBe(false);

    await unmount();

    expect(signal?.aborted).toBe(true);
  });

  it('aborts when AppConstant.cancelAllRequests() is invoked', async () => {
    const { result } = await renderHook(() => useApiCancellation());
    const signal = result.current?.signal;

    expect(signal?.aborted).toBe(false);

    AppConstant.cancelAllRequests();

    expect(signal?.aborted).toBe(true);
  });

  it('allows manual aborting via abort() function', async () => {
    const { result } = await renderHook(() => useApiCancellation());
    const signal = result.current?.signal;

    expect(signal?.aborted).toBe(false);

    result.current?.abort();

    expect(signal?.aborted).toBe(true);
  });
});
