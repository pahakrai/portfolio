import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import { FormProvider, useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'
import { compose } from 'recompose'
import { P } from '../components/common'
import Layout from '../components/layouts/article'
import SignUp from '../components/sign-up'
import { withAuthRedirect } from '../helpers/redirect'
import InputSuggestion from './input-suggestion'
import SelectCard from './select-card'

const addressTypes = [
  {
    id: 1,
    type: 'Residential'
  },
  {
    id: 2,
    type: 'Business'
  }
]

const LocationForm = () => {
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

  const onSubmit = () => false

  return (
    <>
      <FormProvider {...methods}>
        <Form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
          <InputSuggestion label={null} />
        </Form>
        <P>Is this a residential or business address?</P>
        {addressTypes.map((at, idx) => (
          <SelectCard key={`at${idx}`} title={at.type} />
        ))}
      </FormProvider>
    </>
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
//     const response = await axios.get(`${process.env.API_BASE_URL}/current-user`, {
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

export default LocationForm
