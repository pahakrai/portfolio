import { StripeElements } from './stripe-elements'
import { StripeProvider } from './stripe-provider'

export const StripePayment = ({ publicKey, onPrepared }) => {
  return (
    <StripeProvider publicKey={publicKey}>
      <StripeElements onPrepared={onPrepared} />
    </StripeProvider>
  )
}
