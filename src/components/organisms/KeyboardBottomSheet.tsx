import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
  useCallback,
} from 'react';
import {
  View,
  TextInput,
  Platform,
  StyleSheet as RNStyleSheet,
  Keyboard,
} from 'react-native';
import { ModalBottomSheet } from '@swmansion/react-native-bottom-sheet';
import { useTranslation } from 'react-i18next';
import {
  KeyboardAwareScrollView,
  useKeyboardState,
} from 'react-native-keyboard-controller';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { Button, Spacer, Text } from '@components/atoms';
import { Toast } from './Toast';

export interface KeyboardBottomSheetRef {
  present: () => void;
  dismiss: () => void;
}

/**
 * Keyboard-Handled Bottom Sheet Component
 *
 * Implements smooth keyboard handling within Bottom Sheet using
 * `@swmansion/react-native-bottom-sheet` and `react-native-keyboard-controller`'s
 * `KeyboardAwareScrollView` (per Swmansion official examples).
 *
 * Features automatic avoidance, fluid scrolling, and Android on-screen navigation bar safety.
 */
export const KeyboardBottomSheet = forwardRef<KeyboardBottomSheetRef>(
  (_, ref) => {
    const { theme } = useUnistyles();
    const { t } = useTranslation();
    const insets = useSafeAreaInsets();

    const [index, setIndex] = useState(0);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const titleRef = useRef('');

    const isKeyboardVisible = useKeyboardState(state => state.isVisible);

    // Safe Android on-screen navigation clearance
    const bottomInset =
      Math.max(insets.bottom, Platform.OS === 'android' ? 16 : 10) + 12;

    useImperativeHandle(ref, () => ({
      present: () => {
        setIndex(1);
      },
      dismiss: () => {
        setIndex(0);
      },
    }));

    const handleCloseRequest = useCallback(() => {
      if (isKeyboardVisible) {
        Keyboard.dismiss();
      } else {
        setIndex(0);
      }
    }, [isKeyboardVisible]);

    const handleSubmit = useCallback(() => {
      const feedbackTitle = titleRef.current.trim() || title.trim();
      if (!feedbackTitle) {
        Toast.error(
          t('feedbackSheet.titleRequired'),
          t('toast.validationError'),
        );
        return;
      }

      Toast.success(
        t('feedbackSheet.saved', { title: feedbackTitle }),
        t('feedbackSheet.receivedTitle'),
      );
      setTitle('');
      setDescription('');
      titleRef.current = '';
      setIndex(0);
    }, [title, t]);

    return (
      <ModalBottomSheet
        index={index}
        onIndexChange={setIndex}
        detents={[0, 'content']}
        scrimColor={theme.colors.overlay}
        onCloseRequest={handleCloseRequest}
        surface={<View style={[RNStyleSheet.absoluteFill, styles.surface]} />}
      >
        <View style={styles.sheetContainer}>
          <View style={styles.handleContainer}>
            <View style={styles.handleIndicator} />
          </View>
          <Spacer size="xs" />

          <KeyboardAwareScrollView
            bottomOffset={bottomInset + 8}
            keyboardDismissMode="interactive"
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={[
              styles.scrollContent,
              { paddingBottom: bottomInset + 16 },
            ]}
            showsVerticalScrollIndicator={false}
          >
            <Text variant="title" weight="bold">
              {t('feedbackSheet.title')}
            </Text>
            <Spacer size="xs" />
            <Text variant="caption" color={theme.colors.textSecondary}>
              {t('feedbackSheet.description')}
            </Text>

            <Spacer size="md" />

            <Text variant="label" weight="medium">
              {t('feedbackSheet.topic')}
            </Text>
            <Spacer size="xs" />
            <TextInput
              placeholder={t('feedbackSheet.topicPlaceholder')}
              placeholderTextColor={theme.colors.textSecondary}
              value={title}
              onChangeText={text => {
                titleRef.current = text;
                setTitle(text);
              }}
              style={[
                styles.input,
                {
                  backgroundColor: theme.colors.background,
                  borderColor: theme.colors.border,
                  color: theme.colors.text,
                },
              ]}
              testID="sheet-input-subject"
            />

            <Spacer size="sm" />

            <Text variant="label" weight="medium">
              {t('feedbackSheet.descriptionLabel')}
            </Text>
            <Spacer size="xs" />
            <TextInput
              placeholder={t('feedbackSheet.descriptionPlaceholder')}
              placeholderTextColor={theme.colors.textSecondary}
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              style={[
                styles.input,
                styles.textArea,
                {
                  backgroundColor: theme.colors.background,
                  borderColor: theme.colors.border,
                  color: theme.colors.text,
                },
              ]}
              textAlignVertical="top"
              testID="sheet-input-comments"
            />

            <Spacer size="md" />

            <Button
              title={t('feedbackSheet.submit')}
              onPress={handleSubmit}
              testID="btn-sheet-submit"
            />
            <Spacer size="xs" />
            <Button
              title={t('common.cancel')}
              variant="outline"
              onPress={() => setIndex(0)}
              testID="btn-sheet-cancel"
            />
          </KeyboardAwareScrollView>
        </View>
      </ModalBottomSheet>
    );
  },
);

KeyboardBottomSheet.displayName = 'KeyboardBottomSheet';

const styles = StyleSheet.create(theme => ({
  surface: {
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  sheetContainer: {
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
  scrollContent: {
    paddingTop: 4,
  },
  input: {
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
  },
  textArea: {
    minHeight: 90,
  },
}));
