import * as RNLocalize from 'react-native-localize';
import i18n from 'i18n-js';
import { I18nManager } from 'react-native';

import en from './en.json';
import vi from './vi.json';

const translationGetters = {
  en,
  vi,
};

const setI18nConfig = store => {
  // fallback if no available language fits
  const fallback = { languageTag: 'en', isRTL: false };
  const { isRTL } = RNLocalize.findBestAvailableLanguage(Object.keys(translationGetters)) || fallback;
  // clear translation cache
  // update layout direction
  I18nManager.forceRTL(isRTL);
  // set i18n-js config
  i18n.translations = translationGetters;
  i18n.translate = (key, config = {}) => {
    const { language } = store.getState().app;
    return i18n.t(key, { ...config, locale: language });
  };
};

export const addHandleLocaleChange = func => RNLocalize.addEventListener('change', func);
export const removeHandleLocaleChange = func => RNLocalize.removeEventListener('change', func);

export default setI18nConfig;
