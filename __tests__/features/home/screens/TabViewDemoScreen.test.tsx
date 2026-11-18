import React from 'react';
import { Toast } from '@components/organisms/Toast';
import { TabViewDemoScreen } from '@features/home/screens/TabViewDemoScreen';
import { AppConstant } from '@services/AppConstant';
import { render, screen, fireEvent } from '@test-utils';

jest.spyOn(Toast, 'error');
jest.spyOn(Toast, 'success');
jest.spyOn(Toast, 'warning');
jest.spyOn(Toast, 'info');
jest.spyOn(AppConstant, 'cancelAllRequests');

const mockNavigation: any = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  addListener: jest.fn(() => () => {}),
  isFocused: jest.fn(() => true),
};

const mockRoute: any = {
  key: 'TabViewDemo-key',
  name: 'TabViewDemo',
};

describe('TabViewDemoScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders header, tabs, and triggers bottom sheets, toasts, and cancellation', async () => {
    await render(
      <TabViewDemoScreen navigation={mockNavigation} route={mockRoute} />,
    );

    // Header title and back button
    expect(screen.getByText('Features Lab')).toBeTruthy();
    expect(screen.getByText('‹ Back')).toBeTruthy();

    // Tab bar labels
    expect(screen.getByText('Bottom Sheets')).toBeTruthy();
    expect(screen.getByText('Toast & Network')).toBeTruthy();
    expect(screen.getByText('Architecture')).toBeTruthy();

    // Android Navigation Card
    expect(screen.getByTestId('android-nav-info-card')).toBeTruthy();
    expect(screen.getByText(/Android Soft Navigation Handling/i)).toBeTruthy();

    // Bottom sheet trigger buttons
    await fireEvent.press(screen.getByTestId('btn-trigger-stacked-sheet'));
    await fireEvent.press(screen.getByTestId('btn-trigger-keyboard-sheet'));

    await fireEvent.press(screen.getByTestId('btn-toast-network-error'));
    expect(Toast.error).toHaveBeenCalledWith(
      expect.stringContaining('Unable to connect to the server'),
      'Network Error',
    );

    await fireEvent.press(screen.getByTestId('btn-toast-server-error'));
    expect(Toast.error).toHaveBeenCalledWith(
      expect.stringContaining('Internal Server Error'),
      'Server Glitch',
    );

    await fireEvent.press(screen.getByTestId('btn-toast-success'));
    expect(Toast.success).toHaveBeenCalledWith(
      'Data synchronized with remote server.',
      'Sync Complete',
    );

    await fireEvent.press(screen.getByTestId('btn-toast-warning'));
    expect(Toast.warning).toHaveBeenCalledWith(
      'Network bandwidth is low. Image sync paused.',
      'Slow Connection',
    );

    await fireEvent.press(screen.getByTestId('btn-cancel-all-requests'));
    expect(AppConstant.cancelAllRequests).toHaveBeenCalled();
    expect(Toast.info).toHaveBeenCalledWith(
      'All in-flight requests were aborted.',
      'Requests Aborted',
    );

    // Go back navigation
    await fireEvent.press(screen.getByText('‹ Back'));
    expect(mockNavigation.goBack).toHaveBeenCalledTimes(1);
  });
});
