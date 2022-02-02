import { yupResolver } from '@hookform/resolvers/yup'
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { FormProvider, useForm } from 'react-hook-form'
import * as Yup from 'yup'

import { stepData } from './subscription-form'

const SubscriptionForm = ({ children, onSelectStep = () => false, step }) => {
  const formRef = useRef()
  const pageStack = useRef([])

  // NOTE: FORM VALIDATION RULES
  const validationSchema = Yup.object().shape({
    //   inputOne: Yup.string().required('inputOne is required')
  })

  const methods = useForm({
    reValidateMode: 'onBlur'
    // resolver: yupResolver(validationSchema), // add yup here
    // mode: 'onSubmit',
    // defaultValues: {},
    // context: undefined,
    // criteriaMode: 'all', // firstError
    // shouldFocusError: true,
    // shouldUnregister: false,
    // shouldUseNativeValidation: true,
    // delayError: undefined
  })

  const child =
    (Array.isArray(children) ? children[step - 1] : children) || null

  const onClickNextCb = () => {
    pageStack.current?.push(step)
    let nextStep = step + 1
    const forwardTo = stepData.find(data => data.step === step).forwardTo
    if (forwardTo?.step && !forwardTo?.condition) {
      nextStep = forwardTo?.step
    }
    if (forwardTo?.step && forwardTo?.condition) {
      if (
        methods.getValues()[forwardTo.condition?.field] ===
        forwardTo.condition?.value
      ) {
        nextStep = forwardTo?.step
      }
    }
    onSelectStep(nextStep)
  }

  const onClickPrevCb = () => {
    const prevStep = pageStack.current?.pop()
    onSelectStep(prevStep)
  }

  const onChangeValues = () => {
    console.log(methods.getValues())
  }
  const buttonAction = () => {
    let display = ''
    let action = () => false

    if (stepData.find(data => data.step === step).end === true) {
      display = 'Place Order'
      action = () => {
        formRef.current?.onClickSubmit()
      }
    } else {
      display = 'Next'
      action = () => {
        formRef.current?.onClickNext(onClickNextCb)
      }
    }
    return { display, action }
  }

  return (
    <div key={step}>
      <FormProvider {...methods}>
        {child &&
          React.cloneElement(child, {
            // onChangeValues,
            ref: formRef
          })}
      </FormProvider>
      <Row>
        {step !== 1 && (
          <Col style={{}}>
            <Button
              onClick={() => {
                formRef.current?.onClickPrev(onClickPrevCb)
              }}
              style={{ width: '100%' }}
              disabled={false}
            >
              Prev
            </Button>
          </Col>
        )}
        <Col style={{}}>
          <Button
            onClick={buttonAction().action}
            style={{ width: '100%' }}
            disabled={false}
          >
            {buttonAction().display}
          </Button>
        </Col>
      </Row>
    </div>
  )
}

export default SubscriptionForm
