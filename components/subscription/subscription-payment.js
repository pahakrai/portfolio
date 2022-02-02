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

import { StripePayment } from '../stripe/stripe-payment'

const PaymentMethod = { CREDIT_CARD_STRIPE: 'stripe', PUBLIC_KEY: 'keyfromenv' }

const paymentOptions = []

const SelectPayment = forwardRef(({ onChangeValues }, ref) => {
  const intl = useIntl()
  const [paymentMethod, setPaymentMethod] = useState({
    // NOTE: ORIGINAL INTERFACE FOR REFERENCE ONLY
    // _id: string,
    // paymentMethod: {
    //   _id: string,
    //   code?: string,
    //   name?: string,
    //   isActive?: boolean,
    //   defaultCurrency?: string,
    //   chargeValue?: number,
    //   chargeSymbol?: string,
    //   adminCharge?: number,
    //   createdAt?: string,
    //   updatedAt?: string,
    // },
    // url?: string,
    // platforms?: string,
    // credential?: {publicKey: ''},
  })

  const {
    getValues,
    register,
    handleSubmit,
    setError,
    setValue,
    watch,
    formState: { errors }
  } = useFormContext()
  const watchPayment = watch('payment')

  const validateFields = () => {
    const { payment } = getValues()
    const error = false
    if (!payment) {
      setFieldError('payment', 'required', !error)
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

  const onClickNext = onValidate => {
    const validated = validateFields()
    if (validated) onValidate()
  }

  const onClickPrev = cb => {
    cb()
  }

  const onSubmit = () => {
    // NOTE: pass the values to parent onSubmit action
  }

  useImperativeHandle(ref, () => ({
    onClickNext,
    onClickPrev
  }))

  const onSelectPayment = paymentId => {
    setValue('payment', paymentId)
  }

  const onChangeFormValues = useCallback(
    debounce(() => {
      onChangeValues()
    }, 800),
    []
  )

  const checkout = () => {
    //create a hook here
  }

  const handleStripeCheckout = source => {
    // checkout by stripe
    if (getValues() && source) {
      checkout({
        ...getValues(),
        payment: {
          paymentMethod: PaymentMethod.CREDIT_CARD_STRIPE,
          sourceId: source
        }
      })
    }
  }

  useEffect(() => {
    if (paymentOptions.length && !watchPayment) {
      const defaultPayment =
        paymentOptions.find(payment => payment.default === true) || 1
      setValue('payment', defaultPayment?.id || 1)
    }
  }, [paymentOptions, watchPayment])

  return (
    <>
      <Card style={{ borderRadius: 3, marginBottom: '16px' }}>
        <H3>Payment components</H3>
        <P>
          Your full refund amount ($0.10 for each container) will go to Backyard
          Cash partner payment of your choice
        </P>
        <StripePayment
          publicKey={PaymentMethod.PUBLIC_KEY}
          onPrepared={handleStripeCheckout}
        />
      </Card>
    </>
  )
})

export default SelectPayment
