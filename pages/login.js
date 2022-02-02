import { Button, Col, Row } from 'react-bootstrap'
import { FormProvider, useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'
import Link from 'next/link'
import * as Yup from 'yup'
import { compose } from 'recompose'
import { useRouter } from 'next/router'
import { yupResolver } from '@hookform/resolvers/yup'

import { setAccessToken } from '../lib/auth'
import { withAuthRedirect } from '../helpers/redirect'
import { useUserLogin, getCurrentUser } from '../hooks/api/user'

import SignIn from '../components/sign-in'
import { PageContainer } from '../components/common'

const Login = () => {
  const intl = useIntl()
  const router = useRouter()

  // form validation rules
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .matches(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i,
        'Email is wrong'
      ),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password length should be greater than 6')
  })

  const methods = useForm({
    resolver: yupResolver(validationSchema), // add yup here
    reValidateMode: 'onBlur'
    // mode: 'onSubmit',
    // defaultValues: {},
    // context: undefined,
    // criteriaMode: 'all', // firstError
    // shouldFocusError: true,
    // shouldUnregister: false,
    // shouldUseNativeValidation: true,
    // delayError: undefined
  })

  const { mutateAsync: currentUserByToken } = getCurrentUser()

  const onLoginSuccess = async res => {
    const user = await currentUserByToken({
      headers: { Authorization: `Bearer ${res.data.token}` }
    })
    if (user.data) {
      setAccessToken(res.data.token)
      router.push('/')
    }
  }

  const onLoginError = () => {}

  const {
    mutate: login,
    error,
    loading
  } = useUserLogin(onLoginSuccess, onLoginError)

  const onClickSubmit = values => {
    const { email, password } = values
    login({ email, password })
  }

  return (
    <PageContainer>
      <Row>
        <Col>
          <p>Sign In</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <FormProvider {...methods}>
            <SignIn onClickSubmit={onClickSubmit} />
          </FormProvider>
        </Col>
      </Row>
      <Row>
        <Col>
          <Link href="/">
            <p>Forgotten my password</p>
          </Link>
        </Col>
      </Row>
      <Row style={{ gap: '1rem' }} className="justify-content-between">
        <Col>
          <Button
            variant="primary"
            type="submit"
            style={{ width: '100%' }}
            onClick={methods.handleSubmit(onClickSubmit)}
          >
            {intl.formatMessage({ id: 'display_signin' })}
          </Button>
        </Col>
        <Col>
          <Button
            variant="primary"
            type="submit"
            style={{ width: '100%' }}
            onClick={() => router.push('/signup')}
          >
            {intl.formatMessage({ id: 'display_signup' })}
          </Button>
        </Col>
      </Row>
    </PageContainer>
  )
}

export default compose(
  withAuthRedirect({ route: '/', redirectIfAuthed: true })
)(Login)
