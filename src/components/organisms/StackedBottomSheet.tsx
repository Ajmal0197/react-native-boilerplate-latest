import React, { useState, forwardRef, useImperativeHandle, useCallback } from 'react';
import { View, Text as RNText, Platform, StyleSheet as RNStyleSheet } from 'react-native';
import { ModalBottomSheet } from '@swmansion/react-native-bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { Button, Spacer, Text } from '@components/atoms';

export interface StackedBottomSheetRef {
  present: () => void;
  dismiss: () => void;
}

/**
 * Stacked Bottom Sheet Component
 *
 * Demonstrates modal bottom sheets stacked on top of each other using
 * `@swmansion/react-native-bottom-sheet` (Software Mansion's official library).
 *
 * Fully accounts for Android on-screen soft navigation bars (3-button / gesture bar)
 * via dynamic bottom insets.
 */
export const StackedBottomSheet = forwardRef<StackedBottomSheetRef>((_, ref) => {
  const { theme } = useUnistyles();
  const insets = useSafeAreaInsets();

  const [firstIndex, setFirstIndex] = useState(0);
  const [secondIndex, setSecondIndex] = useState(0);

  // Safe Android on-screen navigation clearance
  const bottomInset = Math.max(
    insets.bottom,
    Platform.OS === 'android' ? 16 : 10,
  ) + 12;

  useImperativeHandle(ref, () => ({
    present: () => {
      setFirstIndex(1);
    },
    dismiss: () => {
      setSecondIndex(0);
      setFirstIndex(0);
    },
  }));

  const handleOpenSecondSheet = useCallback(() => {
    setSecondIndex(1);
  }, []);

  const handleDismissSecondSheet = useCallback(() => {
    setSecondIndex(0);
  }, []);

  const handleDismissAll = useCallback(() => {
    setSecondIndex(0);
    setFirstIndex(0);
  }, []);

  return (
    <>
      {/* ─── Level 1 Modal Sheet ────────────────────────────────────────────── */}
      <ModalBottomSheet
        index={firstIndex}
        onIndexChange={setFirstIndex}
        detents={[0, '55%', '85%']}
        scrimColor="rgba(0, 0, 0, 0.45)"
        onCloseRequest={() => setFirstIndex(0)}
        surface={
          <View
            style={[RNStyleSheet.absoluteFill, styles.surface]}
          />
        }
      >
        <View style={[styles.sheetContent, { paddingBottom: bottomInset }]}>
          <View style={styles.handleContainer}>
            <View style={styles.handleIndicator} />
          </View>
          <Spacer size="xs" />

          <Text variant="title" weight="bold">
            Modal Sheet (Level 1)
          </Text>
          <Spacer size="xs" />
          <Text variant="body" color={theme.colors.textSecondary}>
            This is the parent modal sheet powered by @swmansion/react-native-bottom-sheet.
            You can stack another modal sheet directly on top of it with layered dimming.
          </Text>

          <Spacer size="sm" />
          <View style={styles.badgeRow}>
            <View style={styles.badge}>
              <RNText style={[styles.badgeText, { color: theme.colors.primary }]}>
                Soft Nav Safe ({bottomInset}dp)
              </RNText>
            </View>
            <View style={styles.badge}>
              <RNText style={[styles.badgeText, { color: theme.colors.success }]}>
                @swmansion Engine
              </RNText>
            </View>
          </View>

          <Spacer size="md" />
          <Button
            title="Open Stacked Sheet 2"
            onPress={handleOpenSecondSheet}
            testID="btn-open-stacked-sheet-2"
          />
          <Spacer size="sm" />
          <Button
            title="Close Sheet"
            variant="outline"
            onPress={() => setFirstIndex(0)}
            testID="btn-close-sheet-1"
          />
        </View>
      </ModalBottomSheet>

      {/* ─── Level 2 Stacked Modal Sheet ────────────────────────────────────── */}
      <ModalBottomSheet
        index={secondIndex}
        onIndexChange={setSecondIndex}
        detents={[0, '42%', '70%']}
        scrimColor="rgba(0, 0, 0, 0.55)"
        onCloseRequest={() => setSecondIndex(0)}
        surface={
          <View
            style={[RNStyleSheet.absoluteFill, styles.surface]}
          />
        }
      >
        <View style={[styles.sheetContent, { paddingBottom: bottomInset }]}>
          <View style={styles.handleContainer}>
            <View style={styles.handleIndicator} />
          </View>
          <Spacer size="xs" />

          <Text variant="title" weight="bold">
            Stacked Sheet (Level 2)
          </Text>
          <Spacer size="xs" />
          <Text variant="body" color={theme.colors.textSecondary}>
            Stacked on top of Level 1. Notice the layered backdrop scrim and fluid
            native gestures on both iOS and Android.
          </Text>

          <Spacer size="md" />
          <Button
            title="Dismiss This Sheet"
            variant="secondary"
            onPress={handleDismissSecondSheet}
            testID="btn-dismiss-sheet-2"
          />
          <Spacer size="sm" />
          <Button
            title="Dismiss All Sheets"
            variant="outline"
            onPress={handleDismissAll}
            testID="btn-dismiss-all-sheets"
          />
        </View>
      </ModalBottomSheet>
    </>
  );
});

StackedBottomSheet.displayName = 'StackedBottomSheet';

const styles = StyleSheet.create(theme => ({
  surface: {
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  sheetContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  handleContainer: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  handleIndicator: {
    width: 38,
    height: 4,
    borderRadius: 2,
    backgroundColor: theme.colors.border,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: theme.colors.background,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
}));
