import { useTheme } from '@emotion/react'
import { useState } from 'react'
import { ButtonGroup, ToggleButton } from 'react-bootstrap'
import { THEME_TYPE } from '../lib/theme'

function ThemeToggle() {
  const [checked, setChecked] = useState(false)
  const [radioValue, setRadioValue] = useState('1')

  const { toggleTheme } = useTheme()

  const radios = [
    { name: THEME_TYPE.LIGHT, value: THEME_TYPE.LIGHT },
    { name: THEME_TYPE.DARK, value: THEME_TYPE.DARK }
  ]

  return (
    <>
      <ButtonGroup style={{ marginRight: '1rem' }}>
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant={idx % 2 ? 'outline-success' : 'outline-danger'}
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => {
              setRadioValue(e.currentTarget.value)
              toggleTheme(e.currentTarget.value)
            }}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
    </>
  )
}

export default ThemeToggle
