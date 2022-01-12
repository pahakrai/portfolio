import Head from 'next/head'
import { Container } from 'react-bootstrap'
import Navbar from '../navbar'
const Main = ({ children, router }) => {
  return (
    <div as="main" pb={8}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Pahak Rai - Homepage</title>
      </Head>
      <Navbar path={router.asPath} />
      <Container fluid="md">{children}</Container>
    </div>
  )
}

export default Main
