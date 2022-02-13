import { add, debounce } from 'lodash'
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState
} from 'react'
import { Form, Button, Row } from 'react-bootstrap'
import { useFormContext } from 'react-hook-form'
import { useIntl } from 'react-intl'
import Card from '../card'
import { H3, P } from '../common'

import SelectCard from '../select-card'

const charityOptions = [
  {
    id: 1,
    name: 'Salvation Army',
    default: true
  },
  {
    id: 2,
    name: 'Girl Guides SA',
    default: true
  },
  {
    id: 3,
    name: 'Smith Family',
    default: true
  }
]

const SelectCharity = forwardRef(({ onChangeValues }, ref) => {
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
  const watchCharity = watch('charity')

  const validateFields = () => {
    const { charity } = getValues()
    const error = false
    if (!charity) {
      setFieldError('charity', 'required', !error)
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

  const onSelectCharity = (charityId) => {
    setValue('charity', charityId)
  }

  const onChangeFormValues = useCallback(
    debounce(() => {
      onChangeValues()
    }, 800),
    []
  )

  useEffect(() => {
    if (charityOptions.length && !watchCharity) {
      const defaultCharity =
        charityOptions.find((charity) => charity.default === true) || 1
      setValue('charity', defaultCharity?.id || 1)
    }
  }, [charityOptions, watchCharity])

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        {charityOptions.map((charity, idx) => (
          <SelectCard
            key={`charity${idx}`}
            title={charity.name}
            group={`charity${idx}`}
            checked={charity.id === watchCharity}
            onSelect={() => {
              onSelectCharity(charity.id)
            }}
          />
        ))}
      </Form>

      <Card style={{ borderRadius: 3, marginBottom: '16px' }}>
        <H3>Charity Donations</H3>
        <P>
          Your full refund amount ($0.10 for each container) will go to Backyard
          Cash partner charity of your choice
        </P>
      </Card>

      {/* <SelectCard
        title={'Add a location'}
        checked={true}
        onSelect={() => {
          onSelectCharity(charity.id)
        }}
      /> */}
    </>
  )
})

SelectCharity.displayName = 'SelectCharity'

export default SelectCharity
