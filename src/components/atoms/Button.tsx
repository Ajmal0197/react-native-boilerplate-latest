import React from 'react';
import {
  TouchableOpacity,
  ActivityIndicator,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { Text } from './Text';

export interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

/**
 * Design System Button Atom
 */
export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  style,
  ...props
}) => {
  const { theme } = useUnistyles();
  const isDisabled = disabled || isLoading;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled: isDisabled, busy: isLoading }}
      style={[
        styles.button,
        styles.variant(variant),
        styles.size(size),
        isDisabled && styles.disabled,
        style as ViewStyle,
      ]}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator
          size="small"
          color={
            variant === 'outline'
              ? theme.colors.primary
              : theme.colors.onPrimary
          }
        />
      ) : (
        <Text variant="label" weight="bold" style={styles.text(variant)}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create(theme => ({
  button: {
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  disabled: {
    opacity: 0.5,
  },
  variant: (variant: ButtonProps['variant']) => {
    switch (variant) {
      case 'secondary':
        return {
          backgroundColor: theme.colors.surface,
          borderWidth: 1,
          borderColor: theme.colors.border,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderWidth: 1.5,
          borderColor: theme.colors.primary,
        };
      case 'danger':
        return {
          backgroundColor: theme.colors.error,
        };
      case 'primary':
      default:
        return {
          backgroundColor: theme.colors.primary,
        };
    }
  },
  size: (size: ButtonProps['size']) => {
    switch (size) {
      case 'sm':
        return {
          paddingVertical: theme.spacing.xs,
          paddingHorizontal: theme.spacing.sm,
        };
      case 'lg':
        return {
          paddingVertical: theme.spacing.md,
          paddingHorizontal: theme.spacing.xl,
        };
      case 'md':
      default:
        return {
          paddingVertical: theme.spacing.sm + 2,
          paddingHorizontal: theme.spacing.md,
        };
    }
  },
  text: (variant: ButtonProps['variant']) => {
    if (variant === 'outline') {
      return { color: theme.colors.primary };
    }
    if (variant === 'secondary') {
      return { color: theme.colors.text };
    }
    return { color: theme.colors.onPrimary };
  },
}));
