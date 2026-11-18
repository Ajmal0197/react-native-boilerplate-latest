import React from 'react';
import {
  TextInput as RNTextInput,
  View,
  TextInputProps as RNTextInputProps,
} from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { Text } from './Text';

export interface InputProps extends RNTextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
}

/**
 * Controlled TextInput Atom with Error & Label handling
 */
export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  style,
  ...props
}) => {
  const { theme } = useUnistyles();

  return (
    <View style={styles.container}>
      {label && (
        <Text variant="label" style={styles.label}>
          {label}
        </Text>
      )}

      <RNTextInput
        style={[styles.input, Boolean(error) && styles.inputError, style]}
        placeholderTextColor={theme.colors.textMuted}
        accessibilityLabel={label ?? props.placeholder}
        accessibilityHint={error ?? helperText}
        {...props}
      />

      {error ? (
        <Text variant="caption" style={styles.errorText}>
          {error}
        </Text>
      ) : helperText ? (
        <Text variant="caption" style={styles.helperText}>
          {helperText}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    marginBottom: theme.spacing.md,
  },
  label: {
    marginBottom: theme.spacing.xs,
    color: theme.colors.text,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm + 2,
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
  },
  inputError: {
    borderColor: theme.colors.error,
  },
  errorText: {
    color: theme.colors.error,
    marginTop: theme.spacing.xxs + 2,
  },
  helperText: {
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xxs + 2,
  },
}));
