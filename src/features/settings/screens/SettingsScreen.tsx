import type { TabScreenProps } from '@navigation/types';
import React from 'react';
import { View, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native-unistyles';

import { WhatsAppPremiumIcon } from '@assets/svgs';
import { Text, Button, Spacer } from '@components/atoms';
import { ListItem, Card } from '@components/molecules';
import { Header } from '@components/organisms';
import { Config } from '@config/env';
import { NativeDeviceInfo } from '@native/NativeDeviceInfo';
import { AppConstant } from '@services/AppConstant';
import { useAppStore } from '@store/zustand/useAppStore';
import { useAuthStore } from '@store/zustand/useAuthStore';

export const SettingsScreen = ({ navigation }: TabScreenProps<'Settings'>) => {
  const { t, i18n } = useTranslation();
  const { themeMode, setThemeMode } = useAppStore();
  const { user, logout } = useAuthStore();

  const deviceModel = NativeDeviceInfo.getDeviceModel();
  const isEmulator = NativeDeviceInfo.isEmulator();
  const appVersion = NativeDeviceInfo.getAppVersion();

  const toggleTheme = () => {
    if (themeMode === 'light') setThemeMode('dark');
    else if (themeMode === 'dark') setThemeMode('auto');
    else setThemeMode('light');
  };

  return (
    <View style={styles.container}>
      <Header title={t('settings.title')} />

      <ScrollView contentContainerStyle={styles.content}>
        {user && (
          <Card variant="elevated" style={styles.userCard}>
            <Text variant="title" weight="bold">
              {user.name}
            </Text>
            <Text variant="caption">{user.email}</Text>
          </Card>
        )}

        <Spacer size="md" />

        <Card variant="outlined" style={styles.section}>
          <ListItem
            title={t('settings.theme')}
            subtitle={t('settings.currentTheme', {
              mode: themeMode.toUpperCase(),
            })}
            rightElement={
              <Button
                title={t('common.toggle')}
                size="sm"
                variant="outline"
                onPress={toggleTheme}
              />
            }
          />

          <ListItem
            title={t('settings.language')}
            subtitle={i18n.language.toUpperCase()}
            onPress={() => navigation.navigate('LanguageSelect')}
            rightElement={<Text variant="body">›</Text>}
          />
          <ListItem
            title={t('settings.labTitle')}
            subtitle={t('settings.labSubtitle')}
            onPress={() => navigation.navigate('TabViewDemo')}
            rightElement={<Text variant="body">›</Text>}
            testID="settings-item-features-lab"
          />
        </Card>

        <Spacer size="md" />

        <Card variant="outlined" style={styles.section}>
          <ListItem
            title={t('settings.deviceInfo')}
            subtitle={t('settings.deviceModel', {
              model: deviceModel,
              kind: isEmulator
                ? t('settings.simulator')
                : t('settings.physical'),
            })}
          />
          <ListItem
            title={t('settings.appVersion')}
            subtitle={t('settings.versionLine', {
              version: appVersion,
              name: Config.APP_NAME,
            })}
          />
          <ListItem
            title={t('settings.pageTrackerTitle')}
            subtitle={t('settings.pageTrackerSubtitle', {
              id: AppConstant.getCurrentHomeScreenPageId() ?? '1',
            })}
          />
          <ListItem
            title={t('settings.loaderTitle')}
            subtitle={t('settings.loaderSubtitle')}
            rightElement={
              <Button
                title={t('settings.loaderButton')}
                size="sm"
                variant="outline"
                onPress={() => {
                  AppConstant.showLoader(t('settings.loaderMessage'));
                  setTimeout(() => {
                    AppConstant.hideLoader();
                  }, 2000);
                }}
              />
            }
          />
        </Card>

        <Spacer size="md" />

        <Card variant="outlined" style={styles.section}>
          <ListItem
            title={t('settings.supportTitle')}
            subtitle={t('settings.supportSubtitle')}
            leftElement={<WhatsAppPremiumIcon width={24} height={24} />}
            rightElement={<Text variant="body">›</Text>}
          />
        </Card>

        <Spacer size="xl" />

        <Button
          title={t('settings.logout')}
          variant="danger"
          onPress={logout}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    padding: theme.spacing.md,
  },
  userCard: {
    padding: theme.spacing.lg,
  },
  section: {
    padding: 0,
    overflow: 'hidden',
  },
}));
