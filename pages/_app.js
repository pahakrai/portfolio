import { useState } from 'react'
import App, { AppContext } from 'next/app'
import { AnimatePresence } from 'framer-motion'
import { QueryClientProvider, Hydrate } from 'react-query'
import { ThemeProvider } from '@emotion/react'

import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'

import { setGlobalLanguage } from '../lib/intl'
import theme, { THEME_TYPE } from '../lib/theme'
import {
  getAccessTokenFromReq,
  getRefreshTokenFromReq,
  getAccessToken,
  getRefreshToken
} from '../lib/auth'
import { IntlProvider } from '../lib/intl/provider'
import { languageFilter } from '../lib/intl/checkLanguage'
import { getLanguageFromReq } from '../lib/intl/getLanguageFromReq'

import { queryClient } from '../utils/react-query-client'

import Fonts from '../components/fonts'
import LayoutMain from '../components/layouts/main'
import ServiceWorker from '../components/scripts/service-worker'

const AppComponent = ({ Component, pageProps, router }) => {
  const [mode, setMode] = useState(THEME_TYPE.LIGHT)
  const toggleMode = (mode) => {
    setMode(mode)
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ThemeProvider
          theme={{
            ...theme(mode),
            toggleTheme: toggleMode
          }}
        >
          <IntlProvider locale={pageProps.language}>
            <Fonts />
            <ServiceWorker />
            <LayoutMain router={router}>
              <AnimatePresence exitBeforeEnter initial={true}>
                <Component {...pageProps} key={router.route} />
              </AnimatePresence>
            </LayoutMain>
          </IntlProvider>
        </ThemeProvider>
      </Hydrate>
    </QueryClientProvider>
  )
}

AppComponent.getInitialProps = async (acx) => {
  // NOTE: CHECK WHY buildClient CLIENT HEADERS HAS ISSUES
  // let access_token
  // if (isServer() && acx.ctx.req?.headers?.cookie) {
  //   access_token = getAccessTokenFromReq(acx.ctx.req)
  // } else {
  //   access_token = getAccessToken()
  // }
  // let currentUserData
  // try {
  //   const response = await axios.get(`${process.env.API_BASE_URL}/current-user`, {
  //     headers: {
  //       Authorization: `Bearer ${access_token}`
  //     }
  //   })
  //   if (response.data?.user) currentUserData = response.data.user
  // } catch (error) {
  //   // if server not connected log error on server
  // }
  const appProps = await App.getInitialProps(acx)
  const language = languageFilter(getLanguageFromReq(acx.ctx.req)) // get language from server side cookies
  const token = getAccessTokenFromReq(acx.ctx.req)
  setGlobalLanguage(language) // set global language
  // for all page with pageParam

  let pageProps = {}
  // NOTE: OVERRIDE THE CHILD PAGE PROPS
  if (acx.Component.getInitialProps) {
    pageProps = await acx.Component.getInitialProps(
      acx.ctx
      // NOTE: CHECK WHY CURRENT USER DATA IS DELAYED TO CHILD PAGES
      // currentUserData // current user pass to other pages
    )
  }

  return {
    ...appProps,
    pageProps: {
      ...pageProps,
      language,
      token,
      ...appProps?.pageProps,
      pageParam: (
        acx.ctx?.req ||
        // when isServer = false, get pageProps
        (typeof window !== 'undefined' &&
          window?.__NEXT_DATA__?.props?.initialProps?.pageProps)
      )?.pageParam
    }
  }
}

export default AppComponent
