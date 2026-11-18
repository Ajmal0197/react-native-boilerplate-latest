import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native-unistyles';
import { Text } from '@components/atoms/Text';

export interface HeaderProps {
  title: string;
  subtitle?: string;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  onBackPress?: () => void;
}

/**
 * Screen Header Organism with safe area insets
 */
export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  leftElement,
  rightElement,
  onBackPress,
}) => {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.bar}>
        <View style={styles.side}>
          {onBackPress ? (
            <TouchableOpacity
              onPress={onBackPress}
              style={styles.backButton}
              accessibilityRole="button"
              accessibilityLabel={t('common.back')}
            >
              <Text variant="label" tone="primary">
                {`‹ ${t('common.back')}`}
              </Text>
            </TouchableOpacity>
          ) : (
            leftElement
          )}
        </View>

        <View style={styles.center}>
          <Text
            variant="title"
            weight="bold"
            numberOfLines={1}
            center
            accessibilityRole="header"
          >
            {title}
          </Text>
          {subtitle && (
            <Text variant="caption" numberOfLines={1} center>
              {subtitle}
            </Text>
          )}
        </View>

        <View style={[styles.side, styles.sideRight]}>{rightElement}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.colors.background,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.divider,
  },
  bar: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
  },
  side: {
    width: 60,
    justifyContent: 'center',
  },
  sideRight: {
    alignItems: 'flex-end',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
  },
  backButton: {
    paddingVertical: theme.spacing.xs,
  },
}));
