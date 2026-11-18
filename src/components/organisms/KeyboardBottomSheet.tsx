import React, { useState, forwardRef, useImperativeHandle, useRef, useCallback } from 'react';
import { View, TextInput, Platform, StyleSheet as RNStyleSheet, Keyboard } from 'react-native';
import { ModalBottomSheet } from '@swmansion/react-native-bottom-sheet';
import { KeyboardAwareScrollView, useKeyboardState } from 'react-native-keyboard-controller';
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
export const KeyboardBottomSheet = forwardRef<KeyboardBottomSheetRef>((_, ref) => {
  const { theme } = useUnistyles();
  const insets = useSafeAreaInsets();

  const [index, setIndex] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const titleRef = useRef('');

  const isKeyboardVisible = useKeyboardState(state => state.isVisible);

  // Safe Android on-screen navigation clearance
  const bottomInset = Math.max(
    insets.bottom,
    Platform.OS === 'android' ? 16 : 10,
  ) + 12;

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
      Toast.error('Please enter a feedback title', 'Validation Error');
      return;
    }

    Toast.success(
      `Saved: ${feedbackTitle}`,
      'Submission Received',
    );
    setTitle('');
    setDescription('');
    titleRef.current = '';
    setIndex(0);
  }, [title]);

  return (
    <ModalBottomSheet
      index={index}
      onIndexChange={setIndex}
      detents={[0, 'content']}
      scrimColor="rgba(0, 0, 0, 0.45)"
      onCloseRequest={handleCloseRequest}
      surface={
        <View
          style={[RNStyleSheet.absoluteFill, styles.surface]}
        />
      }
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
            Keyboard-Handled Sheet
          </Text>
          <Spacer size="xs" />
          <Text variant="caption" color={theme.colors.textSecondary}>
            Focus an input to test fluid keyboard avoidance with
            @swmansion/react-native-bottom-sheet and KeyboardAwareScrollView.
          </Text>

          <Spacer size="md" />

          <Text variant="label" weight="medium">
            Feedback Topic
          </Text>
          <Spacer size="xs" />
          <TextInput
            placeholder="e.g. Design System Improvement"
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
            Description
          </Text>
          <Spacer size="xs" />
          <TextInput
            placeholder="Tell us what you experienced..."
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
            title="Submit Feedback"
            onPress={handleSubmit}
            testID="btn-sheet-submit"
          />
          <Spacer size="xs" />
          <Button
            title="Cancel"
            variant="outline"
            onPress={() => setIndex(0)}
            testID="btn-sheet-cancel"
          />
        </KeyboardAwareScrollView>
      </View>
    </ModalBottomSheet>
  );
});

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
