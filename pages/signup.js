import { Container, Row, Col, Button } from 'react-bootstrap'
import { FormProvider, useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'
import { compose } from 'recompose'
import Layout from '../components/layouts/article'
import SignUp from '../components/sign-up'
import { withAuthRedirect } from '../helpers/redirect'

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
    <Layout>
      {/* Container for individual pages margin/padding */}
      <Container
        style={{
          maxWidth: '400px',
          marginTop: '10vh',
          marginBottom: '10vh'
        }}
      >
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
      </Container>
    </Layout>
  )
}

// SignUp.getInitialProps = async ctx => {
//   let access_token
//   if (isServer() && ctx.req?.headers?.cookie) {
//     access_token = getAccessTokenFromReq(ctx.req)
//   } else {
//     access_token = getAccessToken()
//   }
//   let currentUserData
//   try {
//     const response = await axios.get('http://localhost:3000/api/current-user', {
//       headers: {
//         Authorization: `Bearer ${access_token}`
//       }
//     })
//     if (response.data?.user) currentUserData = response.data.user
//   } catch (error) {
//     // if server not connected log error on server
//   }
//   if (currentUserData) {
//     if (ctx.res) {
//       ctx.res.writeHead(302, {
//         Location: '/'
//       })
//       ctx.res.end()
//     } else {
//       Router.push('/')
//     }
//   }

//   return {}
// }

export default compose(
  withAuthRedirect({ route: '/', redirectIfAuthed: true })
)(SignUpPage)
