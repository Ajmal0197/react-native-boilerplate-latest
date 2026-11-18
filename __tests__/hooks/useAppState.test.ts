import { AppState } from 'react-native';
import { renderHook, act } from '@testing-library/react-native';
import { useAppState } from '@hooks/useAppState';

describe('useAppState', () => {
  it('tracks app state changes', async () => {
    let listener: (state: string) => void = () => {};
    const remove = jest.fn();
    jest
      .spyOn(AppState, 'addEventListener')
      .mockImplementation((_event, handler) => {
        listener = handler as (state: string) => void;
        return { remove } as never;
      });

    const { result, unmount } = await renderHook(() => useAppState());
    await act(async () => {
      listener('active');
    });
    expect(result.current.isForeground).toBe(true);

    await act(async () => {
      listener('background');
    });
    expect(result.current.isBackground).toBe(true);
    expect(result.current.isForeground).toBe(false);

    await unmount();
    expect(remove).toHaveBeenCalled();
  });
});
