import * as yup from 'yup';
import { EMAIL_REGEX } from '@utils/validators';

/**
 * Yup schema for login form
 */
export const loginSchema = yup
  .object({
    email: yup
      .string()
      .trim()
      .required('Email is required')
      .matches(EMAIL_REGEX, 'Please enter a valid email address'),
    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
  })
  .required();

export type LoginFormData = yup.InferType<typeof loginSchema>;
