import { LANGUAGE_OPTIONS, type LanguageOption } from '@config/constants';
import ar from './ar.json';
import en from './en.json';
import es from './es.json';

export const resources = {
  en: { translation: en },
  es: { translation: es },
  ar: { translation: ar },
} as const;

export type SupportedLanguage = keyof typeof resources;

export const defaultLanguage: SupportedLanguage = 'en';

export const languageList: readonly LanguageOption[] = LANGUAGE_OPTIONS;

export { en, es, ar, LANGUAGE_OPTIONS };
