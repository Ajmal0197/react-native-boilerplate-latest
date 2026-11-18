import React from 'react';
import RNToast from 'react-native-toast-message';
import {
  Toast,
  CustomToastCard,
  toastConfig,
} from '@components/organisms/Toast';
import { AppConstant } from '@config/AppConstant';
import { render, screen, fireEvent } from '@test-utils';

describe('Toast and CustomToastCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    AppConstant.reset();
  });

  describe('CustomToastCard', () => {
    it('renders error toast card with default title and message', async () => {
      const onHide = jest.fn();
      await render(
        <CustomToastCard
          type="error"
          text1="Connection Error"
          text2="Server request failed"
          onHide={onHide}
        />,
      );

      expect(screen.getByText('Connection Error')).toBeTruthy();
      expect(screen.getByText('Server request failed')).toBeTruthy();
      expect(screen.getByTestId('toast-container-error')).toBeTruthy();
      expect(screen.getByTestId('toast-card-wrapper')).toBeTruthy();
    });

    it('renders success toast card with custom title', async () => {
      const onHide = jest.fn();
      await render(
        <CustomToastCard
          type="success"
          text1="Saved"
          text2="Profile updated successfully"
          onHide={onHide}
        />,
      );

      expect(screen.getByText('Saved')).toBeTruthy();
      expect(screen.getByText('Profile updated successfully')).toBeTruthy();
      expect(screen.getByTestId('toast-container-success')).toBeTruthy();
    });

    it('renders warning and info types correctly', async () => {
      const onHide = jest.fn();
      const { rerender } = await render(
        <CustomToastCard
          type="warning"
          text1="Warning"
          text2="Low memory"
          onHide={onHide}
        />,
      );
      expect(screen.getByTestId('toast-container-warning')).toBeTruthy();

      await rerender(
        <CustomToastCard
          type="info"
          text1="Notice"
          text2="New version available"
          onHide={onHide}
        />,
      );
      expect(screen.getByTestId('toast-container-info')).toBeTruthy();
    });

    it('triggers onHide when close button is pressed', async () => {
      const onHide = jest.fn();
      await render(
        <CustomToastCard
          type="error"
          text2="Tap close button"
          onHide={onHide}
        />,
      );

      fireEvent.press(screen.getByTestId('toast-close-button'));
      expect(onHide).toHaveBeenCalledTimes(1);
    });

    it('triggers onPress or onHide when card body is pressed', async () => {
      const onPress = jest.fn();
      await render(
        <CustomToastCard
          type="info"
          text2="Tap card body"
          onPress={onPress}
        />,
      );

      fireEvent.press(screen.getByTestId('toast-card'));
      expect(onPress).toHaveBeenCalledTimes(1);
    });
  });

  describe('Toast Static Class Controller', () => {
    it('calls RNToast.show with bottom position and safe bottomOffset', () => {
      Toast.show({
        type: 'error',
        title: 'Network Error',
        message: 'Could not connect',
      });

      expect(RNToast.show).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error',
          text1: 'Network Error',
          text2: 'Could not connect',
          position: 'bottom',
          bottomOffset: expect.any(Number),
          autoHide: true,
        }),
      );
    });

    it('provides static helper methods for error, success, warning, info', () => {
      Toast.error('Network down', 'Connection Lost');
      expect(RNToast.show).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error',
          text1: 'Connection Lost',
          text2: 'Network down',
          position: 'bottom',
        }),
      );

      Toast.success('Saved successfully');
      expect(RNToast.show).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'success',
          text1: 'Success',
          text2: 'Saved successfully',
          position: 'bottom',
        }),
      );

      Toast.warning('Check battery level');
      expect(RNToast.show).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'warning',
          text1: 'Warning',
          text2: 'Check battery level',
          position: 'bottom',
        }),
      );

      Toast.info('Version 2.0 active');
      expect(RNToast.show).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'info',
          text1: 'Information',
          text2: 'Version 2.0 active',
          position: 'bottom',
        }),
      );
    });

    it('calls RNToast.hide on Toast.hide()', () => {
      Toast.hide();
      expect(RNToast.hide).toHaveBeenCalled();
    });

    it('integrates with AppConstant showToast, showErrorToast, and hideToast', () => {
      AppConstant.showErrorToast('Airplane mode enabled');
      expect(RNToast.show).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error',
          text2: 'Airplane mode enabled',
        }),
      );

      AppConstant.hideToast();
      expect(RNToast.hide).toHaveBeenCalled();

      AppConstant.showToast({
        type: 'success',
        message: 'Sync OK',
      });
      expect(RNToast.show).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'success',
          text2: 'Sync OK',
        }),
      );

      AppConstant.reset();
      expect(RNToast.hide).toHaveBeenCalled();
    });
  });

  describe('toastConfig renderers', () => {
    it('provides valid renderer components for all types', async () => {
      expect(toastConfig.error).toBeDefined();
      expect(toastConfig.success).toBeDefined();
      expect(toastConfig.warning).toBeDefined();
      expect(toastConfig.info).toBeDefined();

      const hideMock = jest.fn();
      await render(
        toastConfig.error({
          text1: 'Config Error',
          text2: 'Failed',
          hide: hideMock,
        } as any) as React.ReactElement,
      );

      expect(screen.getByText('Config Error')).toBeTruthy();
      expect(screen.getByText('Failed')).toBeTruthy();
    });
  });
});
