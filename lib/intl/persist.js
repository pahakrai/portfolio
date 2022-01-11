import Cookies from 'js-cookie'

export const storeCurrentLanguage = language => {
  Cookies.set('language', language)
}

export const getCurrentLanguage = () => {
  return Cookies.get('language')
}
