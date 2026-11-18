import * as yup from 'yup';
import i18n from '@services/i18n';
import { EMAIL_REGEX } from '@utils/validators';

const NAME_MIN_LENGTH = 2;
const PASSWORD_MIN_LENGTH = 8;

/**
 * Yup schema for registration form.
 * Messages are resolved lazily so they follow the active language.
 */
export const registerSchema = yup
  .object({
    name: yup
      .string()
      .trim()
      .required(() => i18n.t('validation.nameRequired'))
      .min(NAME_MIN_LENGTH, () =>
        i18n.t('validation.nameMin', { min: NAME_MIN_LENGTH }),
      ),
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
    confirmPassword: yup
      .string()
      .required(() => i18n.t('validation.confirmRequired'))
      .oneOf([yup.ref('password')], () => i18n.t('validation.passwordsMatch')),
  })
  .required();

export type RegisterFormData = yup.InferType<typeof registerSchema>;
