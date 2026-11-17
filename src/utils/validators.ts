/**
 * Common regex validation patterns
 */
export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

export const PHONE_REGEX = /^\+?[1-9]\d{1,14}$/;

export const isValidEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email.trim());
};

export const isValidPassword = (password: string): boolean => {
  // Min 8 chars, 1 letter, 1 number
  return (
    password.length >= 8 && /\d/.test(password) && /[a-zA-Z]/.test(password)
  );
};
