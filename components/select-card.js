import { Col, Form, Image, Row } from 'react-bootstrap'

export default function SelectCard({ types }) {
  return (
    <Form>
      <div
        key={'radio'}
        className="mb-3"
        style={{
          borderColor: '#00000090',
          borderStyle: 'solid',
          borderWidth: '2px',
          borderRadius: '5px',
          height: '100%',
          width: '100%',
          padding: '16px'
        }}
      >
        <Form.Check type="radio" id={`check-api-$'radio'`}>
          <Row>
            <Col xs={10}>
              <Row>
                <Form.Check.Label>{`Custom api $'radio'`}</Form.Check.Label>
              </Row>
              <Form.Text>Hello world </Form.Text>
              <Form.Control.Feedback type="valid">
                You did it!
              </Form.Control.Feedback>
            </Col>
            <Col xs={2} className="text-end">
              <Form.Check.Input type="radio" isValid />
            </Col>
          </Row>
        </Form.Check>
      </div>
    </Form>
  )
}

SelectCard.Image = () => {
  return (
    <SelectCard>
      <Image src="/"></Image>
    </SelectCard>
  )
}
