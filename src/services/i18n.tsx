import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)

  .init({
    debug: true,
    backend: {
      loadPath: '/locale/{{lng}}/{{ns}}.json',
    },

    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },

    load: 'all',
    react: {
      useSuspense: false,
    },
  });

export default i18n;
