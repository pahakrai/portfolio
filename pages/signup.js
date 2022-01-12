import { Container, Row, Col } from 'react-bootstrap'
import { FormProvider, useForm } from 'react-hook-form'
import Layout from '../components/layouts/article'
import SignUp from '../components/sign-up'

export default () => {
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
    <Layout>
      <Container>
        <Row className="justify-content-md-center">
          <Col sm="4">
            <FormProvider {...methods}>
              <SignUp />
            </FormProvider>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}
