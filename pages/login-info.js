import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import Image from 'next/image'
import { compose } from 'recompose'
import { useRouter } from 'next/router'

import { useCurrentUser } from '../hooks/api/user'
import { withAuthRedirect } from '../helpers/redirect'

import { P, H3, PageContainer } from '../components/common'

const LoginInfo = ({ currentUser }) => {
  const { currentUser: user } = useCurrentUser()
  const router = useRouter()
  return (
    <PageContainer>
      <Image src={'/images/pahak.png'} width={400} height={400} />
      <Row>
        <H3>Enter Your Details</H3>
        <P style={{ textAlign: 'center' }}>
          Prompt and reliable home or business pick-up
        </P>
      </Row>
      <Row>
        <H3>We&apos;ll take care of the rest</H3>
        <P style={{ textAlign: 'center' }}>
          Prompt and accurate payment QR Code on each bin for payment security
        </P>
      </Row>
      <Row>
        <Col style={{}}>
          <Button
            onClick={() => {
              router.push('/signup')
            }}
            style={{ width: '100%' }}
            disabled={false}
          >
            Sign Up
          </Button>
        </Col>
        <Col style={{}}>
          <Button
            onClick={() => {
              router.push('/login')
            }}
            style={{ width: '100%' }}
            disabled={false}
          >
            Sign In
          </Button>
        </Col>
      </Row>
    </PageContainer>
  )
}

export default compose(
  withAuthRedirect({ route: '/', redirectIfAuthed: true })
)(LoginInfo)
