import 'i18next';
import type en from '@locales/en.json';

/**
 * Type Augmentation for i18next
 *
 * Maps your default translation resource shape (en.json) directly into
 * i18next's CustomTypeOptions. This gives every t('...') call full IDE
 * autocompletion and catches missing or mistyped keys at compile-time.
 */
declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      translation: typeof en;
    };
  }
}
