import axios from 'axios'
import Router from 'next/router'
import { Col, Container, Row } from 'react-bootstrap'
import { dehydrate, QueryClient } from 'react-query'
import Layout from '../components/layouts/article'
import { withAuthRedirect } from '../helpers/redirect'
import { fetchCurrentUser, useCurrentUser } from '../hooks/api/user'
import { getAccessToken, getAccessTokenFromReq } from '../lib/auth'
import { isServer } from '../utils/build-client'
import { compose } from 'recompose'

const Home = ({ currentUser }) => {
  const { currentUser: user } = useCurrentUser()
  return (
    <Layout>
      <Container>
        <Row className="justify-content-md-center">
          <Col sm="4">
            <p>Hello {(currentUser || user)?.email} you are logged in</p>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default compose(withAuthRedirect({}))(Home)
