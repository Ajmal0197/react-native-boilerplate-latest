import type { RootStackScreenProps } from '@navigation/types';
import React from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native-unistyles';

import { Text } from '@components/atoms';
import { Header } from '@components/organisms';
import { LANGUAGE_OPTIONS, type LanguageOption } from '@config/constants';
import { changeLanguage } from '@services/i18n';

export const LanguageSelectScreen = ({
  navigation,
}: RootStackScreenProps<'LanguageSelect'>) => {
  const { t, i18n } = useTranslation();

  const handleSelectLanguage = (item: LanguageOption) => {
    void changeLanguage(item.code, item.isRTL);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Header
        title={t('settings.language')}
        onBackPress={() => navigation.goBack()}
      />

      <FlatList
        data={LANGUAGE_OPTIONS}
        keyExtractor={item => item.code}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => {
          const isSelected = i18n.language === item.code;

          return (
            <TouchableOpacity
              style={[styles.item, isSelected && styles.itemSelected]}
              onPress={() => handleSelectLanguage(item)}
              activeOpacity={0.7}
            >
              <View>
                <Text variant="body" weight={isSelected ? 'bold' : 'regular'}>
                  {item.label}
                </Text>
                {item.subLabel ? (
                  <Text variant="caption" style={styles.subLabel}>
                    {item.subLabel}
                  </Text>
                ) : null}
              </View>

              {isSelected && (
                <Text variant="label" weight="bold" style={styles.checkmark}>
                  ✓
                </Text>
              )}
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  list: {
    padding: theme.spacing.md,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  itemSelected: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primaryLight,
  },
  subLabel: {
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  checkmark: {
    color: theme.colors.primary,
  },
}));

export default LanguageSelectScreen;
