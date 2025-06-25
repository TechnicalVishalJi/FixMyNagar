import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"

// Import translation files
import enCommon from "./translations/en/common.json"
import enHomepage from "./translations/en/homepage.json"
import enAuth from "./translations/en/auth.json"
import enAdmin from "./translations/en/admin.json"
import enAbout from "./translations/en/about.json"
import enContact from "./translations/en/contact.json"

import hiCommon from "./translations/hi/common.json"
import hiHomepage from "./translations/hi/homepage.json"
import hiAuth from "./translations/hi/auth.json"
import hiAdmin from "./translations/hi/admin.json"
import hiAbout from "./translations/hi/about.json"
import hiContact from "./translations/hi/contact.json"

import taCommon from "./translations/ta/common.json"
import taHomepage from "./translations/ta/homepage.json"
import taAuth from "./translations/ta/auth.json"
import taAdmin from "./translations/ta/admin.json"
import taAbout from "./translations/ta/about.json"
import taContact from "./translations/ta/contact.json"

import teCommon from "./translations/te/common.json"
import teHomepage from "./translations/te/homepage.json"
import teAuth from "./translations/te/auth.json"
import teAdmin from "./translations/te/admin.json"
import teAbout from "./translations/te/about.json"
import teContact from "./translations/te/contact.json"

import bnCommon from "./translations/bn/common.json"
import bnHomepage from "./translations/bn/homepage.json"
import bnAuth from "./translations/bn/auth.json"
import bnAdmin from "./translations/bn/admin.json"
import bnAbout from "./translations/bn/about.json"
import bnContact from "./translations/bn/contact.json"

import mrCommon from "./translations/mr/common.json"
import mrHomepage from "./translations/mr/homepage.json"
import mrAuth from "./translations/mr/auth.json"
import mrAdmin from "./translations/mr/admin.json"
import mrAbout from "./translations/mr/about.json"
import mrContact from "./translations/mr/contact.json"

const resources = {
  en: {
    common: enCommon,
    homepage: enHomepage,
    auth: enAuth,
    admin: enAdmin,
    about: enAbout,
    contact: enContact,
  },
  hi: {
    common: hiCommon,
    homepage: hiHomepage,
    auth: hiAuth,
    admin: hiAdmin,
    about: hiAbout,
    contact: hiContact,
  },
  ta: {
    common: taCommon,
    homepage: taHomepage,
    auth: taAuth,
    admin: taAdmin,
    about: taAbout,
    contact: taContact,
  },
  te: {
    common: teCommon,
    homepage: teHomepage,
    auth: teAuth,
    admin: teAdmin,
    about: teAbout,
    contact: teContact,
  },
  bn: {
    common: bnCommon,
    homepage: bnHomepage,
    auth: bnAuth,
    admin: bnAdmin,
    about: bnAbout,
    contact: bnContact,
  },
  mr: {
    common: mrCommon,
    homepage: mrHomepage,
    auth: mrAuth,
    admin: mrAdmin,
    about: mrAbout,
    contact: mrContact,
  },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    debug: false,

    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
    },

    interpolation: {
      escapeValue: false,
    },

    ns: ["common", "homepage", "auth", "admin", "about", "contact"],
    defaultNS: "common",
  })

export default i18n
