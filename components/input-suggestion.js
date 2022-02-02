import { useState } from 'react'
import { Form, Spinner } from 'react-bootstrap'
import {
  ClearButton,
  AsyncTypeahead,
  Typeahead
} from 'react-bootstrap-typeahead'
import { BsSearch } from 'react-icons/bs'

const PER_PAGE = 5
export default function InputSuggestion({ label }) {
  const [typeaheadState, setTypeaheadState] = useState({
    loading: false,
    options: [],
    query: ''
  })

  const _handleInputChange = () => {}

  const _handlePagination = () => {}

  const _handleSearch = () => {}

  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <div className="typeahead-icon">
        <div className="searchicon">
          <BsSearch />
        </div>
        {/* <AsyncTypeahead
          {...typeaheadState}
          id="async-pagination-example"
          labelKey="login"
          maxResults={PER_PAGE - 1}
          minLength={2}
          onInputChange={_handleInputChange}
          onPaginate={_handlePagination}
          onSearch={_handleSearch}
          paginate
          placeholder="Search for your location..."
          renderMenuItemChildren={(option, idx) => (
            <div key={idx}>
              <img
                alt={option.login}
                src={option.avatar_url}
                style={{
                  height: '24px',
                  marginRight: '10px',
                  width: '24px'
                }}
              />
              <span>{option.title}</span>
            </div>
          )}
          useCache={false}
        >
          {({ onClear, selected }) => (
            <div className="rbt-aux">
              {!!selected.length && <ClearButton onClick={onClear} />}
              {!selected.length && <Spinner animation="grow" size="sm" />}
            </div>
          )}
        </AsyncTypeahead> */}
        <Typeahead
          id="basic-example"
          name="dropdown"
          options={['pahak', 'rai']}
          className="typeahead-custom"
          valueKey="id"
          placeholder="Choose a color..."
        >
          {({ onClear, selected }) => (
            <div className="rbt-aux">
              {!!selected.length && <ClearButton onClick={onClear} />}
              {!selected.length && <Spinner animation="grow" size="sm" />}
            </div>
          )}
        </Typeahead>
      </div>
    </Form.Group>
  )
}
