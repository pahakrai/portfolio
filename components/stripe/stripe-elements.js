import React, { useState, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { FormProvider, useForm } from 'react-hook-form'
import { Button, Form } from 'react-bootstrap'
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe
} from '@stripe/react-stripe-js'

// interface IStripeElementsForm {
//   creditCardNumber: string;
//   creditCardExpiry: string;
//   creditCardCVV: string;
// }

// interface StripeElementsProps {
//   onPrepared?: (source: string) => void;
// }

const styles = {
  root: {
    flexDirection: 'column'
  },
  mb_2: {
    marginBottom: '2em'
  }
}

export const StripeElements = ({ onPrepared }) => {
  const intl = useIntl()
  const stripe = useStripe()
  const elements = useElements()
  const methods = useForm()
  const [loading, setLoading] = useState(false)
  const {
    register,
    setValue,
    clearErrors,
    setError,
    formState: { errors },
    handleSubmit
  } = methods

  const _handleCardNumberChange = event => {
    if (event.error || !event.complete) {
      setValue('creditCardNumber', undefined)
      setError('creditCardNumber', { type: 'validate' })
    } else {
      setValue('creditCardNumber', event.brand)
      clearErrors('creditCardNumber')
    }
  }

  const _handleCardExpiryChange = event => {
    if (event.error || !event.complete) {
      setValue('creditCardExpiry', undefined)
      setError('creditCardExpiry', { type: 'validate' })
    } else {
      setValue('creditCardExpiry', 'expiry')
      clearErrors('creditCardExpiry')
    }
  }

  const _handleCardCVVChange = event => {
    if (event.error || !event.complete) {
      setValue('creditCardCVV', undefined)
      setError('creditCardCVV', { type: 'validate' })
    } else {
      setValue('creditCardCVV', 'cvv')
      clearErrors('creditCardCVV')
    }
  }

  const _handleSubmit = async data => {
    // display payment modal
    setLoading(true)
    const source = await stripe.createSource(
      elements?.getElement(CardNumberElement),
      {
        type: 'card'
      }
    )
    const sourceId = source?.source?.id
    setLoading(false)
    onPrepared?.(sourceId)
  }

  const requiredErrorMsg = intl.formatMessage({ id: 'error_required' })
  const ccNumberProps = register('creditCardNumber', {
    required: {
      value: true,
      message: requiredErrorMsg
    }
  })
  const ccExpiryProps = register('creditCardExpiry', {
    required: {
      value: true,
      message: requiredErrorMsg
    }
  })
  const ccCVVProps = register('creditCardCVV', {
    required: {
      value: true,
      message: requiredErrorMsg
    }
  })

  return (
    <FormProvider {...methods}>
      <Form
        onSubmit={handleSubmit(_handleSubmit)}
        noValidate
        autoComplete="off"
        // className={styles.root}
      >
        <Form.Group className="mb-3" controlId="formCreditCardNumber">
          <Form.Label>
            {intl.formatMessage({
              id: 'label_credit_card_number'
            })}
          </Form.Label>
          <CardNumberElement
            {...ccNumberProps}
            onChange={e => {
              // NOTE: override the default behavior of
              // validating on type
              setError('creditCardNumber', null)
              ccNumberProps.onChange(e)
            }}
            // onChange={event => _handleCardNumberChange(event)}
            placeholder={''}
          />
          <Form.Control.Feedback type="">
            {errors.creditCardNumber?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formCreditCardExpirty">
          <Form.Label>
            {intl.formatMessage({ id: 'label_expiration' })}
          </Form.Label>
          <CardExpiryElement
            {...ccExpiryProps}
            onChange={e => {
              // NOTE: override the default behavior of
              // validating on type
              setError('creditCardExpiry', null)
              ccExpiryProps.onChange(e)
            }}
            // onChange={event => _handleCardExpiryChange(event)}
            placeholder={'MM/YY'}
          />
          <Form.Control.Feedback type="">
            {errors.creditCardExpiry?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formCreditCardCvv">
          <Form.Label>{intl.formatMessage({ id: 'label_cvv' })}</Form.Label>
          <CardCvcElement
            {...ccCVVProps}
            onChange={e => {
              // NOTE: override the default behavior of
              // validating on type
              setError('creditCardCVV', null)
              ccCVVProps.onChange(e)
            }}
            // onChange={event => _handleCardCVVChange(event)}
            placeholder={''}
          />
          <Form.Control.Feedback type="">
            {errors.creditCardCVV?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          type="submit"
          disabled={loading}
          // className={styles.mb_2}
        >
          {intl.formatMessage({
            id: 'display_checkout'
          })}
        </Button>
      </Form>
    </FormProvider>
  )
}
