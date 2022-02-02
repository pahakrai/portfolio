import { Button, Col, Row } from 'react-bootstrap'
import { useIntl } from 'react-intl'
import Link from 'next/link'
import { compose } from 'recompose'

import { useRouter } from 'next/router'
import { withAuthRedirect } from '../helpers/redirect'
import { H3, P, PageContainer } from '../components/common'

const obscureEmail = email => {
  const [name, domain] = email.split('@')
  return `${name[0]}${new Array(name.length).join('*')}@${domain}`
}

const EmailNotice = () => {
  const intl = useIntl()
  const router = useRouter()

  const emailAdd = obscureEmail('rai.pahak@gmail.com')

  return (
    <PageContainer>
      <Row>
        <Col>
          <H3>
            Check your email and click on the verification link to continue
          </H3>
        </Col>
      </Row>
      <Row>
        <Col>
          <P>A verification email has been sent to email address {emailAdd}</P>
        </Col>
      </Row>
      <Row>
        <Col>
          <Link href="/">
            <P>Resend Verification Email</P>
          </Link>
        </Col>
      </Row>
      <Row style={{ gap: '1rem' }} className="justify-content-between">
        <Col>
          <Button
            variant="primary"
            type="submit"
            style={{ width: '100%' }}
            onClick={() => false}
          >
            {intl.formatMessage({ id: 'display_next' })}
          </Button>
        </Col>
      </Row>
    </PageContainer>
  )
}

export default compose(
  withAuthRedirect({ route: '/', redirectIfAuthed: true })
)(EmailNotice)
