import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState
} from 'react'
import { useIntl } from 'react-intl'
import { add, debounce } from 'lodash'
import { Form, Button } from 'react-bootstrap'
import { useFormContext } from 'react-hook-form'

import { H3, P } from '../common'
import SelectCard from '../select-card'

const binSubscriptionTypeOptions = [
  {
    id: 1,
    type: 'Personal',
    description:
      'Selecting this option will direct your full payment amount ($0.07 for each container) deposited to your nominated bank account. You can elect to pay a once off 40$ payment for one 240ltr bin in full of deducted as $10 installments. ',
    default: true
  },
  {
    id: 2,
    type: 'Charity',
    description:
      'Selecting this options means your full collection payment amount ($0.10 for each container) would go to Backyard Cash partner charity of your choice. ',
    default: true
  }
]

const SelectSubscriptionType = forwardRef(({ onChangeValues }, ref) => {
  const intl = useIntl()
  const {
    getValues,
    register,
    handleSubmit,
    setError,
    setValue,
    watch,
    formState: { errors }
  } = useFormContext()
  const subscriptionType = watch('subscriptionType')

  const validateFields = () => {
    const { subscriptionType } = getValues()
    const error = false
    if (!subscriptionType) {
      setFieldError('subscriptionType', 'required', !error)
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

  const onSelectSubscriptionType = (type) => {
    // setSelectedSubscriptionType(type)
    setValue('subscriptionType', type)
  }

  const onChangeFormValues = useCallback(
    debounce(() => {
      onChangeValues()
    }, 800),
    []
  )

  useEffect(() => {
    if (binSubscriptionTypeOptions.length && !subscriptionType) {
      const defaultSubscription =
        binSubscriptionTypeOptions.find((sub) => sub.default === true) || 1
      setValue('subscriptionType', defaultSubscription?.type || 1)
    }
  }, [subscriptionType, subscriptionType])

  return (
    <>
      <H3>Which bin subscription would you like?</H3>
      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        {binSubscriptionTypeOptions.map((subscription, idx) => (
          <SelectCard
            key={`subscription${idx}`}
            title={subscription.type}
            caption={subscription.description}
            group={`subscription${idx}`}
            checked={subscription.type === subscriptionType}
            onSelect={() => {
              onSelectSubscriptionType(subscription.type)
            }}
          />
        ))}
      </Form>
      <P>If you require more than one bin please give us a call</P>
    </>
  )
})

SelectSubscriptionType.displayName = 'SelectSubscriptionType'

export default SelectSubscriptionType
