import Cookies from 'js-cookie'
import BaseTokenManager from './BaseTokenManager'
import jwt from 'jsonwebtoken'

const pjson = require('../package.json')
const COOKIE_PREFIX = pjson.name

export const ACCESS_TOKEN = `${COOKIE_PREFIX}_access_token`
export const REFRESH_TOKEN = `${COOKIE_PREFIX}_refresh_token`

export const setToken = (token) => {
  const access_token = token.access_token
  const refresh_token = token.refresh_token
  setAccessToken(access_token)
  setRefreshToken(refresh_token)
}

export const setAccessToken = (accessToken) => {
  onAuthChanged(true) // broadcast auth changed
  Cookies.set(ACCESS_TOKEN, accessToken, {
    expires: 365, // should be lager than refresh
    sameSite: 'Lax'
  })
}

export const setRefreshToken = (refreshToken) => {
  const decodedAccessToken = jwt.decode(refreshToken)
  Cookies.set(REFRESH_TOKEN, refreshToken, {
    expires: new Date(decodedAccessToken.exp * 1000), // should be date or day number
    sameSite: 'Lax'
  })
}

export const clearToken = () => {
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
  const decodedAccessToken = _accessToken && jwtDecode(_accessToken)
  let valid = false
  if (decodedAccessToken && decodedAccessToken.exp >= Date.now() / 1000) {
    valid = true
  }
  return valid
}
export default class CookieTokenManager extends BaseTokenManager {
  /**
   *
   * @param {string} token  token
   * @param {string} [config.cookieName = 'appcookie'] Use cookie name
   * @param {number} [config.cookieExpire = 365] cookie expire date
   * @memberof AuthManager
   */
  _start() {
    this.token = this.getToken()
  }

  /**
   *
   * @param {string} token token
   */
  setToken(tokenObj) {
    if (!tokenObj) {
      this.notifyUnAuthenticate()
    } else {
      const config = this._getConfig()
      // timestamp to days
      const expireDays = 365
      // set Token to cookie
      Cookies.set(config.cookieName, tokenObj, {
        expires: expireDays
      })
      // save token and expireAt to local variable
      this.token = tokenObj
      this.notifyAuthenticated()
    }
  }

  /**
   * Get token from cookie
   */
  getToken() {
    const config = this._getConfig()
    if (this.token) return this.token
    // get token from cookie
    const cookieToken = Cookies.get(config.cookieName)
    // return cookie object or undefined
    return cookieToken ? JSON.parse(cookieToken) : undefined
  }

  hasToken() {
    return Boolean(this.getToken())
  }

  getAccessToken() {
    const token = this.getToken()
    return token ? token.access_token : ''
  }

  clearToken() {
    const config = this._getConfig()
    Cookies.remove(config.cookieName)
    this.token = null
    this.notifyUnAuthenticate()
  }

  isAuthenticated() {
    // ensure: token exists, access_token exists and expires_on has not expire yet
    return (
      this.token &&
      this.token.access_token &&
      // timestamp expires_on
      this.token.expires_on * 1000 > new Date().valueOf()
    )
  }
}
