import type { TabScreenProps } from '@navigation/types';
import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native-unistyles';

import { Text, Button, Spacer } from '@components/atoms';
import { Card } from '@components/molecules';
import { Header } from '@components/organisms';
import {
  triggerInstantNotification,
  triggerScheduledNotification,
} from '../services/notificationService';

export const NotificationsScreen = (
  _props: TabScreenProps<'Notifications'>,
) => {
  const { t } = useTranslation();
  const [scheduledStatus, setScheduledStatus] = useState<string | null>(null);

  const handleInstant = async () => {
    try {
      await triggerInstantNotification();
    } catch {
      Alert.alert(
        'Permission needed',
        'Please enable notifications in device settings.',
      );
    }
  };

  const handleScheduled = async () => {
    try {
      await triggerScheduledNotification();
      setScheduledStatus('Notification scheduled! Expect it in 5 seconds...');
      setTimeout(() => setScheduledStatus(null), 6000);
    } catch {
      Alert.alert(
        'Permission needed',
        'Please enable notifications in device settings.',
      );
    }
  };

  return (
    <View style={styles.container}>
      <Header title={t('notifications.title')} />

      <View style={styles.content}>
        <Card variant="elevated" style={styles.card}>
          <Text variant="title" weight="bold">
            Push Notifications with Notifee
          </Text>
          <Spacer size="xs" />
          <Text variant="body" color="#4B5563">
            {t('notifications.permissionPrompt')}
          </Text>

          <Spacer size="lg" />

          <Button
            title={t('notifications.instantButton')}
            onPress={handleInstant}
          />

          <Spacer size="md" />

          <Button
            title={t('notifications.scheduleButton')}
            variant="outline"
            onPress={handleScheduled}
          />

          {scheduledStatus && (
            <View style={styles.statusBox}>
              <Text variant="caption" color="#34C759" center>
                {scheduledStatus}
              </Text>
            </View>
          )}
        </Card>

        <Spacer size="lg" />

        <Card variant="outlined">
          <Text variant="label" weight="bold">
            Key Architecture Notes:
          </Text>
          <Spacer size="xs" />
          <Text variant="caption">
            • Uses Android Notification Channels (Android 8.0+)
          </Text>
          <Text variant="caption">
            • Automatically requests iOS Notification Authorization
          </Text>
          <Text variant="caption">
            • Supports background trigger notifications
          </Text>
        </Card>
      </View>
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: theme.spacing.lg,
  },
  card: {
    padding: theme.spacing.lg,
  },
  statusBox: {
    marginTop: theme.spacing.md,
    padding: theme.spacing.sm,
    backgroundColor: 'rgba(52, 199, 89, 0.1)',
    borderRadius: theme.borderRadius.sm,
  },
}));
