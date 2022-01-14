import axios from 'axios'
import {
  clearToken,
  getAccessToken,
  getRefreshToken,
  setToken
} from '../lib/auth'

const UNAUTHORIZED_EXCEPTION = 'UNAUTHORIZED_EXCEPTION'
// replace from process env config
const API_BASE_URL = 'http://localhost:3000/'

const client = axios.create({
  baseURL: API_BASE_URL
})

export const fetchAccessTokenAsync = async (access, refresh) => {
  const data = {
    query: `mutation REFRESH_TOKEN {refreshToken(refreshToken: "${refresh}") {${USER_TOKEN_FIELDS}}}`
  }
  return fetch(Config.GRAPHQL_URL, {
    method: 'post',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access}`,
      ...getSecurityParams()
    },
    body: JSON.stringify(data)
  })
}

export const refreshToken = async (access, refresh) => {
  let token = undefined
  try {
    if (access && refresh) {
      const response = await fetchAccessTokenAsync()
      const json = await response.json()
      token = json.data.refreshToken
      if (!token) {
        throw new Error('Refresh token invalid')
      }
      if (!isServer()) {
        setToken(token)
      }
    }
  } catch (error) {
    console.info('Try fetch access token by refresh token but:', error)
    if (!isServer()) {
      logout()
      Router.reload()
    }
  }
  return token
}

export const getSecurityParams = () => {
  //   const TIMESTAMP = moment.utc().valueOf().toString()
  //   const apiSecurityParam = getAPIHeader(
  //     Config.WORKSPACE,
  //     Config.WORKSPACE_SECRET
  //   )

  //   return {
  //     workspace: apiSecurityParam?.workspace,
  //     timestamp: apiSecurityParam?.timestamp?.toString() || TIMESTAMP,
  //     'safe-key': apiSecurityParam?.['safe-key']
  //   }
  return {}
}

const composeInterceptors =
  (...fns) =>
  x =>
    fns.reduce((v, f) => f(v), x)

const languageInterceptor = (reqContext = {}) => {
  // language header interceptors
  return { headers: { ...reqContext.headers, lang: 'en' } }
}

const securityInterceptor = (reqContext = {}) => {
  const access_token = getAccessToken()
  // security header interceptors
  return {
    headers: { ...reqContext.headers, Authorization: `Bearer ${access_token}` }
  }
}

const loggerInterceptor = (reqContext = {}) => {
  // logging interceptor on request and response success
  return {
    ...reqContext
  }
}

const errorInterceptor = reqContext => {
  // can add interceptor for logging on error
  return {
    ...reqContext,
    requestErrorInterceptors: [
      ...(reqContext.requestErrorInterceptors || []),
      () => false
    ],
    responseErrorInterceptors: [
      ...(reqContext.responseErrorInterceptors || []),
      async function (error) {
        const originalRequest = error.config
        if (error.response.status === 403 && !originalRequest._retry) {
          originalRequest._retry = true
          const access_token = await fetchAccessTokenAsync()
          axios.defaults.headers.common['Authorization'] =
            'Bearer ' + access_token
          return client(originalRequest)
        }
        return Promise.reject(error)
      }
    ]
  }
}

const apiInterceptors = composeInterceptors(
  languageInterceptor,
  securityInterceptor,
  loggerInterceptor,
  errorInterceptor
)

const request = options => {
  const interceptors = apiInterceptors(options)
  // Request interceptor for API calls
  client.interceptors.request.use(
    async config => {
      config.headers = {
        ...(interceptors?.headers || {}),
        Accept: 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded'
      }
      return config
    },
    error => {
      Promise.reject(error)
    }
  )

  interceptors?.responseErrorInterceptors?.map(errorInterceptor => {
    return client.interceptors.response.use(response => {
      return response
    }, errorInterceptor)
  })
  return client(options)
}

export default request
