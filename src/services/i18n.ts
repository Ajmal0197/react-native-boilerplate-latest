import { I18nManager } from 'react-native';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import RNRestart from 'react-native-restart';

import { resources, defaultLanguage, SupportedLanguage } from '@locales';
import { storage } from './storage';

const LANGUAGE_KEY = '@app_language';

/**
 * Resolves initial language synchronously using MMKV storage,
 * falling back to device locale detection, then default language ('en').
 */
export const getInitialLanguage = (): SupportedLanguage => {
  // 1. Check if user previously saved language preference in MMKV
  const saved = storage.getString(LANGUAGE_KEY) as
    SupportedLanguage | undefined;
  if (saved && Object.keys(resources).includes(saved)) {
    return saved;
  }

  // 2. Query device system language
  const deviceLocales = RNLocalize.getLocales();
  if (deviceLocales.length > 0) {
    const code = deviceLocales[0].languageCode as SupportedLanguage;
    if (Object.keys(resources).includes(code)) {
      return code;
    }
  }

  return defaultLanguage;
};

// Initialize i18next instance
i18n.use(initReactI18next).init({
  resources,
  lng: getInitialLanguage(),
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // React already escapes values
  },
  react: {
    useSuspense: false, // Prevents mobile Suspense hangs
  },
});

/**
 * Switch language at runtime with optional RTL layout handling
 */
export const changeLanguage = async (lng: SupportedLanguage, isRTL = false) => {
  storage.set(LANGUAGE_KEY, lng);
  await i18n.changeLanguage(lng);

  // If RTL layout direction changed (e.g., Arabic), update I18nManager and restart
  if (I18nManager.isRTL !== isRTL) {
    I18nManager.allowRTL(isRTL);
    I18nManager.forceRTL(isRTL);
    // Restart app view tree so native layouts invert properly
    RNRestart.restart();
  }
};

export default i18n;
