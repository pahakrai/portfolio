import { getAccessToken, getRefreshToken } from '../lib/auth'
import client from './build-client'

export const request = ({ ...options }) => {
  // tokens from cookies
  const token = getAccessToken()
  // TODO: refersh token logic implementation
  const refreshToken = getRefreshToken()
  client.defaults.headers.common.Authorization = `Bearer ${token}`
  const onSuccess = response => response
  const onError = error => {
    return error
  }

  return client(options).then(onSuccess).catch(onError)
}
