import { useTheme } from '@emotion/react'

const ThemeToggleButton = () => {
  const { toggleTheme, theme } = useTheme()

  return <div aria-label="Toggle theme" onClick={toggleTheme}></div>
}

export default ThemeToggleButton
