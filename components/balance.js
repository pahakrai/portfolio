import { Container } from 'react-bootstrap'
import Card from './card'
import { H1, P } from './common'

const Balance = ({ currentUser }) => {
  return (
    <Card>
      <H1>$ 0.00</H1>
      <P>
        Some Card<span>Content WOW</span>
      </P>
    </Card>
  )
}

export default Balance
