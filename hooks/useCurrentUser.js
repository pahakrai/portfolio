import React from 'react'
import { useQuery } from 'react-query'
import { registAuthListener } from '../lib/auth'
import { request } from '../utils/axios-utils'

// interface useCurrentUserArgs {
//   field?: string;
//   onCompleted?: (user?: IUser) => void;
//   onError?: () => void;
// }

// interface useCurrentUserHook {
//   currentUser?: IUser;
//   loading?: boolean;
// }

const getCurrentUser = () => {
    return request({ url: '/auth/current-user'})
}

const addUser = (data) => {
    return request({ url: '/auth/current-user', method: 'post', data})
}

export const useCurrentUser = (
  args // useCurrentUserArgs
) //  useCurrentUserHook 
=> {
  const [authed, setAuthed] = React.useState(false)
  const { data, loading } =
    useQuery('current-user', getCurrentUser,
    {
      skip: !authed,
      onSuccess: data => {
        const currentUser = data
        if (currentUser) {
          args?.onCompleted?.(currentUser)
        } else {
          args?.onError?.()
        }
      },
      onError: () => {
        args?.onError?.()
      }
    })
  React.useEffect(() => {
    const handler = registAuthListener((authed) => {
      setAuthed(authed)
    })
    return () => {
      handler()
    }
  }, [])
  return { currentUser: data, loading }
}
