import Head from 'next/head'
import { Box, Container } from '@chakra-ui/react'
import Navbar from '../navbar'
import LazyModel from '../lazy-model'

const Main = ({ children, router }) => {
  return (
    <Box as="main" pb={8}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Pahak Rai - Homepage</title>
      </Head>
      {/* <Navbar path={router.asPath} /> */}
      <LazyModel />
      <Container
        pt={14}
        alignItems="center"
        w="100%"
        maxWidth="100%"
        px={{ base: 4, md: 8 }}
        position="relative"
        zIndex={1}
      >
        {children}
      </Container>
    </Box>
  )
}

export default Main
