import styled from '@emotion/styled'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useRef, useState } from 'react'
import { Button, Col, Container, ProgressBar, Row } from 'react-bootstrap'
import { FormProvider, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import StepOne from './subscription-step-one'
import StepThree from './subscription-step-three'
import StepTwo from './subscription-step-two'
import SubscriptionForm from './subscription-steps'

const Progress = styled(ProgressBar)`
  border-radius: 16px;
  height: 3px;
`

const Subscription = () => {
  const stepData = [
    { fieldCount: 2, stepComponent: <StepOne />, step: 1 },
    { fieldCount: 2, stepComponent: <StepTwo />, step: 2 },
    { fieldCount: 2, stepComponent: <StepThree />, step: 3 }
  ]
  const formRef = useRef(null)
  const [step, setStep] = useState(1)
  const [progress, setProgress] = useState(0)
  const totalFieldCount = stepData.reduce(
    (count, step) => count + step.fieldCount,
    0
  )

  useEffect(() => {
    updateProgress(1)
  }, [])

  const updateProgress = stepNo => {
    const totalStepValidCount =
      stepData
        .filter(s => s.step <= stepNo)
        .reduce((count, step) => count + step.fieldCount, 0) || 0
    const prog = (totalStepValidCount / totalFieldCount) * 100 // change to percentage
    setProgress(prog)
  }

  const onSelectStep = stepNo => {
    setStep(stepNo)
    updateProgress(stepNo)
  }

  return (
    <>
      <Progress now={progress} style={{ marginBottom: '16px' }} />
      <SubscriptionForm onSelectStep={onSelectStep} step={step}>
        {stepData.map(step => step.stepComponent)}
      </SubscriptionForm>
    </>
  )
}

export default Subscription
