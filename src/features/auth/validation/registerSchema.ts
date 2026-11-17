import * as yup from 'yup';
import { EMAIL_REGEX } from '@utils/validators';

/**
 * Yup schema for registration form
 */
export const registerSchema = yup
  .object({
    name: yup
      .string()
      .trim()
      .required('Full name is required')
      .min(2, 'Name must be at least 2 characters'),
    email: yup
      .string()
      .trim()
      .required('Email is required')
      .matches(EMAIL_REGEX, 'Please enter a valid email address'),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
    confirmPassword: yup
      .string()
      .required('Please confirm your password')
      .oneOf([yup.ref('password')], 'Passwords must match'),
  })
  .required();

export type RegisterFormData = yup.InferType<typeof registerSchema>;
