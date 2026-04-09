import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'

const ThemeToggleButton = () => {
  const { toggleColorMode } = useColorMode()
  const accentColor = useColorModeValue('#88ccca', '#FFD700')
  const secondaryBg = useColorModeValue('#e8e0d5', '#2d2d32')

  return (
    <IconButton
      aria-label="Toggle theme"
      bg={secondaryBg}
      _hover={{ bg: accentColor }}
      icon={useColorModeValue(<MoonIcon />, <SunIcon />)}
      onClick={toggleColorMode}
      color='whiteAlpha.900'
      borderColor='whiteAlpha.900'
    ></IconButton>
  )
}

export default ThemeToggleButton
