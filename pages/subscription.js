import { compose } from 'recompose'
import React, { useEffect } from 'react'

import { withAuthRedirect } from '../helpers/redirect'

import { PageContainer } from '../components/common'
import Subscription from '../components/subscription/subscription-form'

const SubscriptionPage = () => {
  useEffect(() => {
    return () => {}
  }, [])
  return (
    <PageContainer>
      <Subscription />
    </PageContainer>
  )
}

export default compose(withAuthRedirect({}))(SubscriptionPage)
