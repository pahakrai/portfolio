import { useState, useEffect } from 'react'
import { useQuery, useMutation } from 'react-query'
import { registAuthListener } from '../../lib/auth'
import request from '../../utils/api-utils'

// auth and user network request and query hooks
export const fetchCurrentUser = (options) => {
  return request({
    url: '/current-user',
    method: 'get',
    ...(options || {})
  })
}

// const fetchUserById = id => {
//   // some api
// }

// const queryByIDExample = id => {
//   return useQuery(['user', id], fetchUserById)
// }

const login = (data) => {
  return request({ url: '/login', method: 'post', data })
}

const signUpUser = (data) => {
  return request({ url: '/signup', method: 'post', data })
}

export const useUserLogin = (onSuccess, onError) => {
  return useMutation(login, { onSuccess, onError })
}

export const useCurrentUserMutation = (onSuccess, onError) => {
  return useMutation(fetchCurrentUser, { onSuccess, onError })
}

export const useCurrentUser = (onSuccess, onError) => {
  const [authed, setAuthed] = useState(false)
  const { data, loading, isFetching, error, isError } = useQuery(
    'current-user',
    fetchCurrentUser,
    {
      enabled: authed,
      onSuccess,
      onError,
      retry: false
    }
  )

  useEffect(() => {
    const handler = registAuthListener((authed) => {
      setAuthed(authed)
    })
    return () => {
      handler()
    }
  }, [])

  return { currentUser: data?.data?.user, loading: loading || isFetching }
}
