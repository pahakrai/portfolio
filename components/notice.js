import { Row, Col } from 'react-bootstrap'
import Image from 'next/image'
import Card from './card'
import { H3, P } from './common'

const Notice = () => {
  return (
    <Card>
      <Row>
        <Col xs={8}>
          <H3>Australian Charity</H3>
          <P>Charity description text</P>
        </Col>
        <Col xs={4}>
          <Image src={'/images/pahak.png'} width={60} height={60} alt="logo" />
        </Col>
      </Row>
    </Card>
  )
}

export default Notice
