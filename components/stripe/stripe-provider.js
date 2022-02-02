import { Elements } from '@stripe/react-stripe-js'
import getStripe from '../../lib/stripe'

export const StripeProvider = ({ publicKey, children }) => {
  return <Elements stripe={getStripe(publicKey)}>{children}</Elements>
}
