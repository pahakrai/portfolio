export const languageFilter = language => {
  let _language = 'en-US'
  const supportedLanguages = ['en-US']
  if (language && supportedLanguages.find(value => language == value))
    _language = language
  return _language
}
