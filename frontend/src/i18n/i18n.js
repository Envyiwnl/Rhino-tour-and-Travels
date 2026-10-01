import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import hi from "./locales/hi.json";
import as from "./locales/as.json";

const supportedLanguages = ["en", "hi", "as"];

const getInitialLanguage = () => {
  const savedLanguage = localStorage.getItem("language");

  if (savedLanguage && supportedLanguages.includes(savedLanguage)) {
    return savedLanguage;
  }

  const browserLanguage = navigator.language?.split("-")[0];

  if (supportedLanguages.includes(browserLanguage)) {
    return browserLanguage;
  }

  return "en";
};

const initialLanguage = getInitialLanguage();

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },

    hi: {
      translation: hi,
    },

    as: {
      translation: as,
    },
  },

  lng: initialLanguage,

  fallbackLng: "en",

  supportedLngs: supportedLanguages,

  interpolation: {
    escapeValue: false,
  },
});

document.documentElement.lang = initialLanguage;

i18n.on("languageChanged", (language) => {
  localStorage.setItem("language", language);

  document.documentElement.lang = language;
});

export default i18n;
