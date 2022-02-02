import { Image, Row, Col } from 'react-bootstrap'
import Card from './card'
import { H3, P } from './common'

export default () => {
  return (
    <Card>
      <Row>
        <Col xs={8}>
          <H3>Australian Charity</H3>
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
