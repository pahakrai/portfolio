import { ChakraProvider } from '@chakra-ui/react'
import { AnimatePresence } from 'framer-motion'
import { QueryClientProvider } from 'react-query'

import theme from '../lib/theme'
import { setGlobalLanguage } from '../lib/intl'
import { getAccessTokenFromReq } from '../lib/auth'
import { IntlProvider } from '../lib/intl/provider'
import { languageFilter } from '../lib/intl/checkLanguage'
import { getLanguageFromReq } from '../lib/intl/getLanguageFromReq'

import buildClient from '../utils/build-client'
import { queryClient } from '../utils/react-query-client'

import Fonts from '../components/fonts'
import Layout from '../components/layouts/main'
import { ThemeProvider, lightTheme, darkTheme } from '../lib/theme'

const AppComponent = ({
  Component,
  pageProps,
  router,
  language,
  currentUser
}) => {
  const bootstrapTheme = lightTheme || darkTheme
  return (
    <QueryClientProvider client={queryClient}>
      {/* <ChakraProvider theme={theme}> */}
      {/* <ThemeProvider theme={bootstrapTheme}> */}
      <IntlProvider locale={language}>
        <Fonts />
        <Layout router={router}>
          <AnimatePresence exitBeforeEnter initial={true}>
            <Component
              {...pageProps}
              currentUser={currentUser}
              key={router.route}
            />
          </AnimatePresence>
        </Layout>
      </IntlProvider>
      {/* </ThemeProvider> */}
      {/* </ChakraProvider> */}
    </QueryClientProvider>
  )
}

AppComponent.getInitialProps = async appContext => {
  const client = buildClient(appContext.ctx)
  // const appProps = await AppComponent.getInitialProps(acx)
  // get language from server side cookies
  const language = languageFilter(getLanguageFromReq(appContext.ctx.req))
  // const token = getAccessTokenFromReq(acx.ctx.req)
  // TODO: check setGlobalLanguage scope
  // set global language
  setGlobalLanguage(language)

  let data = undefined
  try {
    const response = await client.get('/users/1')
    if (response.data) data = response.data
  } catch (error) {
    // if server not connected log error on server
    console.error(error, 'client error here')
  }

  let pageProps = {}

  // override by child getInitialProps
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      client,
      data
    )
  }
  return {
    pageProps,
    language,
    // ...data
    currentUser: { ...data }
  }
}

export default AppComponent
