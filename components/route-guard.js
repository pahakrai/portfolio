import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import { useCurrentUser } from '../hooks/api/user'

// USE OBSERVABLE user IN LOCALSTORAGE FROM UserService

const RouteGuard = ({ children }) => {
  const router = useRouter()
  const [authorized, setAuthorized] = useState(false)

  const { currentUser, loading: userLoading } = useCurrentUser() // temp test

  useEffect(() => {
    // on initial load - run auth check
    authCheck(router.pathname)

    // on route change start - hide page content by setting authorized to false
    const hideContent = () => setAuthorized(false)
    router.events.on('routeChangeStart', hideContent)

    // on route change complete - run auth check
    router.events.on('routeChangeComplete', authCheck)

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off('routeChangeStart', hideContent)
      router.events.off('routeChangeComplete', authCheck)
    }
  }, [])

  const authCheck = url => {
    // redirect to login page if accessing a private page and not logged in
    const publicPaths = ['/login', '/signup']
    const path = url.split('?')[0]
    // NOTE: USE currentUser OR LOCALSTORAGE user DATA
    if (!currentUser && !publicPaths.includes(path)) {
      setAuthorized(false)
      router.push({
        pathname: '/login',
        query: { returnUrl: router.asPath }
      })
    } else {
      setAuthorized(true)
    }
  }

  return authorized && children
}

export default RouteGuard