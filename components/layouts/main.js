import Head from 'next/head'
import dynamic from 'next/dynamic'
import { Box, Container } from '@chakra-ui/react'
import Navbar from '../navbar'
import ModelLoader from '../three-model-wrapper'

const LazyModel = dynamic(() => import('../three-model'), {
  ssr: false,
  loading: () => <ModelLoader />
})

const Main = ({ children, router }) => {
  return (
    <Box as="main" pb={8}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Pahak Rai - Homepage</title>
      </Head>
      <Navbar path={router.asPath} />
      <Container maxW="container.lg" pt={14}>
        <LazyModel />
        {children}
      </Container>
    </Box>
  )
}

export default Main
