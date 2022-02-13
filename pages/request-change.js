import { Button, Col, Form, Row } from 'react-bootstrap'
import { useIntl } from 'react-intl'
import { compose } from 'recompose'

import { useRouter } from 'next/router'
import { withAuthRedirect } from '../helpers/redirect'
import { H3, PageContainer } from '../components/common'

const RequestChange = () => {
  const intl = useIntl()
  const router = useRouter()

  return (
    <PageContainer>
      <Row>
        <Col>
          <H3>
            Need to change your pick-up date? Moving house and need to postpone
            your service? Let us know
          </H3>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form>
            <Form.Group className="mb-3" controlId="requestChangeText">
              <Form.Label>Request Changes</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            variant="primary"
            type="submit"
            style={{ width: '100%' }}
            onClick={() => false}
          >
            {intl.formatMessage({ id: 'display_request_change' })}
          </Button>
        </Col>
      </Row>
    </PageContainer>
  )
}

export default compose(withAuthRedirect({}))(RequestChange)
