import type { AuthScreenProps } from '@navigation/types';
import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native-unistyles';

import { Text, Input, Button, Spacer } from '@components/atoms';
import { Card } from '@components/molecules';
import { useAuthStore } from '@store/zustand/useAuthStore';
import { withAlpha } from '@theme/colors';
import { authApi } from '../api/authApi';
import { loginSchema, LoginFormData } from '../validation/loginSchema';

export const LoginScreen = ({ navigation }: AuthScreenProps<'Login'>) => {
  const { t } = useTranslation();
  const login = useAuthStore(state => state.login);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setErrorMessage(null);
      const res = await authApi.login(data);
      login(res.user, res.token, res.refreshToken);
    } catch {
      setErrorMessage(t('errors.general'));
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.formShell}>
      <View style={styles.header}>
        <Text variant="display" weight="bold">
          {t('auth.login.title')}
        </Text>
        <Spacer size="xs" />
        <Text variant="body" tone="textSecondary">
          {t('auth.login.subtitle')}
        </Text>
      </View>

      <Card variant="elevated" style={styles.card}>
        {errorMessage && (
          <View style={styles.errorBanner}>
            <Text variant="caption" tone="error">
              {errorMessage}
            </Text>
          </View>
        )}

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label={t('auth.login.email')}
              placeholder={t('auth.login.emailPlaceholder')}
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.email?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label={t('auth.login.password')}
              placeholder={t('auth.login.passwordPlaceholder')}
              secureTextEntry
              autoCapitalize="none"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.password?.message}
            />
          )}
        />

        <Spacer size="md" />

        <Button
          title={t('auth.login.submitButton')}
          onPress={() => {
            handleSubmit(onSubmit)();
          }}
          isLoading={isSubmitting}
        />
      </Card>

      <Spacer size="lg" />

      <View style={styles.footer}>
        <Text variant="body">{t('auth.login.noAccount')} </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text variant="body" weight="bold" tone="primary">
            {t('auth.login.signUpLink')}
          </Text>
        </TouchableOpacity>
      </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    flexGrow: 1,
    padding: {
      xs: theme.spacing.lg,
      md: theme.spacing.xl,
    },
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
  },
  formShell: {
    width: '100%',
    maxWidth: {
      xs: '100%',
      md: 480,
      lg: 520,
    },
    alignSelf: 'center',
  },
  header: {
    marginBottom: theme.spacing.xl,
  },
  card: {
    padding: theme.spacing.lg,
  },
  errorBanner: {
    backgroundColor: withAlpha(theme.colors.error, 0.1),
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
    marginBottom: theme.spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
