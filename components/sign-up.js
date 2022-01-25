import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap'
import { useFormContext } from 'react-hook-form'
import { useIntl } from 'react-intl'

import InputSuggestion from './input-suggestion'

const SignUp = ({ onClickSubmit }) => {
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

  return (
    <Form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Row>
        {/* NOTE: Check why on small screen column do not break */}
        <Form.Group as={Col} className="mb-3" controlId="formGridFirstname">
          <Form.Label>
            {intl.formatMessage({ id: 'label_firstname' })}
          </Form.Label>
          <Form.Control
            placeholder={intl.formatMessage({ id: 'placeholder_firstname' })}
          />
        </Form.Group>
        <Form.Group as={Col} className="mb-3" controlId="formGridLastname">
          <Form.Label>
            {intl.formatMessage({ id: 'label_lastname' })}
          </Form.Label>
          <Form.Control
            placeholder={intl.formatMessage({ id: 'placeholder_lastname' })}
          />
        </Form.Group>
      </Row>
      <Form.Group className="mb-3" controlId="formBasicPhone" style={{}}>
        <Form.Label>{intl.formatMessage({ id: 'label_phone' })}</Form.Label>
        <div
          style={{
            position: 'absolute',
            padding: '0.375rem 0.75rem',
            paddingLeft: '10px',
            zIndex: 1
          }}
        >
          <p>+81</p>
        </div>
        <Form.Control
          placeholder={intl.formatMessage({ id: 'placeholder_phone' })}
          aria-label="Phone"
          aria-describedby="basic-addon1"
          style={{
            paddingLeft: '40px',
            // borderRadius is required again
            // because of the prefix icon/text
            borderRadius: '3px'
          }}
        />

        <Form.Control.Feedback type="">
          {errors?.phone?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <InputSuggestion />
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
    </Form>
  )
}

export default SignUp
