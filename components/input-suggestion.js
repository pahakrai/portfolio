import { Form } from 'react-bootstrap'
import { Typeahead } from 'react-bootstrap-typeahead'
import { BsSearch } from 'react-icons/bs'

export default function InputSuggestion() {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Address</Form.Label>
      <div className="typeahead-icon">
        <div className="searchicon">
          <BsSearch />
        </div>
        <Typeahead
          id="basic-example"
          name="dropdown"
          options={[]}
          className="typeahead-custom"
          valueKey="id"
          placeholder="Choose a color..."
        />
      </div>
    </Form.Group>
  )
}
