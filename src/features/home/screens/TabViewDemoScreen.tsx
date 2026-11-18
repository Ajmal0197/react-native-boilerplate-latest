import type { RootStackScreenProps } from '@navigation/types';
import React, { useState, useRef } from 'react';
import { View, ScrollView, useWindowDimensions, Platform } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  TabView,
  TabBar,
  SceneMap,
  NavigationState,
  SceneRendererProps,
} from 'react-native-tab-view';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { Button, Spacer, Text } from '@components/atoms';
import {
  Header,
  Toast,
  StackedBottomSheet,
  StackedBottomSheetRef,
  KeyboardBottomSheet,
  KeyboardBottomSheetRef,
} from '@components/organisms';
import { AppConstant } from '@services/AppConstant';

export const TabViewDemoScreen = ({
  navigation,
}: RootStackScreenProps<'TabViewDemo'>) => {
  const layout = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const { theme } = useUnistyles();
  const { t } = useTranslation();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'sheets', title: t('featuresLab.tabSheets') },
    { key: 'toast', title: t('featuresLab.tabToast') },
    { key: 'overview', title: t('featuresLab.tabOverview') },
  ]);

  const stackedSheetRef = useRef<StackedBottomSheetRef>(null);
  const keyboardSheetRef = useRef<KeyboardBottomSheetRef>(null);

  // ─── Tab 1: Bottom Sheets ───────────────────────────────────────────────────
  const BottomSheetsRoute = () => (
    <ScrollView
      contentContainerStyle={[
        styles.tabContent,
        { paddingBottom: insets.bottom + 24 },
      ]}
      showsVerticalScrollIndicator={false}
      testID="tab-content-bottom-sheets"
    >
      <Text variant="title" weight="bold">
        {t('featuresLab.sheetsTitle')}
      </Text>
      <Spacer size="xs" />
      <Text variant="caption" color={theme.colors.textSecondary}>
        {t('featuresLab.sheetsSubtitle')}
      </Text>

      <Spacer size="md" />

      {/* Android On-Screen Navigation Card */}
      <View style={styles.card} testID="android-nav-info-card">
        <Text variant="body" weight="bold">
          {t('featuresLab.androidNavTitle')}
        </Text>
        <Spacer size="xs" />
        <Text variant="caption" color={theme.colors.textSecondary}>
          {t('featuresLab.detectedInset')}{' '}
          <Text variant="caption" weight="bold" color={theme.colors.primary}>
            {insets.bottom}dp
          </Text>{' '}
          (
          {Platform.OS === 'android'
            ? t('featuresLab.androidDevice')
            : t('featuresLab.iosDevice')}
          )
        </Text>
        <Spacer size="xs" />
        <Text variant="caption" color={theme.colors.textSecondary}>
          {t('featuresLab.androidNavBody')}
        </Text>
      </View>

      <Spacer size="md" />

      {/* Stacked Sheet Trigger */}
      <View style={styles.card}>
        <Text variant="body" weight="bold">
          {t('featuresLab.stackedTitle')}
        </Text>
        <Spacer size="xs" />
        <Text variant="caption" color={theme.colors.textSecondary}>
          {t('featuresLab.stackedBody')}
        </Text>
        <Spacer size="sm" />
        <Button
          title={t('featuresLab.stackedButton')}
          onPress={() => stackedSheetRef.current?.present()}
          testID="btn-trigger-stacked-sheet"
        />
      </View>

      <Spacer size="md" />

      {/* Keyboard Handled Sheet Trigger */}
      <View style={styles.card}>
        <Text variant="body" weight="bold">
          {t('featuresLab.keyboardTitle')}
        </Text>
        <Spacer size="xs" />
        <Text variant="caption" color={theme.colors.textSecondary}>
          {t('featuresLab.keyboardBody')}
        </Text>
        <Spacer size="sm" />
        <Button
          title={t('featuresLab.keyboardButton')}
          variant="secondary"
          onPress={() => keyboardSheetRef.current?.present()}
          testID="btn-trigger-keyboard-sheet"
        />
      </View>
    </ScrollView>
  );

  // ─── Tab 2: Toast & Network Lab ─────────────────────────────────────────────
  const ToastLabRoute = () => (
    <ScrollView
      contentContainerStyle={[
        styles.tabContent,
        { paddingBottom: insets.bottom + 24 },
      ]}
      showsVerticalScrollIndicator={false}
      testID="tab-content-toast-lab"
    >
      <Text variant="title" weight="bold">
        {t('featuresLab.toastTitle')}
      </Text>
      <Spacer size="xs" />
      <Text variant="caption" color={theme.colors.textSecondary}>
        {t('featuresLab.toastSubtitle')}
      </Text>

      <Spacer size="md" />

      <View style={styles.card}>
        <Text variant="body" weight="bold">
          {t('featuresLab.simulateTitle')}
        </Text>
        <Spacer size="xs" />
        <Text variant="caption" color={theme.colors.textSecondary}>
          {t('featuresLab.simulateBody')}
        </Text>
        <Spacer size="sm" />
        <Button
          title={t('featuresLab.networkErrorButton')}
          variant="danger"
          onPress={() =>
            Toast.error(t('apiErrors.network'), t('toast.networkError'))
          }
          testID="btn-toast-network-error"
        />
        <Spacer size="xs" />
        <Button
          title={t('featuresLab.serverErrorButton')}
          variant="outline"
          onPress={() =>
            Toast.error(
              t('featuresLab.serverErrorMessage'),
              t('featuresLab.serverErrorTitle'),
            )
          }
          testID="btn-toast-server-error"
        />
      </View>

      <Spacer size="md" />

      <View style={styles.card}>
        <Text variant="body" weight="bold">
          {t('featuresLab.successWarningTitle')}
        </Text>
        <Spacer size="sm" />
        <Button
          title={t('featuresLab.successButton')}
          onPress={() =>
            Toast.success(
              t('featuresLab.successMessage'),
              t('featuresLab.successTitle'),
            )
          }
          testID="btn-toast-success"
        />
        <Spacer size="xs" />
        <Button
          title={t('featuresLab.warningButton')}
          variant="secondary"
          onPress={() =>
            Toast.warning(
              t('featuresLab.warningMessage'),
              t('featuresLab.warningTitle'),
            )
          }
          testID="btn-toast-warning"
        />
      </View>

      <Spacer size="md" />

      <View style={styles.card}>
        <Text variant="body" weight="bold">
          {t('featuresLab.cancelTitle')}
        </Text>
        <Spacer size="xs" />
        <Text variant="caption" color={theme.colors.textSecondary}>
          {t('featuresLab.cancelBody')}
        </Text>
        <Spacer size="sm" />
        <Button
          title={t('featuresLab.cancelButton')}
          variant="outline"
          onPress={() => {
            AppConstant.cancelAllRequests();
            Toast.info(
              t('featuresLab.cancelMessage'),
              t('featuresLab.cancelToastTitle'),
            );
          }}
          testID="btn-cancel-all-requests"
        />
      </View>
    </ScrollView>
  );

  // ─── Tab 3: Architecture & Libraries ────────────────────────────────────────
  const OverviewRoute = () => (
    <ScrollView
      contentContainerStyle={[
        styles.tabContent,
        { paddingBottom: insets.bottom + 24 },
      ]}
      showsVerticalScrollIndicator={false}
      testID="tab-content-overview"
    >
      <Text variant="title" weight="bold">
        {t('featuresLab.overviewTitle')}
      </Text>
      <Spacer size="xs" />
      <Text variant="caption" color={theme.colors.textSecondary}>
        {t('featuresLab.overviewSubtitle')}
      </Text>

      <Spacer size="md" />

      {[
        { name: 'react-native-tab-view', desc: t('featuresLab.stackTabView') },
        {
          name: '@swmansion/react-native-bottom-sheet',
          desc: t('featuresLab.stackBottomSheet'),
        },
        {
          name: 'react-native-toast-message',
          desc: t('featuresLab.stackToast'),
        },
        {
          name: 'GlobalLoader & AppConstant',
          desc: t('featuresLab.stackLoader'),
        },
        {
          name: 'react-native-unistyles',
          desc: t('featuresLab.stackUnistyles'),
        },
        { name: 'MMKV & Redux Toolkit', desc: t('featuresLab.stackStorage') },
      ].map((item, i) => (
        <View key={i} style={styles.stackItem}>
          <Text variant="body" weight="bold" color={theme.colors.primary}>
            {item.name}
          </Text>
          <Spacer size="xs" />
          <Text variant="caption" color={theme.colors.textSecondary}>
            {item.desc}
          </Text>
        </View>
      ))}
    </ScrollView>
  );

  const renderScene = SceneMap({
    sheets: BottomSheetsRoute,
    toast: ToastLabRoute,
    overview: OverviewRoute,
  });

  type DemoRoute = { key: string; title: string };

  const renderTabBar = (
    props: SceneRendererProps & { navigationState: NavigationState<DemoRoute> },
  ) => (
    <TabBar
      {...props}
      indicatorStyle={styles.tabIndicator}
      style={styles.tabBar}
      activeColor={theme.colors.primary}
      inactiveColor={theme.colors.textSecondary}
    />
  );

  return (
    <View style={styles.container}>
      <Header
        title={t('featuresLab.title')}
        onBackPress={() => navigation.goBack()}
      />

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        testID="tab-view-container"
      />

      {/* Modal Bottom Sheets */}
      <StackedBottomSheet ref={stackedSheetRef} />
      <KeyboardBottomSheet ref={keyboardSheetRef} />
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  tabContent: {
    padding: theme.spacing.md,
  },
  card: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  stackItem: {
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: 10,
  },
  tabIndicator: {
    backgroundColor: theme.colors.primary,
    height: 3,
    borderRadius: 2,
  },
  tabBar: {
    backgroundColor: theme.colors.surface,
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
}));

export default TabViewDemoScreen;
