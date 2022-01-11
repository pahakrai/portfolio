import cookie from 'cookie'

export function getLanguageFromReq(req) {
  const httpCookie = cookie.parse(
    req ? req.headers.cookie || '' : document.cookie
  )
  let language // default en-US
  if (httpCookie) {
    language = httpCookie.language
  }
  return language
}
