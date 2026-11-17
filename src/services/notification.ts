import { Platform } from 'react-native';
import notifee, {
  AndroidImportance,
  TriggerType,
  TimestampTrigger,
} from '@notifee/react-native';

/**
 * Centralized Notification Service using @notifee/react-native
 *
 * Handles permissions, notification channels (Android), instant notifications,
 * and scheduled notifications with proper foreground/background handling.
 */
class NotificationService {
  private defaultChannelId = 'default_channel';

  /**
   * Request notification permission (Required for iOS and Android 13+)
   */
  async requestPermission(): Promise<boolean> {
    const settings = await notifee.requestPermission();
    return settings.authorizationStatus >= 1; // Authorized or Provisional
  }

  /**
   * Ensure default Android notification channel exists
   */
  async createDefaultChannel(): Promise<string> {
    if (Platform.OS === 'android') {
      return await notifee.createChannel({
        id: this.defaultChannelId,
        name: 'Default Notifications',
        importance: AndroidImportance.HIGH,
        sound: 'default',
        vibration: true,
      });
    }
    return this.defaultChannelId;
  }

  /**
   * Display an instant local notification
   */
  async displayNotification(
    title: string,
    body: string,
    data?: Record<string, string>,
  ): Promise<string> {
    await this.requestPermission();
    const channelId = await this.createDefaultChannel();

    return await notifee.displayNotification({
      title,
      body,
      data,
      android: {
        channelId,
        smallIcon: 'ic_launcher',
        pressAction: {
          id: 'default',
        },
      },
      ios: {
        sound: 'default',
      },
    });
  }

  /**
   * Schedule a notification after delaySeconds from now
   */
  async scheduleNotification(
    title: string,
    body: string,
    delaySeconds: number,
  ): Promise<string> {
    await this.requestPermission();
    const channelId = await this.createDefaultChannel();

    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: Date.now() + delaySeconds * 1000,
    };

    return await notifee.createTriggerNotification(
      {
        title,
        body,
        android: {
          channelId,
          smallIcon: 'ic_launcher',
          pressAction: {
            id: 'default',
          },
        },
        ios: {
          sound: 'default',
        },
      },
      trigger,
    );
  }

  /**
   * Cancel a specific notification by ID
   */
  async cancelNotification(notificationId: string): Promise<void> {
    await notifee.cancelNotification(notificationId);
  }

  /**
   * Cancel all pending notifications
   */
  async cancelAllNotifications(): Promise<void> {
    await notifee.cancelAllNotifications();
  }
}

export const notificationService = new NotificationService();
