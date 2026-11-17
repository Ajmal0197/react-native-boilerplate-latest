import React from 'react';
import { View, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

import { Text } from '@components/atoms';

export interface ListItemProps {
  title: string;
  subtitle?: string;
  rightElement?: React.ReactNode;
  leftElement?: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

/**
 * Standard List Item with left/right slots, title and subtitle
 */
export const ListItem: React.FC<ListItemProps> = ({
  title,
  subtitle,
  rightElement,
  leftElement,
  onPress,
  style,
  testID,
}) => {
  const content = (
    <>
      {leftElement && <View style={styles.left}>{leftElement}</View>}

      <View style={styles.content}>
        <Text variant="body" weight="medium">
          {title}
        </Text>
        {subtitle && (
          <Text variant="caption" style={styles.subtitle}>
            {subtitle}
          </Text>
        )}
      </View>

      {rightElement && <View style={styles.right}>{rightElement}</View>}
    </>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        testID={testID}
        activeOpacity={0.7}
        onPress={onPress}
        style={[styles.container, style]}
      >
        {content}
      </TouchableOpacity>
    );
  }

  return (
    <View testID={testID} style={[styles.container, style]}>
      {content}
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.card,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
  },
  left: {
    marginRight: theme.spacing.md,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  subtitle: {
    marginTop: theme.spacing.xxs,
    color: theme.colors.textSecondary,
  },
  right: {
    marginLeft: theme.spacing.md,
  },
}));
