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

import SelectCard from '../select-card'

const binTypes = [
  {
    id: 1,
    type: '200 litre drum',
    description: 'The drums are delivered FREE of charge.',
    default: true
  },
  {
    id: 2,
    type: '240 litre wheelie-bin',
    description:
      'Wheelie-bins have a once of $40 payment which can be paid upfront or deducted in $10 installments.',
    default: false
  }
]

const SelectBinType = forwardRef(({ onChangeValues }, ref) => {
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
  const watchBinType = watch('binType')

  const validateFields = () => {
    const { binType } = getValues()
    const error = false
    if (!binType) {
      setFieldError('binType', 'required', !error)
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

  const onSelectBinType = (binTypeId) => {
    setValue('binType', binTypeId)
  }

  const onChangeFormValues = useCallback(
    debounce(() => {
      onChangeValues()
    }, 800),
    []
  )

  useEffect(() => {
    if (binTypes.length && !watchBinType) {
      const defaultBinType =
        binTypes.find((binType) => binType.default === true) || '200 litre drum'
      setValue('binType', defaultBinType?.type || '200 litre drum')
    }
  }, [binTypes, watchBinType])

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        {binTypes.map((binType, idx) => (
          <SelectCard
            key={`bintype${idx}`}
            title={binType.type}
            caption={binType.description}
            group={`bintype${idx}`}
            checked={binType.type === watchBinType}
            onSelect={() => {
              onSelectBinType(binType.type)
            }}
          />
        ))}
      </Form>
      {/* <SelectCard
        title={'Add a location'}
        checked={true}
        onSelect={() => {
          onSelectBinType(binType.id)
        }}
      /> */}
    </>
  )
})

SelectBinType.displayName = 'SelectBinType'

export default SelectBinType
