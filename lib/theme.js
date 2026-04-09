import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const styles = {
  global: props => ({
    body: {
      bg: mode(
        props.theme.colors.cinematic.light.dominant,
        props.theme.colors.cinematic.dark.dominant
      )(props),
      color: 'whiteAlpha.900'
    }
  })
}

const components = {
  Heading: {
    variants: {
      'section-title': {
        textDecoration: 'underline',
        fontSize: 20,
        textUnderlineOffset: 6,
        textDecorationColor: '#525252',
        textDecorationThickness: 4,
        marginTop: 3,
        marginBottom: 4
      }
    }
  },
  Link: {
    baseStyle: props => ({
      color: 'whiteAlpha.900',
      textUnderlineOffset: 3
    })
  }
}

const fonts = {
  heading: "'M PLUS Rounded 1c'",
  body: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"
}

const fontSizes = {
  xs: "0.75rem",
  sm: "0.875rem",
  md: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
  "3xl": "1.875rem",
  "4xl": "2.25rem",
  "5xl": "3rem",
  "6xl": "3.75rem",
  "7xl": "4.5rem",
  "8xl": "6rem",
  "9xl": "8rem"
}

const colors = {
  glassTeal: '#88ccca',
  // Cinematic color palette - 30-60-10 ratio
  cinematic: {
    // Dark mode
    dark: {
      dominant: '#202023', // 60% - background
      secondary: '#2d2d32', // 30% - cards, panels
      accent: '#FFD700' // 10% - buttons, highlights (gold)
    },
    // Light mode
    light: {
      dominant: '#f0e7db', // 60% - background
      secondary: '#e8e0d5', // 30% - cards, panels
      accent: '#88ccca' // 10% - buttons, highlights (glass teal)
    }
  }
}

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false
}

const theme = extendTheme({
  config,
  styles,
  components,
  colors,
  fonts,
  fontSizes
})

export default theme
