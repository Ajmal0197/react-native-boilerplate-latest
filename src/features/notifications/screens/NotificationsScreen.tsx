import type { TabScreenProps } from '@navigation/types';
import React, { useEffect, useRef, useState } from 'react';
import { View, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native-unistyles';

import { Text, Button, Spacer } from '@components/atoms';
import { Card } from '@components/molecules';
import { Header } from '@components/organisms';
import { withAlpha } from '@theme/colors';
import {
  triggerInstantNotification,
  triggerScheduledNotification,
} from '../services/notificationService';

export const NotificationsScreen = (
  _props: TabScreenProps<'Notifications'>,
) => {
  const { t } = useTranslation();
  const [scheduledStatus, setScheduledStatus] = useState<string | null>(null);
  const statusTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (statusTimerRef.current) {
        clearTimeout(statusTimerRef.current);
      }
    };
  }, []);

  const showPermissionAlert = () => {
    Alert.alert(
      t('notifications.permissionNeededTitle'),
      t('notifications.permissionNeededBody'),
    );
  };

  const handleInstant = async () => {
    try {
      await triggerInstantNotification();
    } catch {
      showPermissionAlert();
    }
  };

  const handleScheduled = async () => {
    try {
      await triggerScheduledNotification();
      setScheduledStatus(t('notifications.scheduledStatus'));
      if (statusTimerRef.current) {
        clearTimeout(statusTimerRef.current);
      }
      statusTimerRef.current = setTimeout(() => setScheduledStatus(null), 6000);
    } catch {
      showPermissionAlert();
    }
  };

  return (
    <View style={styles.container}>
      <Header title={t('notifications.title')} />

      <View style={styles.content}>
        <Card variant="elevated" style={styles.card}>
          <Text variant="title" weight="bold">
            {t('notifications.cardTitle')}
          </Text>
          <Spacer size="xs" />
          <Text variant="body" tone="textSecondary">
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
              <Text variant="caption" tone="success" center>
                {scheduledStatus}
              </Text>
            </View>
          )}
        </Card>

        <Spacer size="lg" />

        <Card variant="outlined">
          <Text variant="label" weight="bold">
            {t('notifications.notesTitle')}
          </Text>
          <Spacer size="xs" />
          <Text variant="caption">{t('notifications.note1')}</Text>
          <Text variant="caption">{t('notifications.note2')}</Text>
          <Text variant="caption">{t('notifications.note3')}</Text>
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
    backgroundColor: withAlpha(theme.colors.success, 0.1),
    borderRadius: theme.borderRadius.sm,
  },
}));
