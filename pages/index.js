import React from 'react'
import { Row } from 'react-bootstrap'
import { compose } from 'recompose'
import styled from '@emotion/styled'

import { useCurrentUser } from '../hooks/api/user'
import { withAuthRedirect } from '../helpers/redirect'

import Task from '../components/task'
import Notice from '../components/notice'
import Balance from '../components/balance'
import { H3, P, Spacer } from '../components/common'
import { PageContainer } from '../components/common'
import LocationsBottomNav from '../components/locations-bottom-nav'
import Card from '../components/card'
import serverSidePropsCompose from '../lib/serverSidePropsCompose'
import auth from '../helpers/auth'

const HomeSection = styled.div`
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  border: 3px solid #00000090;
  padding: 16px;
  height: 100%;
  width: 100%;
`

const Home = ({ currentUser }) => {
  const { currentUser: user } = useCurrentUser()
  return (
    <PageContainer>
      <Card style={{}}>
        <H3>Get started by placing your first order</H3>
        <P>
          200 Mawson Lakes Boulevard
          <br />
          Mawson Lakes SA 5095
        </P>
      </Card>
      <Spacer height={'32px'} />
      <Row>
        <Task />
        <HomeSection>
          <P>Hello {(currentUser || user)?.email} you are logged in</P>
          <Balance currentUser={currentUser || user} />
          <Spacer height={'32px'} />
          <Notice />
        </HomeSection>
      </Row>
      <LocationsBottomNav />
    </PageContainer>
  )
}

// export const getServerSideProps = serverSidePropsCompose(auth({}))

export default compose(withAuthRedirect({}))(Home)
// export default Home
