import { debounce } from 'lodash'
import { forwardRef, useImperativeHandle, useCallback } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useFormContext, register } from 'react-hook-form'
import { useIntl } from 'react-intl'

const StepTwo = forwardRef(({ onChangeValues }, ref) => {
  const intl = useIntl()
  const { getValues, register, handleSubmit, setError, formState } =
    useFormContext()

  const onClickNext = () => {}

  const onClickPrev = () => {}

  const onSubmit = () => {
    // NOTE: pass the values to parent onSubmit action
  }

  useImperativeHandle(ref, () => ({
    onClickNext,
    onClickPrev
  }))

  const onChangeFormValues = useCallback(
    debounce(() => {
      onChangeValues()
    }, 800),
    []
  )

  const inputThreeProps = register('inputThree')
  const inputFourProps = register('inputFour')

  return (
    <Form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Form.Group className="mb-3" controlId="formBasicInputThree">
        <Form.Label>
          {intl.formatMessage({ id: 'label_input_three' })}
        </Form.Label>
        <Form.Control
          {...inputThreeProps}
          placeholder={intl.formatMessage({ id: 'placeholder_input_three' })}
        />
        {/* <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text> */}
        <Form.Control.Feedback type="">
          {/* {errors.inputThree?.message} */}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicInputFour">
        <Form.Label>
          {intl.formatMessage({ id: 'label_input_four' })}
        </Form.Label>
        <Form.Control
          {...inputFourProps}
          placeholder={intl.formatMessage({
            id: 'placeholder_input_four'
          })}
        />
        <Form.Control.Feedback type="">
          {/* {errors.inputFour?.message} */}
        </Form.Control.Feedback>
      </Form.Group>
      {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group> */}
    </Form>
  )
})

export default StepTwo
