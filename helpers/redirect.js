import React from 'react'
import Router from 'next/router'
import { format } from 'url'
import axios from 'axios'
import { dehydrate } from 'react-query'

import {
  getAccessTokenFromReq,
  getRefreshTokenFromReq,
  getAccessToken,
  getRefreshToken
} from '../lib/auth'
// TODO: test and use react query for fetching currenct user preload
import { isServer } from '../utils/build-client'

export const redirectUrl = (ctx) => {
  // create and format redirect url
  const url = {
    pathname: ctx.pathname,
    query: {
      ...ctx.query
    }
  }
  const formatedUrl = format(url)
  return formatedUrl
}

// export interface WithAuthRedirectOptions {
//   route?: string;
//   redirectIfAuthed?: boolean;
// }

export const withAuthRedirect = (options) => (Page) => {
  return class AuthRedirect extends React.Component {
    static async getInitialProps(ctx) {
      const _route = options?.route
        ? options.route
        : `/login-info/?redirect=${redirectUrl(ctx)}`
      let access_token
      if (isServer() && ctx.req?.headers?.cookie) {
        access_token = getAccessTokenFromReq(ctx.req)
      } else {
        access_token = getAccessToken()
      }
      let currentUserData
      let isLoggedIn = false
      try {
        const response = await axios.get(
          `${
            isServer()
              ? process.env.API_BASE_URL
              : process.env.NEXT_PUBLIC_API_BASE_URL
          }/current-user`,
          {
            headers: {
              Authorization: `Bearer ${access_token}`
            }
          }
        )
        if (response.data?.user) {
          currentUserData = response.data.user
          isLoggedIn = Boolean(response.data.user)
        }
      } catch (error) {
        // if server not connected log error on server
        isLoggedIn = false
      }

      const shouldRedirect = options?.redirectIfAuthed
        ? isLoggedIn
        : !isLoggedIn
      if (shouldRedirect) {
        if (ctx.res) {
          ctx.res.writeHead(302, {
            Location: _route
          })
          ctx.res.end()
        } else {
          Router.push(_route)
        }
      }

      let pageProps = {}

      //   const queryClient = new QueryClient()
      //   const access_token = getAccessTokenFromReq(context.req)
      //   const query = await queryClient.prefetchQuery('current-user', () =>
      //     fetchCurrentUser({ headers: { Authorization: `Bearer ${access_token}` } })
      //   )
      //   if (!query) {
      //     return pageProps
      //   }
      //   return {
      //     props: {
      //       dehydratedState: dehydrate(queryClient)
      //     }
      //   }

      if (Page.getInitialProps) {
        pageProps = await Page.getInitialProps({
          ...ctx
          //   dehydratedState: dehydrate(queryClient)
        })
      }
      // TIPS: avoid development mode throw getInitialProps return empty object warning add authed:true
      return { ...pageProps }
    }
    render() {
      return <Page {...this.props} />
    }
  }
}
