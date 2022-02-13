import { Form, Button } from 'react-bootstrap'
import { useFormContext } from 'react-hook-form'
import { useIntl } from 'react-intl'

const SignIn = ({ onClickSubmit }) => {
  const intl = useIntl()
  const {
    getValues,
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useFormContext()

  const onSubmit = () => {
    // NOTE: pass the values to parent onSubmit action
    onClickSubmit(getValues())
  }

  const emailInputProps = register('email')
  const passwordInputProps = register('password')

  return (
    <Form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>{intl.formatMessage({ id: 'label_email' })}</Form.Label>
        <Form.Control
          {...emailInputProps}
          onChange={(e) => {
            // NOTE: override the default behavior of
            // validating on type
            setError('email', null)
            passwordInputProps.onChange(e)
          }}
          type="email"
          placeholder={intl.formatMessage({ id: 'placeholder_email' })}
        />
        {/* <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text> */}
        <Form.Control.Feedback type="">
          {errors.email?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>{intl.formatMessage({ id: 'label_password' })}</Form.Label>
        <Form.Control
          {...passwordInputProps}
          onChange={(e) => {
            // NOTE: override the default behavior of
            // validating on type
            setError('password', null)
            passwordInputProps.onChange(e)
          }}
          type="password"
          placeholder={intl.formatMessage({
            id: 'placeholder_password'
          })}
        />
        <Form.Control.Feedback type="">
          {errors.password?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
    </Form>
  )
}

export default SignIn
