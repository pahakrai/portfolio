import Logo from './logo'
import NextLink from 'next/link'
import {
  Container,
  Box,
  Link,
  Stack,
  Heading,
  Flex,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  IconButton,
  useColorModeValue
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons'
import ThemeToggleButton from './theme-toggle-button'

const LinkItem = ({ href, path, children }) => {
  const active = path === href
  const inactiveColor = 'whiteAlpha.900'
  const accentColor = useColorModeValue('#88ccca', '#FFD700')
  const secondaryBg = useColorModeValue('#e8e0d5', '#2d2d32')

  return (
    <NextLink href={href}>
      <Link
        p={3}
        bg={active ? accentColor : undefined}
        color={active ? 'whiteAlpha.900' : inactiveColor}
        fontSize="lg"
        fontWeight="medium"
        borderRadius="md"
        _hover={{
          textDecoration: 'none',
          bg: active ? accentColor : secondaryBg,
          transform: 'translateY(-2px)',
          transition: 'all 0.2s'
        }}
      >
        {children}
      </Link>
    </NextLink>
  )
}

const Navbar = props => {
  const { path } = props
  const accentColor = useColorModeValue('#88ccca', '#FFD700')
  const secondaryBg = useColorModeValue('#e8e0d5', '#2d2d32')
  const navbarBg = useColorModeValue('#e8e0d540', '#2d2d3280')
  return (
    <Box
      position="fixed"
      as="nav"
      w="100%"
      bg={navbarBg}
      style={{ backdropFilter: 'blur(10px)' }}
      zIndex={1}
      {...props}
    >
      <Container
        display="flex"
        p={2}
        maxW="container.lg"
        wrap="wrap"
        align="center"
        justify="space-between"
      >
        <Flex align="center" mr={5}>
          <Heading as="h1" size="lg" letterSpacing={'tighter'} color='whiteAlpha.900'>
            <Logo />
          </Heading>
        </Flex>
        <Stack
          direction={{ base: 'column', md: 'row' }}
          display={{ base: 'none', md: 'flex' }}
          width={{ base: 'full', md: 'auto' }}
          alignItems="center"
          flexGrow={1}
          // mt={{base: 4, nmd: 0}}
        >
          <LinkItem href="/works" path={path}>
            Works
          </LinkItem>
          <LinkItem href="/posts" path={path}>
            Posts
          </LinkItem>
        </Stack>
        <Box flex={1} align="right">
          <ThemeToggleButton />
          <Box ml={2} display={{ base: 'inline-block', md: 'none' }}>
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<HamburgerIcon />}
                variant="outline"
                aria-label="Options"
                color='whiteAlpha.900'
                borderColor='whiteAlpha.900'
                bg={secondaryBg}
                _hover={{ bg: accentColor }}
              />
              <MenuList
                bg={secondaryBg}
                color='whiteAlpha.900'
                borderColor={secondaryBg}
                style={{ backdropFilter: 'blur(10px)' }}
              >
                <NextLink href="/" passHref>
                  <MenuItem as={Link} _hover={{ bg: accentColor }} fontSize="md" py={2}>About</MenuItem>
                </NextLink>
                <NextLink href="/works" passHref>
                  <MenuItem as={Link} _hover={{ bg: accentColor }} fontSize="md" py={2}>Works</MenuItem>
                </NextLink>
                <NextLink href="/posts" passHref>
                  <MenuItem as={Link} _hover={{ bg: accentColor }} fontSize="md" py={2}>Posts</MenuItem>
                </NextLink>
              </MenuList>
            </Menu>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

export default Navbar
