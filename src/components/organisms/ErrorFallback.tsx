import React from 'react';
import { View } from 'react-native';
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
  return (
    <View style={styles.container}>
      <Text variant="display">⚠️</Text>
      <Spacer size="md" />

      <Text variant="title" weight="bold" center>
        Oops! Something went wrong.
      </Text>
      <Spacer size="xs" />

      <Text variant="caption" center style={styles.errorMessage}>
        {error.message || 'An unexpected error occurred.'}
      </Text>
      <Spacer size="xl" />

      <Button title="Try Again" onPress={resetError} style={styles.button} />
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
