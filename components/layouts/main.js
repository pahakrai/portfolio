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
      <Navbar path={router.asPath} />
      <LazyModel onClickTag={t => setTag(t)} />
      <Container
        pt={14}
        alignItems={'auto'}
        w="100%"
        maxWidth="100%"
        paddingInline={0}
        position="absolute"
        // zIndex={99}
      >
        {children}
      </Container>
    </Box>
  )
}

export default Main
