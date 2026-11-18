import React from 'react';
import { Alert } from 'react-native';
import { NotificationsScreen } from '@features/notifications/screens/NotificationsScreen';
import * as service from '@features/notifications/services/notificationService';
import { render, screen, fireEvent } from '@test-utils';

jest.mock('@features/notifications/services/notificationService', () => ({
  triggerInstantNotification: jest.fn(),
  triggerScheduledNotification: jest.fn(),
}));

const navigation = { navigate: jest.fn() } as never;
const route = { key: 'Notifications-key', name: 'Notifications' } as never;

describe('NotificationsScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('triggers an instant notification', async () => {
    (service.triggerInstantNotification as jest.Mock).mockResolvedValue('id');
    await render(<NotificationsScreen navigation={navigation} route={route} />);

    await fireEvent.press(screen.getByText('Trigger Instant Notification'));

    expect(service.triggerInstantNotification).toHaveBeenCalledTimes(1);
  });

  it('shows scheduled status after scheduling', async () => {
    (service.triggerScheduledNotification as jest.Mock).mockResolvedValue('id');
    await render(<NotificationsScreen navigation={navigation} route={route} />);

    await fireEvent.press(screen.getByText('Schedule Notification (5s)'));

    expect(
      await screen.findByText(
        'Notification scheduled! Expect it in 5 seconds...',
      ),
    ).toBeTruthy();
  });

  it('alerts when permission is denied', async () => {
    const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation(() => {});
    (service.triggerInstantNotification as jest.Mock).mockRejectedValue(
      new Error('denied'),
    );
    await render(<NotificationsScreen navigation={navigation} route={route} />);

    await fireEvent.press(screen.getByText('Trigger Instant Notification'));

    await screen.findByText('Trigger Instant Notification');
    expect(alertSpy).toHaveBeenCalledWith(
      'Permission needed',
      'Please enable notifications in device settings.',
    );
    alertSpy.mockRestore();
  });
});
