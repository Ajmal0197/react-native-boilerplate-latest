import type { ColorKeys } from '@theme/colors';
import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export interface TextProps extends RNTextProps {
  variant?: 'display' | 'title' | 'body' | 'caption' | 'label';
  weight?: 'regular' | 'medium' | 'bold';
  /** Theme color token. Preferred over `color`. */
  tone?: ColorKeys;
  /** Raw color override for dynamic values only. */
  color?: string;
  center?: boolean;
}

/**
 * Design System Text Atom
 *
 * Automatically consumes Unistyles typography and colors tokens.
 */
export const Text: React.FC<TextProps> = ({
  children,
  variant = 'body',
  weight = 'regular',
  tone,
  color,
  center = false,
  style,
  ...props
}) => {
  return (
    <RNText
      style={[
        styles.text,
        styles.variant(variant),
        styles.weight(weight),
        tone ? styles.tone(tone) : undefined,
        color ? { color } : undefined,
        center ? styles.center : undefined,
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create(theme => ({
  text: {
    color: theme.colors.text,
  },
  center: {
    textAlign: 'center',
  },
  tone: (tone: ColorKeys) => ({
    color: theme.colors[tone],
  }),
  variant: (variant: TextProps['variant']) => {
    switch (variant) {
      case 'display':
        return {
          fontSize: theme.fontSize.display,
          lineHeight: theme.lineHeight.display,
          fontWeight: theme.fontWeight.bold,
        };
      case 'title':
        return {
          fontSize: theme.fontSize.xl,
          lineHeight: theme.lineHeight.xl,
          fontWeight: theme.fontWeight.semibold,
        };
      case 'caption':
        return {
          fontSize: theme.fontSize.xs,
          lineHeight: theme.lineHeight.xs,
          color: theme.colors.textSecondary,
        };
      case 'label':
        return {
          fontSize: theme.fontSize.sm,
          lineHeight: theme.lineHeight.sm,
          fontWeight: theme.fontWeight.medium,
        };
      case 'body':
      default:
        return {
          fontSize: theme.fontSize.md,
          lineHeight: theme.lineHeight.md,
        };
    }
  },
  weight: (weight: TextProps['weight']) => {
    switch (weight) {
      case 'bold':
        return { fontWeight: theme.fontWeight.bold };
      case 'medium':
        return { fontWeight: theme.fontWeight.medium };
      case 'regular':
      default:
        return { fontWeight: theme.fontWeight.regular };
    }
  },
}));
