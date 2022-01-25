import React, { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import { compose } from 'recompose'

import { useCurrentUser } from '../hooks/api/user'
import { withAuthRedirect } from '../helpers/redirect'

import Task from '../components/task'
import Notice from '../components/notice'
import Balance from '../components/balance'
import Layout from '../components/layouts/article'
import styled from '@emotion/styled'

import { P, Spacer } from '../components/common'

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
    <Layout>
      <Container
        style={{
          maxWidth: '400px',
          marginTop: '10vh',
          marginBottom: '10vh'
        }}
      >
        <Row>
          {/* TODO: Build next schedule components here*/}
          {/* <NextSchedule /> */}
          <Task />
          <HomeSection>
            <P>Hello {(currentUser || user)?.email} you are logged in</P>
            <Balance currentUser={currentUser || user} />
            {/* TODO: Charity Notice Component Here */}
            <Spacer height={'32px'} />
            <Notice />
          </HomeSection>
        </Row>
      </Container>
    </Layout>
  )
}

export default compose(withAuthRedirect({}))(Home)
