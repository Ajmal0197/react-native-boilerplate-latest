import { notificationService } from '@services/notification';

export const triggerInstantNotification = async () => {
  return await notificationService.displayNotification(
    'Special Offer! 🎉',
    'Get 20% off on your next purchase using code BOILERPLATE20.',
  );
};

export const triggerScheduledNotification = async () => {
  return await notificationService.scheduleNotification(
    'Reminder ⏰',
    'This is a notification scheduled 5 seconds ago!',
    5,
  );
};
