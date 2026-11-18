import type { RootStackScreenProps } from '@navigation/types';
import React, { useState, useRef } from 'react';
import {
  View,
  ScrollView,
  useWindowDimensions,
  Platform,
} from 'react-native';
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
import { AppConstant } from '@config';

export const TabViewDemoScreen = ({
  navigation,
}: RootStackScreenProps<'TabViewDemo'>) => {
  const layout = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const { theme } = useUnistyles();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'sheets', title: 'Bottom Sheets' },
    { key: 'toast', title: 'Toast & Network' },
    { key: 'overview', title: 'Architecture' },
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
        Bottom Sheet Modals
      </Text>
      <Spacer size="xs" />
      <Text variant="caption" color={theme.colors.textSecondary}>
        Industry-standard bottom sheets powered by @swmansion/react-native-bottom-sheet.
      </Text>

      <Spacer size="md" />

      {/* Android On-Screen Navigation Card */}
      <View style={styles.card} testID="android-nav-info-card">
        <Text variant="body" weight="bold">
          Android Soft Navigation Handling
        </Text>
        <Spacer size="xs" />
        <Text variant="caption" color={theme.colors.textSecondary}>
          Detected Bottom Inset:{' '}
          <Text variant="caption" weight="bold" color={theme.colors.primary}>
            {insets.bottom}dp
          </Text>{' '}
          ({Platform.OS === 'android' ? 'Android Device' : 'iOS Device'})
        </Text>
        <Spacer size="xs" />
        <Text variant="caption" color={theme.colors.textSecondary}>
          On Android devices with 3-button or 2-button soft navigation, the bottom
          sheet and bottom toast automatically inject dynamic bottom margins so
          actions are never obscured.
        </Text>
      </View>

      <Spacer size="md" />

      {/* Stacked Sheet Trigger */}
      <View style={styles.card}>
        <Text variant="body" weight="bold">
          1. Stacked Bottom Sheet
        </Text>
        <Spacer size="xs" />
        <Text variant="caption" color={theme.colors.textSecondary}>
          Opens a modal bottom sheet which can trigger a second modal sheet stacked
          on top, with layered backdrops and gestures.
        </Text>
        <Spacer size="sm" />
        <Button
          title="Launch Stacked Sheets"
          onPress={() => stackedSheetRef.current?.present()}
          testID="btn-trigger-stacked-sheet"
        />
      </View>

      <Spacer size="md" />

      {/* Keyboard Handled Sheet Trigger */}
      <View style={styles.card}>
        <Text variant="body" weight="bold">
          2. Keyboard-Handled Sheet
        </Text>
        <Spacer size="xs" />
        <Text variant="caption" color={theme.colors.textSecondary}>
          Features BottomSheetTextInput with auto-expanding interactive keyboard
          avoidance without clipping buttons.
        </Text>
        <Spacer size="sm" />
        <Button
          title="Launch Keyboard Sheet"
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
        Native Bottom Toast Lab
      </Text>
      <Spacer size="xs" />
      <Text variant="caption" color={theme.colors.textSecondary}>
        Powered by react-native-toast-message with custom native HUD capsule
        styling and soft navigation clearance.
      </Text>

      <Spacer size="md" />

      <View style={styles.card}>
        <Text variant="body" weight="bold">
          Simulate Network & API Errors
        </Text>
        <Spacer size="xs" />
        <Text variant="caption" color={theme.colors.textSecondary}>
          These trigger the exact toast format presented on ERR_NETWORK or 5xx server
          responses.
        </Text>
        <Spacer size="sm" />
        <Button
          title="Simulate Network Error (Bottom Toast)"
          variant="danger"
          onPress={() =>
            Toast.error(
              'Unable to connect to the server. Please check your internet connection.',
              'Network Error',
            )
          }
          testID="btn-toast-network-error"
        />
        <Spacer size="xs" />
        <Button
          title="Simulate 500 Server Error"
          variant="outline"
          onPress={() =>
            Toast.error(
              'Internal Server Error (500). Please try again later.',
              'Server Glitch',
            )
          }
          testID="btn-toast-server-error"
        />
      </View>

      <Spacer size="md" />

      <View style={styles.card}>
        <Text variant="body" weight="bold">
          Success & Warning Notifications
        </Text>
        <Spacer size="sm" />
        <Button
          title="Show Success Toast"
          onPress={() =>
            Toast.success(
              'Data synchronized with remote server.',
              'Sync Complete',
            )
          }
          testID="btn-toast-success"
        />
        <Spacer size="xs" />
        <Button
          title="Show Warning Toast"
          variant="secondary"
          onPress={() =>
            Toast.warning(
              'Network bandwidth is low. Image sync paused.',
              'Slow Connection',
            )
          }
          testID="btn-toast-warning"
        />
      </View>

      <Spacer size="md" />

      <View style={styles.card}>
        <Text variant="body" weight="bold">
          Global API Cancellation
        </Text>
        <Spacer size="xs" />
        <Text variant="caption" color={theme.colors.textSecondary}>
          Cancels all pending HTTP requests across the application.
        </Text>
        <Spacer size="sm" />
        <Button
          title="Cancel All Pending Requests"
          variant="outline"
          onPress={() => {
            AppConstant.cancelAllRequests();
            Toast.info(
              'All in-flight requests were aborted.',
              'Requests Aborted',
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
        Verified Production Stack
      </Text>
      <Spacer size="xs" />
      <Text variant="caption" color={theme.colors.textSecondary}>
        All components adhere to clean architecture, zero-jank New Architecture
        standards, and complete unit test coverage.
      </Text>

      <Spacer size="md" />

      {[
        {
          name: 'react-native-tab-view',
          desc: 'High performance tabs powered by pager-view with smooth swipe physics.',
        },
        {
          name: '@swmansion/react-native-bottom-sheet',
          desc: 'Official Software Mansion modal sheets with stacking and keyboard avoidance.',
        },
        {
          name: 'react-native-toast-message',
          desc: 'Native HUD capsule bottom toast with Android navigation bar safety.',
        },
        {
          name: 'GlobalLoader & AppConstant',
          desc: 'Reference-counted imperative loader and API cancellation controller.',
        },
        {
          name: 'react-native-unistyles',
          desc: 'Ultra-fast stylesheet engine with dynamic runtime theme support.',
        },
        {
          name: 'MMKV & Redux Toolkit',
          desc: 'High speed storage and predictable state orchestration.',
        },
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
        title="Features Lab"
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
