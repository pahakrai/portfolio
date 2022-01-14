import { useQuery, useMutation } from 'react-query'
import { registAuthListener } from '../../lib/auth'
import request from '../../utils/api-utils'

// auth and user network request and query hooks
const fetchCurrentUser = () => {
  return request({ url: '/auth/current-user' })
}

const login = data => {
  return request({ url: '/api/login', method: 'post', data })
}

const signUpUser = data => {
  return request({ url: '/auth/signup/current-user', method: 'post', data })
}

export const useUserLogin = (onSuccess, onError) => {
  return useMutation(login, { onSuccess, onError })
}

export const useCurrentUser = (onSuccess, onError) => {
  const [authed, setAuthed] = React.useState(false)

  // NOTE: FOR REFERENCE RELATED TO GRAPHQL
  //   const { data, loading } =
  //     useQuery('current-user', getCurrentUser,
  //     {
  //       skip: !authed,
  //       onSuccess: data => {
  //         const currentUser = data
  //         if (currentUser) {
  //           args?.onCompleted?.(currentUser)
  //         } else {
  //           args?.onError?.()
  //         }
  //       },
  //       onError: () => {
  //         args?.onError?.()
  //       }
  //     })

  const { data, loading, isFetching, error, isError } = useQuery(
    'current-user',
    fetchCurrentUser,
    {
      enabled: authed,
      onSuccess,
      onError,
      select: () => {
        // custom data interceptor for structuring
      }
    }
  )
  useEffect(() => {
    const handler = registAuthListener(authed => {
      setAuthed(authed)
    })
    return () => {
      handler()
    }
  }, [])

  return { currentUser: data, loading: loading || isFetching }
}
