import React from 'react';
import { View, ViewProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export interface CardProps extends ViewProps {
  variant?: 'elevated' | 'outlined' | 'flat';
}

/**
 * Design System Card Molecule
 */
export const Card: React.FC<CardProps> = ({
  children,
  variant = 'elevated',
  style,
  ...props
}) => {
  return (
    <View style={[styles.card, styles.variant(variant), style]} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  card: {
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.card,
  },
  variant: (variant: CardProps['variant']) => {
    switch (variant) {
      case 'outlined':
        return {
          borderWidth: 1,
          borderColor: theme.colors.border,
        };
      case 'flat':
        return {
          backgroundColor: theme.colors.surface,
        };
      case 'elevated':
      default:
        return {
          shadowColor: theme.colors.shadow,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.08,
          shadowRadius: 8,
          elevation: 3,
        };
    }
  },
}));
