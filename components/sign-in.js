import { Form, Button } from 'react-bootstrap'
import { useFormContext } from 'react-hook-form'
import { useIntl } from 'react-intl'

const SignIn = ({ onSubmit }) => {
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
    onSumbit(getValues())
  }

  const emailInputProps = register('email', {
    required: { value: true, message: 'the field is required' },
    pattern: {
      value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i,
      message: 'email pattern do not match'
    }
  })

  const passwordInputProps = register('password', {
    required: { value: true, message: 'Password required' },
    minLength: {
      value: 8,
      message: 'Password length should be at least 8 characters'
    }
  })

  console.log(
    register('email', {
      required: true,
      pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i
    })
  )

  return (
    <Form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>{intl.formatMessage({ id: 'label_email' })}</Form.Label>
        <Form.Control
          {...emailInputProps}
          onChange={e => {
            // NOTE: override the default behavior of
            // validating on type
            setError('email', null)
            emailInputProps.onChange(e)
          }}
          type="email"
          placeholder={intl.formatMessage({ id: 'placeholder_email' })}
        />
        {/* <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text> */}
        <Form.Control.Feedback type="">
          {errors?.email?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>{intl.formatMessage({ id: 'label_password' })}</Form.Label>
        <Form.Control
          {...passwordInputProps}
          onChange={e => {
            // NOTE: override the default behavior of
            // validating on type
            passwordInputProps.onChange(e)
          }}
          type="password"
          placeholder={intl.formatMessage({
            id: 'placeholder_password'
          })}
        />
        <Form.Control.Feedback type="">
          {errors?.password?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button variant="primary" type="submit">
        {intl.formatMessage({ id: 'display_submit' })}
      </Button>
    </Form>
  )
}

export default SignIn
