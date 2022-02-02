import { Row, Col, Button } from 'react-bootstrap'
import { FormProvider, useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'
import { compose } from 'recompose'

import { withAuthRedirect } from '../helpers/redirect'

import SignUp from '../components/sign-up'
import { PageContainer } from '../components/common'

const SignUpPage = () => {
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
      <Row>
        <Col>
          <p> Sign Up </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormProvider {...methods}>
            <SignUp />
          </FormProvider>
        </Col>
      </Row>
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

export default compose(
  withAuthRedirect({ route: '/', redirectIfAuthed: true })
)(SignUpPage)
