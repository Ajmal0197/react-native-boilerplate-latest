import * as yup from 'yup';
import i18n from '@services/i18n';
import { EMAIL_REGEX } from '@utils/validators';

const PASSWORD_MIN_LENGTH = 6;

/**
 * Yup schema for login form.
 * Messages are resolved lazily so they follow the active language.
 */
export const loginSchema = yup
  .object({
    email: yup
      .string()
      .trim()
      .required(() => i18n.t('validation.emailRequired'))
      .matches(EMAIL_REGEX, () => i18n.t('validation.emailInvalid')),
    password: yup
      .string()
      .required(() => i18n.t('validation.passwordRequired'))
      .min(PASSWORD_MIN_LENGTH, () =>
        i18n.t('validation.passwordMin', { min: PASSWORD_MIN_LENGTH }),
      ),
  })
  .required();

export type LoginFormData = yup.InferType<typeof loginSchema>;
