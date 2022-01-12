import { useForm, FormProvider, useFormContext } from 'react-hook-form'

import SignIn from '../components/sign-in'
import Layout from '../components/layouts/article'
import { Col, Container, Row } from 'react-bootstrap'

export default () => {
  console.log('lut lut lut')
  const methods = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: { name: 'hello', email: 'world' },
    resolver: undefined,
    context: undefined,
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: false,
    shouldUseNativeValidation: false,
    delayError: undefined
  })

  console.log(methods, 'methods here wat wat')

  return (
    <Layout>
      <Container>
        <Row className="justify-content-md-center">
          <Col xs lg="2">
            <FormProvider {...methods}>
              <SignIn />
            </FormProvider>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

// MOCK FOR REFERENCE ONLY
const form = () => {
  const { register } = useFormContext() // retrieve all hook methods
  return <input {...register('test')} />
}
