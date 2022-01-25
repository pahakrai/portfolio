import axios from 'axios'
import Router from 'next/router'
import { Col, Container, ProgressBar, Row } from 'react-bootstrap'
import { dehydrate, QueryClient } from 'react-query'
import Layout from '../components/layouts/article'
import { withAuthRedirect } from '../helpers/redirect'
import { fetchCurrentUser, useCurrentUser } from '../hooks/api/user'
import { getAccessToken, getAccessTokenFromReq } from '../lib/auth'
import { isServer } from '../utils/build-client'
import { compose } from 'recompose'
import Carousel from '../components/carousel'

import React, { useEffect, useState } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'

import SwiperCore, { Pagination } from 'swiper'
import styled from '@emotion/styled'
import SelectCard from '../components/select-card'
import Subscription from '../components/subscription-form'

SwiperCore.use([Pagination])

const SubscriptionPage = ({ currentUser }) => {
  const { currentUser: user } = useCurrentUser()
  const [progress, setProgress] = useState(10)
  useEffect(() => {
    return () => {}
  }, [])
  return (
    <Layout>
      {/* <Row style={{ marginTop: '20px' }}>
        <SelectCard types={['radio']} />
      </Row> */}
      <Container
        style={{
          maxWidth: '400px',
          marginTop: '10vh',
          marginBottom: '10vh'
        }}
      >
        <Subscription />
      </Container>
    </Layout>
  )
}

export default compose(withAuthRedirect({}))(SubscriptionPage)
