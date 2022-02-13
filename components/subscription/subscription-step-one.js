import { debounce } from 'lodash'
import { useIntl } from 'react-intl'
import { Form, Button } from 'react-bootstrap'
import { useFormContext } from 'react-hook-form'
import { forwardRef, useCallback, useImperativeHandle } from 'react'

import SelectCard from '../select-card'

const StepOne = forwardRef(({ onChangeValues }, ref) => {
  const intl = useIntl()
  const {
    getValues,
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useFormContext()

  const validateFields = () => {
    const { inputOne, inputTwo } = getValues()
    const error = false
    if (!inputOne) {
      setFieldError('inputOne', 'required', !error)
      error = true
    }

    if (!inputTwo) {
      setFieldError('inputTwo', 'required', !error)
      error = true
    }
    return !error
  }

  const setFieldError = (fieldName, errorMsg, focus) => {
    setError(
      fieldName,
      { type: 'manual', message: errorMsg || 'required' },
      { shouldFocus: focus }
    )
  }

  const onClickNext = (onValidate) => {
    const validated = validateFields()
    if (validated) onValidate()
  }

  const onClickPrev = (cb) => {
    cb()
  }

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

  const inputOneProps = register('inputOne')
  const inputTwoProps = register('inputTwo')

  return (
    <Form onSubmit={handleSubmit(onSubmit)} noValidate>
      <SelectCard />
      <Form.Group className="mb-3" controlId="formBasicInputOne">
        <Form.Label>{intl.formatMessage({ id: 'label_input_one' })}</Form.Label>
        <Form.Control
          {...inputOneProps}
          onChange={(e) => {
            // NOTE: override the default behavior of
            // validating on type
            setError('inputOne', null)
            inputOneProps.onChange(e)
            onChangeFormValues()
          }}
          placeholder={intl.formatMessage({ id: 'placeholder_input_one' })}
        />
        {/* <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text> */}
        <Form.Control.Feedback type="">
          {errors.inputOne?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicInputTwo">
        <Form.Label>{intl.formatMessage({ id: 'label_input_two' })}</Form.Label>
        <Form.Control
          {...inputTwoProps}
          onChange={(e) => {
            // NOTE: override the default behavior of
            // validating on type
            setError('inputTwo', null)
            inputTwoProps.onChange(e)
            onChangeFormValues()
          }}
          placeholder={intl.formatMessage({
            id: 'placeholder_input_two'
          })}
        />
        <Form.Control.Feedback type="">
          {errors.inputTwo?.message}
        </Form.Control.Feedback>
      </Form.Group>
      {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group> */}
    </Form>
  )
})

StepOne.displayName = 'StepOne'

export default StepOne