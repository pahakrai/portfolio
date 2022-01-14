import Cookies from 'js-cookie'

// NOTE: FOR ADDED SECURITY ONLY ROUGH ONLY
// NOT IN USE CURRENTLY
const getAPIHeader = (workspace, workspaceSecret) => {
  const timestamp = new Date.now()
  const safeKey = 'r@ndom4tr1ng' // from workspace and workspaceSecret
  return {
    workspace,
    timestamp,
    'safe-key': safeKey
  }
}

export default class SafeKeyManager {
  constructor(key, config = {}) {
    this.config = {
      refreshTime: 2000, // 2s
      cookieName: process.env.REACT_APP_WORKSPACE_SECRET_COOKIE_NAME,
      ...config
    }
  }
  generate(_workspace, _secret) {
    const {
      workspace,
      timestamp,
      'safe-key': safeKey
    } = getAPIHeader(_workspace, _secret)
    const values = {
      workspace,
      timestamp,
      'safe-key': safeKey,
      secret: _secret
    }
    this.set(values)
    return values
  }
  set(values) {
    const { cookieName } = this.config
    Cookies.set(cookieName, values, {
      expires: 365
    })
  }
  get() {
    try {
      const { cookieName, refreshTime } = this.config

      const newTimestamp = Date.now()
      const result = Cookies.get(cookieName)
      let values = JSON.parse(result)
      // refresh
      if (newTimestamp - values.timestamp > refreshTime) {
        values = this.generate(values.workspace, values.secret)
      }
      return result ? values : {}
    } catch (e) {
      return {}
    }
  }
  has() {
    const { workspace, 'safe-key': safeKey, timestamp } = this.get()
    return Boolean(workspace && safeKey && timestamp)
  }
  clear() {
    const { cookieName } = this.config
    Cookies.remove(cookieName)
  }
}
