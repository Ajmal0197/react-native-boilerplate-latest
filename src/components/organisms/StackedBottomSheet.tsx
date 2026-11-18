import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from 'react';
import {
  View,
  Text as RNText,
  Platform,
  StyleSheet as RNStyleSheet,
} from 'react-native';
import { ModalBottomSheet } from '@swmansion/react-native-bottom-sheet';
import { useTranslation } from 'react-i18next';
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
export const StackedBottomSheet = forwardRef<StackedBottomSheetRef>(
  (_, ref) => {
    const { theme } = useUnistyles();
    const { t } = useTranslation();
    const insets = useSafeAreaInsets();

    const [firstIndex, setFirstIndex] = useState(0);
    const [secondIndex, setSecondIndex] = useState(0);

    // Safe Android on-screen navigation clearance
    const bottomInset =
      Math.max(insets.bottom, Platform.OS === 'android' ? 16 : 10) + 12;

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
          scrimColor={theme.colors.overlay}
          onCloseRequest={() => setFirstIndex(0)}
          surface={<View style={[RNStyleSheet.absoluteFill, styles.surface]} />}
        >
          <View style={[styles.sheetContent, { paddingBottom: bottomInset }]}>
            <View style={styles.handleContainer}>
              <View style={styles.handleIndicator} />
            </View>
            <Spacer size="xs" />

            <Text variant="title" weight="bold">
              {t('stackedSheet.level1Title')}
            </Text>
            <Spacer size="xs" />
            <Text variant="body" color={theme.colors.textSecondary}>
              {t('stackedSheet.level1Body')}
            </Text>

            <Spacer size="sm" />
            <View style={styles.badgeRow}>
              <View style={styles.badge}>
                <RNText
                  style={[styles.badgeText, { color: theme.colors.primary }]}
                >
                  {t('stackedSheet.softNavSafe', { inset: bottomInset })}
                </RNText>
              </View>
              <View style={styles.badge}>
                <RNText
                  style={[styles.badgeText, { color: theme.colors.success }]}
                >
                  {t('stackedSheet.engine')}
                </RNText>
              </View>
            </View>

            <Spacer size="md" />
            <Button
              title={t('stackedSheet.openSecond')}
              onPress={handleOpenSecondSheet}
              testID="btn-open-stacked-sheet-2"
            />
            <Spacer size="sm" />
            <Button
              title={t('stackedSheet.close')}
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
          scrimColor={theme.colors.overlay}
          onCloseRequest={() => setSecondIndex(0)}
          surface={<View style={[RNStyleSheet.absoluteFill, styles.surface]} />}
        >
          <View style={[styles.sheetContent, { paddingBottom: bottomInset }]}>
            <View style={styles.handleContainer}>
              <View style={styles.handleIndicator} />
            </View>
            <Spacer size="xs" />

            <Text variant="title" weight="bold">
              {t('stackedSheet.level2Title')}
            </Text>
            <Spacer size="xs" />
            <Text variant="body" color={theme.colors.textSecondary}>
              {t('stackedSheet.level2Body')}
            </Text>

            <Spacer size="md" />
            <Button
              title={t('stackedSheet.dismissThis')}
              variant="secondary"
              onPress={handleDismissSecondSheet}
              testID="btn-dismiss-sheet-2"
            />
            <Spacer size="sm" />
            <Button
              title={t('stackedSheet.dismissAll')}
              variant="outline"
              onPress={handleDismissAll}
              testID="btn-dismiss-all-sheets"
            />
          </View>
        </ModalBottomSheet>
      </>
    );
  },
);

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
