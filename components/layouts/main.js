import styled from '@emotion/styled'
import Head from 'next/head'
import { Container } from 'react-bootstrap'
import NavBar from '../navbar'

const ContainerFull = styled(Container)`
  padding-left: 0;
  padding-right: 0;
  height: 100vh;
`

const MainContainer = styled.main`
  background-color: ${(props) => props.theme.colors.themeColor1};
`

const LayoutMain = (props) => {
  return (
    <MainContainer>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Pahak Rai - Homepage</title>
      </Head>
      <NavBar path={props.router.asPath} />
      <ContainerFull fluid>{props.children}</ContainerFull>
    </MainContainer>
  )
}

export default LayoutMain
