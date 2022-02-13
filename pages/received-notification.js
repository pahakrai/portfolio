import { Button, Col, Row } from 'react-bootstrap'
import { useIntl } from 'react-intl'
import Link from 'next/link'
import { compose } from 'recompose'

import { useRouter } from 'next/router'
import { withAuthRedirect } from '../helpers/redirect'
import { H3, P, PageContainer } from '../components/common'
import Card from '../components/card'

const obscurePhone = (phNumber) => {
  let phoneString = phNumber.replace(/\d(?=\d{2})/g, '*')
  phoneString = phoneString.match(/.{1,4}/g)
  return phoneString.join(' ')
}

const ReceivedNotification = () => {
  const intl = useIntl()
  const router = useRouter()

  const phoneNumber = '+85245187801'

  return (
    <PageContainer>
      <Row>
        <Col>
          <H3>
            Thank you. Your notification has been received and will be actioned
            promptly.
          </H3>
        </Col>
      </Row>
      <Card>
        <H3>Wednesday 30 June between 9am-10am</H3>
        <P>
          Gwarko-17
          <br />
          Lalitpur
        </P>
        <P>
          A notification has been sent to mobile number ending in
          {obscurePhone(phoneNumber)}
        </P>
      </Card>
    </PageContainer>
  )
}

export default compose(withAuthRedirect({}))(ReceivedNotification)
