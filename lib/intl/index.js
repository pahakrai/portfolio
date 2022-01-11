import { useEffect, useState } from 'react'
import { storeCurrentLanguage } from './persist'
import { languageFilter } from './checkLanguage'

// interface useLocalData {
//   current: string;
//   locale: string;
//   changeLanguage: (current: string) => void;
// }
// type LanguageListener = (language: string) => void

// global instance for every client|request
let _language = 'en-US'
let languageListener = []

export const locales = {
  localeList: {
    // list for priority for fallback to cetain similar languages
    en: ['en']
  },
  defaultLocale: 'en'
}

/**
 * convert input language code to en or other languages added
 * @param {string} language Language code that get from req.headers['accept-language'] or I18n.currentLocale()
 * @returns {string} 'en'
 */
export const getLocale = (language = 'en') => {
  const langList = language
    .toLowerCase()
    .replace(/#/g, '')
    .replace(/_/g, '-')
    .split('-')
  const ranks = [4, 2, 1]
  if (langList.length === 2) ranks.splice(1, 1)

  // unknown locale string
  if (langList.length > 3) {
    return locales.defaultLocale
  }

  // calculate ranking of each locale
  const langRank = Object.entries(locales.localeList)
    .map(([langCode, keywords]) => {
      let rank = 0
      langList.forEach((l, i) => {
        if (keywords.includes(l)) {
          rank += ranks[i]
        }
      })
      return { language: langCode, rank }
    })
    .filter(({ rank }) => rank > 0)
    .sort((a, b) => (a.rank < b.rank ? 1 : -1))

  return langRank[0] ? langRank[0].language : locales.defaultLocale
}

export const setGlobalLanguage = language => {
  _language = languageFilter(language)
}

/* cb params on the changes subscription are LanguageListener type */
export const subscribeLanguageChange = cb => {
  const exist = languageListener.find(item => item === cb)
  if (exist) {
    return
  } else {
    languageListener.push(cb)
  }
}

export const unsubscribeLanguageChange = cb => {
  languageListener = languageListener.filter(item => item !== cb)
}
/* end */

/* current param is string */
export const changeLanguage = current => {
  const newLanguage = languageFilter(current)
  // change language
  _language = newLanguage // change global language
  if (typeof window === 'undefined') {
  } else {
    // persist to cookie if client side
    storeCurrentLanguage(newLanguage)
  }
  languageListener.map(item => {
    // map listener
    item(newLanguage)
  })
}

/* language param is type useLocalData */
export const useLocale = language => {
  const [locale, setLocale] = useState(_language || languageFilter(language))
  // callback is languageListener
  const callback = current => {
    // occured when language changed
    setLocale(current)
  }
  useEffect(() => {
    subscribeLanguageChange(callback)
    return () => unsubscribeLanguageChange(callback)
  })

  return { current: locale, locale: getLocale(locale), changeLanguage }
}
