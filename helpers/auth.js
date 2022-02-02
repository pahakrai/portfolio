import axios from 'axios'

import {
  getAccessTokenFromReq,
  getRefreshTokenFromReq,
  getAccessToken,
  getRefreshToken
} from '../lib/auth'
import { isServer } from '../utils/build-client'

import { redirectUrl } from './redirect'

// Functions down below could be placed in diffrent files
// And used for any pages where they could be needed
async function auth(ctx, pageProps, next) {
  // NOTE: CAN USE SESSION FOR THE SAME PURPOSE AS
  // FETCHING USER FROM REQUEST CONTEXT
  // const currentSession = await session(ctx)
  const _route = options?.route
    ? options.route
    : `/login-info/?redirect=${redirectUrl(ctx)}`
  let access_token
  if (isServer() && ctx.req?.headers?.cookie) {
    access_token = getAccessTokenFromReq(ctx.req)
  } else {
    access_token = getAccessToken()
  }
  const isLoggedIn = false
  let currentUserData
  try {
    const response = await axios.get(
      `${process.env.API_BASE_URL}/current-user`,
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

  if (!isLoggedIn) {
    pageProps.redirect = {
      destination: '/login-info',
      permanent: false
    }
    // Stop middlewares chain execution
    // because user not authorized to check this page
    return
  }

  // Populate user to page props and continue middlewares execution
  pageProps.props.user = currentUserData
  return next()
}
