import React, { createRef } from 'react';
import {
  StackedBottomSheet,
  StackedBottomSheetRef,
} from '@components/organisms';
import { render, screen, fireEvent, act } from '@test-utils';

describe('StackedBottomSheet', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders Level 1 modal sheet, triggers Level 2 stacked sheet, and dismisses', async () => {
    const ref = createRef<StackedBottomSheetRef>();
    await render(<StackedBottomSheet ref={ref} />);

    expect(screen.getByText('Modal Sheet (Level 1)')).toBeTruthy();
    expect(screen.getByTestId('btn-open-stacked-sheet-2')).toBeTruthy();
    expect(screen.getByTestId('btn-close-sheet-1')).toBeTruthy();

    await fireEvent.press(screen.getByTestId('btn-open-stacked-sheet-2'));

    expect(screen.getByText('Stacked Sheet (Level 2)')).toBeTruthy();
    expect(screen.getByTestId('btn-dismiss-sheet-2')).toBeTruthy();
    expect(screen.getByTestId('btn-dismiss-all-sheets')).toBeTruthy();

    await fireEvent.press(screen.getByTestId('btn-dismiss-sheet-2'));
    await fireEvent.press(screen.getByTestId('btn-dismiss-all-sheets'));
    await fireEvent.press(screen.getByTestId('btn-close-sheet-1'));

    await act(async () => {
      ref.current?.present();
      ref.current?.dismiss();
    });
  });
});
