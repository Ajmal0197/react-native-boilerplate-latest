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
import { authApi } from '../api/authApi';
import { registerSchema, RegisterFormData } from '../validation/registerSchema';

export const RegisterScreen = ({ navigation }: AuthScreenProps<'Register'>) => {
  const { t } = useTranslation();
  const login = useAuthStore(state => state.login);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setErrorMessage(null);
      const res = await authApi.register(data);
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
      <View style={styles.header}>
        <Text variant="display" weight="bold">
          {t('auth.register.title')}
        </Text>
        <Spacer size="xs" />
        <Text variant="body" color="#6B7280">
          {t('auth.register.subtitle')}
        </Text>
      </View>

      <Card variant="elevated" style={styles.card}>
        {errorMessage && (
          <View style={styles.errorBanner}>
            <Text variant="caption" color="#FF3B30">
              {errorMessage}
            </Text>
          </View>
        )}

        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label={t('auth.register.name')}
              placeholder={t('auth.register.namePlaceholder')}
              autoCapitalize="words"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.name?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label={t('auth.register.email')}
              placeholder={t('auth.register.emailPlaceholder')}
              autoCapitalize="none"
              keyboardType="email-address"
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
              label={t('auth.register.password')}
              placeholder={t('auth.register.passwordPlaceholder')}
              secureTextEntry
              autoCapitalize="none"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.password?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label={t('auth.register.confirmPassword')}
              placeholder={t('auth.register.confirmPasswordPlaceholder')}
              secureTextEntry
              autoCapitalize="none"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              error={errors.confirmPassword?.message}
            />
          )}
        />

        <Spacer size="md" />

        <Button
          title={t('auth.register.submitButton')}
          onPress={() => {
            handleSubmit(onSubmit)();
          }}
          isLoading={isSubmitting}
        />
      </Card>

      <Spacer size="lg" />

      <View style={styles.footer}>
        <Text variant="body">{t('auth.register.alreadyHaveAccount')} </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text variant="body" weight="bold" color="#0066FF">
            {t('auth.register.signInLink')}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    flexGrow: 1,
    padding: theme.spacing.lg,
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
  },
  header: {
    marginBottom: theme.spacing.xl,
  },
  card: {
    padding: theme.spacing.lg,
  },
  errorBanner: {
    backgroundColor: 'rgba(255, 59, 48, 0.1)',
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
