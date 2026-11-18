import type { TabScreenProps } from '@navigation/types';
import React from 'react';
import { View, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native-unistyles';

import { WhatsAppPremiumIcon } from '@assets/svgs';
import { Text, Button, Spacer } from '@components/atoms';
import { ListItem, Card } from '@components/molecules';
import { Header } from '@components/organisms';
import { AppConstant } from '@config';
import { Config } from '@config/env';
import { NativeDeviceInfo } from '@native/NativeDeviceInfo';
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
            subtitle={`Current: ${themeMode.toUpperCase()}`}
            rightElement={
              <Button
                title="Toggle"
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
            title="Features & UI Lab"
            subtitle="Tab View, Stacked Bottom Sheet, Bottom Toast"
            onPress={() => navigation.navigate('TabViewDemo')}
            rightElement={<Text variant="body">›</Text>}
            testID="settings-item-features-lab"
          />
        </Card>

        <Spacer size="md" />

        <Card variant="outlined" style={styles.section}>
          <ListItem
            title={t('settings.deviceInfo')}
            subtitle={`Model: ${deviceModel} (${isEmulator ? 'Simulator' : 'Physical'})`}
          />
          <ListItem
            title={t('settings.appVersion')}
            subtitle={`${appVersion} (Build v${AppConstant.appVersion}) • ${Config.APP_NAME}`}
          />
          <ListItem
            title="Active Page Tracker"
            subtitle={`Home Page ID: ${AppConstant.getCurrentHomeScreenPageId() ?? '1'}`}
          />
          <ListItem
            title="Global App Loader"
            subtitle="Trigger loader via AppConstant"
            rightElement={
              <Button
                title="Test (2s)"
                size="sm"
                variant="outline"
                onPress={() => {
                  AppConstant.showLoader('Loading via AppConstant...');
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
            title="WhatsApp Support"
            subtitle="24/7 Priority Helpdesk"
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
