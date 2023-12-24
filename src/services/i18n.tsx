import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

const baseRoute = process.env.REACT_APP_BASE_GITHUB_PAGES_BASE_URL
  ? process.env.REACT_APP_BASE_GITHUB_PAGES_BASE_URL
  : process.env.REACT_APP_BASE_SUB_ROUTE

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)

  .init({
    debug: false,
    backend: {
      loadPath: `${baseRoute ?? ''}/locales/{{lng}}/{{ns}}.json`,
    },

    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },

    load: 'currentOnly',
    react: {
      useSuspense: false,
    },
  })

export default i18n
