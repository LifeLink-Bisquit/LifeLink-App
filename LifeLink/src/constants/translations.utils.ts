// src/i18n.ts
import i18n, {changeLanguage} from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from '../locales/en.json';
import tr from '../locales/tr.json';
import {storage} from './app.utils';

export enum Languages {
  EN = 'en',
  TR = 'tr',
}

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources: {
    en: {translation: en},
    tr: {translation: tr},
  },
  lng: storage.getString('language'),
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export const switchLanguage = (language: Languages) => {
  changeLanguage(language);
  storage.set('language', language);
};

export default i18n;
