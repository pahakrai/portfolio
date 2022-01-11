import client from './build-client'

export const request = ({ ...options }) => {
  // tokens from cookies
  const token = 'randomstring'
  // TODO: refersh token logic implementation
  const refreshToken = 'randomstring'
  client.defaults.headers.common.Authorization = `Bearer ${token}`
  const onSuccess = response => response
  const onError = error => {
    return error
  }

  return client(options).then(onSuccess).catch(onError)
}
