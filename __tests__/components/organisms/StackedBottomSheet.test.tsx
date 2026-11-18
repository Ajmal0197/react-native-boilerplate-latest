import React, { createRef } from 'react';
import {
  StackedBottomSheet,
  StackedBottomSheetRef,
} from '@components/organisms';
import { render, screen, fireEvent } from '@test-utils';

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

    // Trigger Level 2
    fireEvent.press(screen.getByTestId('btn-open-stacked-sheet-2'));

    expect(screen.getByText('Stacked Sheet (Level 2)')).toBeTruthy();
    expect(screen.getByTestId('btn-dismiss-sheet-2')).toBeTruthy();
    expect(screen.getByTestId('btn-dismiss-all-sheets')).toBeTruthy();

    // Dismiss Level 2
    fireEvent.press(screen.getByTestId('btn-dismiss-sheet-2'));

    // Dismiss All
    fireEvent.press(screen.getByTestId('btn-dismiss-all-sheets'));

    // Close Level 1
    fireEvent.press(screen.getByTestId('btn-close-sheet-1'));

    // Imperative ref methods
    ref.current?.present();
    ref.current?.dismiss();
  });
});
