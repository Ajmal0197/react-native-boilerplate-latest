import React from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native-unistyles';
import { Button } from '@components/atoms/Button';
import { Spacer } from '@components/atoms/Spacer';
import { Text } from '@components/atoms/Text';

export interface ErrorFallbackProps {
  error: Error;
  resetError: () => void;
}

/**
 * Fallback Component shown by ErrorBoundary when a JavaScript crash occurs
 */
export const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetError,
}) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text variant="display">⚠️</Text>
      <Spacer size="md" />

      <Text variant="title" weight="bold" center>
        {t('errorFallback.title')}
      </Text>
      <Spacer size="xs" />

      <Text variant="caption" center style={styles.errorMessage}>
        {error.message || t('errorFallback.fallbackMessage')}
      </Text>
      <Spacer size="xl" />

      <Button
        title={t('common.tryAgain')}
        onPress={resetError}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.background,
  },
  errorMessage: {
    color: theme.colors.error,
    maxWidth: 300,
  },
  button: {
    minWidth: 160,
  },
}));
