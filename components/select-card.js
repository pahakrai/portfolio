import styled from '@emotion/styled'
import { Col, Form, Image, Row } from 'react-bootstrap'

const SelectWrapper = styled.div`
  border-color: #00000090;
  border-style: solid;
  border-width: 2px;
  border-radius: 5px;
  height: 100%;
  width: 100%;
  padding: 16px;
  margin-bottom: 16px;
`

export default function SelectCard({
  type = 'radio',
  title,
  caption,
  checked,
  onSelect,
  group,
  feedback
}) {
  return (
    <SelectWrapper classname="mb-3" onClick={onSelect}>
      <Form.Group controlId={group}>
        <Form.Check type={type} name={group}>
          <Row>
            <Col xs={10}>
              <Row>
                <Form.Check.Label>{title}</Form.Check.Label>
              </Row>
              {caption && <Form.Text>{caption}</Form.Text>}
            </Col>
            <Col xs={2} className="text-end">
              <Form.Check.Input
                type={type}
                checked={checked}
                onClick={onSelect}
                name={group}
                readOnly
              />
            </Col>
          </Row>
        </Form.Check>
      </Form.Group>
    </SelectWrapper>
  )
}

SelectCard.Image = () => {
  return (
    <SelectCard>
      <Image src="/"></Image>
    </SelectCard>
  )
}
