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

export const languageList: Array<{
  code: SupportedLanguage;
  label: string;
  isRTL: boolean;
}> = [
  { code: 'en', label: 'English', isRTL: false },
  { code: 'es', label: 'Español', isRTL: false },
  { code: 'ar', label: 'العربية (Arabic)', isRTL: true },
];

export { en, es, ar };
