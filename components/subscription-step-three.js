import { debounce } from 'lodash'
import { forwardRef, useImperativeHandle, useCallback } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useFormContext, register } from 'react-hook-form'
import { useIntl } from 'react-intl'

const StepThree = forwardRef(({ onChangeValues }, ref) => {
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

  const inputFiveProps = register('inputFive')
  const inputSixProps = register('inputSix')

  return (
    <Form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Form.Group className="mb-3" controlId="formBasicInputFive">
        <Form.Label>
          {intl.formatMessage({ id: 'label_input_five' })}
        </Form.Label>
        <Form.Control
          {...inputFiveProps}
          placeholder={intl.formatMessage({ id: 'placeholder_input_five' })}
        />
        {/* <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text> */}
        <Form.Control.Feedback type="">
          {/* {errors.inputFive?.message} */}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicInputSix">
        <Form.Label>{intl.formatMessage({ id: 'label_input_six' })}</Form.Label>
        <Form.Control
          {...inputSixProps}
          placeholder={intl.formatMessage({
            id: 'placeholder_input_six'
          })}
        />
        <Form.Control.Feedback type="">
          {/* {errors.inputSix?.message} */}
        </Form.Control.Feedback>
      </Form.Group>
      {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group> */}
    </Form>
  )
})

export default StepThree
