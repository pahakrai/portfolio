import { createContext } from 'react'

const defaultTheme = {
  colors: {},
  dimensions: {}
}

export const ThemeContext = createContext(defaultTheme)
