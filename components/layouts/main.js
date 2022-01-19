import styled from '@emotion/styled'
import Head from 'next/head'
import { Container } from 'react-bootstrap'
import { IoLogoFreebsdDevil } from 'react-icons/io'
import Navbar from '../navbar'

const ContainerFull = styled.div(`
  padding-left: 0;
  padding-right: 0;
  // height: 100vh;
`)
const Main = props => {
  return (
    <div as="main">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Pahak Rai - Homepage</title>
      </Head>
      <Navbar path={props.router.asPath} />
      <ContainerFull fluid>{props.children}</ContainerFull>
      {/* SOME FOOTER HERE FOR LARGE SCREEN ONLY */}
    </div>
  )
}

export default Main
