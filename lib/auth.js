import Cookies from 'js-cookie'
import cookie from 'cookie'
import jwt from 'jsonwebtoken'
import remove from 'lodash/remove'

const pjson = require('../package.json')
const COOKIE_PREFIX = pjson.name

// NOTE: MOVE TOKEN FUNCTIONS TO CookieTokenManager IF MORE FLEXIBLE
export const ACCESS_TOKEN = `${COOKIE_PREFIX}_access_token`
export const REFRESH_TOKEN = `${COOKIE_PREFIX}_refresh_token`

export const setToken = token => {
  const access_token = token.access_token
  const refresh_token = token.refresh_token
  setAccessToken(access_token)
  setRefreshToken(refresh_token)
}

export const setAccessToken = accessToken => {
  onAuthChanged(true) // broadcast auth changed
  Cookies.set(ACCESS_TOKEN, accessToken, {
    expires: 365, // should be lager than refresh
    sameSite: 'Lax'
  })
}

export const setRefreshToken = refreshToken => {
  const decodedAccessToken = jwtDecode(refreshToken)
  Cookies.set(REFRESH_TOKEN, refreshToken, {
    expires: new Date(decodedAccessToken.exp * 1000), // should be date or day number
    sameSite: 'Lax'
  })
}

export const clearToken = () => {
  onAuthChanged(false)
  Cookies.remove(ACCESS_TOKEN)
  Cookies.remove(REFRESH_TOKEN)
}

export const getAccessToken = () => {
  return Cookies.get(ACCESS_TOKEN)
}

export const getRefreshToken = () => {
  return Cookies.get(REFRESH_TOKEN)
}

export const isTokenValid = () => {
  const _accessToken = getAccessToken()
  const decodedAccessToken = _accessToken && jwt.decode(_accessToken)
  let valid = false
  if (decodedAccessToken && decodedAccessToken.exp >= Date.now() / 1000) {
    valid = true
  }
  return valid
}

// NOTE: REGISTER AUTH CHANGES
const queue = []

const onAuthChanged = authed => {
  queue.map(item => {
    item(authed)
  })
}

export const registAuthListener = callback => {
  const exist = queue.find(item => item === callback)
  if (!exist) {
    queue.push(callback)
    // then fist call
    callback(Boolean(getAccessToken()))
  }
  return () => {
    remove(queue, item => item === callback)
  }
}

export function getAccessTokenFromReq(req) {
  if (isBrowser() || !req) return undefined
  const httpCookie = cookie.parse(req.headers?.cookie || '')
  let access_token = ''
  if (httpCookie) {
    access_token = httpCookie[ACCESS_TOKEN]
  }
  return access_token
}
export function getRefreshTokenFromReq(req) {
  if (isBrowser() || !req) return undefined
  const httpCookie = cookie.parse(req.headers.cookie || '')
  let refresh_token = ''
  if (httpCookie) {
    refresh_token = httpCookie[REFRESH_TOKEN]
  }
  return refresh_token
}
export const isBrowser = () => {
  return typeof window !== 'undefined'
}
