import { Col, Container, Row } from 'react-bootstrap'
import { FormProvider, useForm } from 'react-hook-form'
import Layout from '../components/layouts/article'
import SignIn from '../components/sign-in'

const Login = () => {
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

  const onClickSubmit = values => {
    const { email, password } = values
  }

  return (
    <Layout>
      <Container>
        <Row className="justify-content-md-center">
          <Col sm="4">
            <FormProvider {...methods}>
              <SignIn onClickSubmit={onClickSubmit} />
            </FormProvider>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default Login
