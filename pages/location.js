import { Row, Col, Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'
import { compose } from 'recompose'

import { withAuthRedirect } from '../helpers/redirect'

import LocationForm from '../components/location'
import { H3, P, PageContainer } from '../components/common'

const LocationPage = () => {
  const intl = useIntl()
  const methods = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    defaultValues: {},
    resolver: undefined,
    context: undefined,
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: false,
    shouldUseNativeValidation: false,
    delayError: undefined
  })

  return (
    <PageContainer>
      <H3>Provide Your Location</H3>
      <P>Where will your bin(s) be kept</P>
      <LocationForm />
      <Row>
        <Col>
          <Button variant="primary" type="submit" style={{ width: '100%' }}>
            {intl.formatMessage({ id: 'display_next' })}
          </Button>
        </Col>
      </Row>
    </PageContainer>
  )
}

export default compose(withAuthRedirect({}))(LocationPage)
