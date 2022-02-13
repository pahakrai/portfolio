import { loadStripe } from '@stripe/stripe-js'

let stripePromise
const getStripe = (publicKey) => {
  if (!stripePromise) {
    stripePromise = loadStripe(publicKey)
  }
  return stripePromise
}

export default getStripe
