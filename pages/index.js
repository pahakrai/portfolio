import { Col, Container, Row } from 'react-bootstrap'
import { FormProvider, useForm } from 'react-hook-form'
import Layout from '../components/layouts/article'
import SignIn from '../components/sign-in'
import { useUserLogin } from '../hooks/api/user'

const Home = () => {
  const methods = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onBlur',
    defaultValues: {},
    resolver: undefined, // add yup here
    context: undefined,
    criteriaMode: 'all', // firstError
    shouldFocusError: true,
    shouldUnregister: false,
    shouldUseNativeValidation: false,
    delayError: undefined
  })

  const onSuccess = () => false
  const onError = () => false

  const { mutate: login, error, loading } = useUserLogin(onSuccess, onError)

  const onClickSubmit = values => {
    const { email, password } = values
    login({ email, password })
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

export default Home
