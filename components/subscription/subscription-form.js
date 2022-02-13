import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import { ProgressBar } from 'react-bootstrap'
import { H3 } from '../common'

import SelectAddress from './subscription-address'
import SelectBinType from './subscription-bin-type'
import SelectCharity from './subscription-charity'
import SelectPayment from './subscription-payment'
import SubscriptionForm from './subscription-steps'
import SelectSubscriptionType from './subscription-type'

const Progress = styled(ProgressBar)`
  border-radius: 16px;
  height: 3px;
`

export const stepData = [
  {
    fieldCount: 1,
    stepComponent: SelectAddress,
    step: 1,
    title: 'Location'
  },
  {
    fieldCount: 1,
    stepComponent: SelectSubscriptionType,
    step: 2,
    title: 'Subscription',
    forwardTo: {
      step: 4,
      condition: { field: 'subscriptionType', value: 'Charity' }
    }
  },
  {
    fieldCount: 1,
    stepComponent: SelectBinType,
    step: 3,
    title: 'Subscription',
    forwardTo: {
      step: 5
    }
  },
  {
    fieldCount: 1,
    stepComponent: SelectCharity,
    step: 4,
    title: 'Payment',
    forwardTo: {
      step: 5
    }
  },
  {
    fieldCount: 1,
    stepComponent: SelectPayment,
    step: 5,
    title: 'Payment',
    end: true
  }

  // { fieldCount: 1, stepComponent: StepOne, step: 5 }
]

const Subscription = () => {
  const [step, setStep] = useState(1)
  const [progress, setProgress] = useState(0)
  const totalFieldCount = stepData.reduce(
    (count, step) => count + step.fieldCount,
    0
  )

  useEffect(() => {
    updateProgress(1)
  }, [])

  const updateProgress = (stepNo) => {
    const totalStepValidCount =
      stepData
        .filter((s) => s.step <= stepNo)
        .reduce((count, step) => count + step.fieldCount, 0) || 0
    const prog = (totalStepValidCount / totalFieldCount) * 100 // change to percentage
    setProgress(prog)
  }

  const onSelectStep = (stepNo) => {
    setStep(stepNo)
    updateProgress(stepNo)
  }

  return (
    <>
      <H3>{stepData.find((data) => data.step === step).title}</H3>
      <Progress now={progress} style={{ marginBottom: '16px' }} />
      <SubscriptionForm onSelectStep={onSelectStep} step={step}>
        {stepData.map((step, idx) =>
          React.createElement(step.stepComponent, { key: idx })
        )}
      </SubscriptionForm>
    </>
  )
}

export default Subscription
