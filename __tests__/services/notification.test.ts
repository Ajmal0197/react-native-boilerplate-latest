import { Platform } from 'react-native';
import notifee from '@notifee/react-native';
import { notificationService } from '@services/notification';

const mockedNotifee = notifee as unknown as Record<string, jest.Mock>;

describe('notificationService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('requests permission and reports authorization', async () => {
    mockedNotifee.requestPermission.mockResolvedValueOnce({
      authorizationStatus: 0,
    });
    await expect(notificationService.requestPermission()).resolves.toBe(false);

    mockedNotifee.requestPermission.mockResolvedValueOnce({
      authorizationStatus: 1,
    });
    await expect(notificationService.requestPermission()).resolves.toBe(true);
  });

  it('creates an Android channel only on Android', async () => {
    const original = Platform.OS;
    Platform.OS = 'android';
    await notificationService.createDefaultChannel();
    expect(mockedNotifee.createChannel).toHaveBeenCalledTimes(1);

    Platform.OS = 'ios';
    await expect(notificationService.createDefaultChannel()).resolves.toBe(
      'default_channel',
    );
    expect(mockedNotifee.createChannel).toHaveBeenCalledTimes(1);
    Platform.OS = original;
  });

  it('displays an instant notification', async () => {
    await expect(
      notificationService.displayNotification('Hi', 'Body', { a: 'b' }),
    ).resolves.toBe('notification_id');
    expect(mockedNotifee.displayNotification).toHaveBeenCalledWith(
      expect.objectContaining({ title: 'Hi', body: 'Body', data: { a: 'b' } }),
    );
  });

  it('schedules a timestamp trigger notification', async () => {
    const before = Date.now();
    await notificationService.scheduleNotification('T', 'B', 5);

    const [, trigger] = mockedNotifee.createTriggerNotification.mock.calls[0];
    expect(trigger.timestamp).toBeGreaterThanOrEqual(before + 5000);
  });

  it('cancels notifications', async () => {
    await notificationService.cancelNotification('x');
    await notificationService.cancelAllNotifications();
    expect(mockedNotifee.cancelNotification).toHaveBeenCalledWith('x');
    expect(mockedNotifee.cancelAllNotifications).toHaveBeenCalledTimes(1);
  });
});
