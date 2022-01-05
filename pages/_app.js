import { ChakraProvider } from '@chakra-ui/react'

import theme from '../libs/theme'

import Fonts from '../components/fonts'
import Layout from '../components/layouts/main'

const Website = ({ Component, pageProps, router }) => {
  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <Layout router={router}>
        {/* <AnimatePresence exitBeforeEnter initial={true}> */}
        <Component {...pageProps} key={router.route} />
        {/* </AnimatePresence> */}
      </Layout>
    </ChakraProvider>
  )
}

export default Website
