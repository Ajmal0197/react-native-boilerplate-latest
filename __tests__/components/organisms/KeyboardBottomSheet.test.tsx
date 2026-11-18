import React, { createRef } from 'react';
import { Keyboard } from 'react-native';
import { useKeyboardState } from 'react-native-keyboard-controller';
import {
  KeyboardBottomSheet,
  KeyboardBottomSheetRef,
} from '@components/organisms';
import { Toast } from '@components/organisms/Toast';
import { render, screen, fireEvent, act } from '@test-utils';

jest.spyOn(Toast, 'success');

describe('KeyboardBottomSheet', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('hides keyboard and keeps sheet open when backdrop pressed while keyboard is visible', async () => {
    const dismissSpy = jest.spyOn(Keyboard, 'dismiss');
    (useKeyboardState as jest.Mock).mockImplementation((selector: any) =>
      selector
        ? selector({ isVisible: true, height: 320, appearance: 'light' })
        : { isVisible: true, height: 320, appearance: 'light' },
    );

    const ref = createRef<KeyboardBottomSheetRef>();
    await render(<KeyboardBottomSheet ref={ref} />);

    await act(async () => {
      ref.current?.present();
    });
    expect(screen.getByTestId('mock-modal-bottom-sheet').props.index).toBe(1);

    await act(async () => {
      screen.getByTestId('mock-modal-bottom-sheet').props.onCloseRequest();
    });

    expect(dismissSpy).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('mock-modal-bottom-sheet').props.index).toBe(1);
  });

  it('closes bottom sheet when backdrop pressed while keyboard is NOT visible', async () => {
    const dismissSpy = jest.spyOn(Keyboard, 'dismiss');
    (useKeyboardState as jest.Mock).mockImplementation((selector: any) =>
      selector
        ? selector({ isVisible: false, height: 0, appearance: 'light' })
        : { isVisible: false, height: 0, appearance: 'light' },
    );

    const ref = createRef<KeyboardBottomSheetRef>();
    await render(<KeyboardBottomSheet ref={ref} />);

    await act(async () => {
      ref.current?.present();
    });
    expect(screen.getByTestId('mock-modal-bottom-sheet').props.index).toBe(1);

    await act(async () => {
      screen.getByTestId('mock-modal-bottom-sheet').props.onCloseRequest();
    });

    expect(dismissSpy).not.toHaveBeenCalled();
    expect(screen.getByTestId('mock-modal-bottom-sheet').props.index).toBe(0);
  });

  it('renders inputs, handles cancel, and submits feedback with Toast', async () => {
    (useKeyboardState as jest.Mock).mockImplementation((selector: any) =>
      selector
        ? selector({ isVisible: false, height: 0, appearance: 'light' })
        : { isVisible: false, height: 0, appearance: 'light' },
    );

    const ref = createRef<KeyboardBottomSheetRef>();
    await render(<KeyboardBottomSheet ref={ref} />);

    expect(screen.getByText('Keyboard-Handled Sheet')).toBeTruthy();
    expect(screen.getByTestId('sheet-input-subject')).toBeTruthy();
    expect(screen.getByTestId('sheet-input-comments')).toBeTruthy();
    expect(screen.getByTestId('btn-sheet-cancel')).toBeTruthy();

    await fireEvent.press(screen.getByTestId('btn-sheet-cancel'));

    await fireEvent.changeText(
      screen.getByTestId('sheet-input-subject'),
      'Feature Request',
    );
    await fireEvent.changeText(
      screen.getByTestId('sheet-input-comments'),
      'Add dark mode toggle to header',
    );

    await fireEvent.press(screen.getByTestId('btn-sheet-submit'));

    expect(Toast.success).toHaveBeenCalledWith(
      'Saved: Feature Request',
      'Submission Received',
    );

    await act(async () => {
      ref.current?.present();
      ref.current?.dismiss();
    });
  });
});
