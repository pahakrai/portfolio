import { Image, Row, Col } from 'react-bootstrap'
import Card from './card'
import { H1, P } from './common'

export default () => {
  return (
    <Card>
      <Row>
        <Col xs={8}>
          <H1>Australian Charity</H1>
          <P>Charity description text</P>
        </Col>
        <Col xs={4}>
          <Image
            src={'/images/pahak.png'}
            fluid
            roundedCircle
            width={60}
            height={60}
            alt="logo"
          />
        </Col>
      </Row>
    </Card>
  )
}
