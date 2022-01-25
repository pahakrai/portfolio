import { yupResolver } from '@hookform/resolvers/yup'
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { FormProvider, useForm } from 'react-hook-form'
import * as Yup from 'yup'

// export interface SubscriptionFormProps {
//   children: Array<React.ReactElement>;
//   width?: number;
//   selectedIndex: number;
//   containerStyle?: object;
//   innerContainerStyle?: object;
//   onTabChange: (index: any) => void;
//   enable?: boolean;
//   lazyLoad?: boolean;
//   onMomentumScrollEnd?(data: any): any;
// }

const SubscriptionForm = ({ children, onSelectStep = () => false, step }) => {
  const formRef = useRef()

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

  const buttonAction = () => {
    let display = ''
    let action = () => false
    if (step !== 1) {
      display = 'Prev'
      action = () => {
        onSelectStep(step - 1)
        formRef.current?.onClickPrev()
      }
    }
    if (step !== children.length) {
      display = 'Next'
      action = () => {
        onSelectStep(step + 1)
        formRef.current?.onClickNext()
      }
    }
    if (step === children.length) {
      display = 'Place Order'
      action = () => {
        formRef.current?.onClickSubmit()
      }
    }
    return { display, action }
  }

  const onChangeValues = () => {
    console.log(methods.getValues())
  }

  return (
    <>
      <FormProvider {...methods}>
        {child &&
          React.cloneElement(child, {
            onChangeValues,
            ref: formRef
          })}
      </FormProvider>
      <Row>
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
    </>
  )
}

export default SubscriptionForm
