import Logo from './logo'
import NextLink from 'next/link'

import ThemeToggleButton from './theme-toggle-button'
import { useIntl } from 'react-intl'
import { Navbar, Nav, Container } from 'react-bootstrap'

// CHECK HOW TO MAKE IT WORK PROPERLY WITH REACT-BOOTSTRAP
const LinkItem = ({ href, path, children }) => {
  const active = path === href
  return <NextLink href={href}>{children}</NextLink>
}

// TODO: MOVE SOMEwHERE AS A UTIL WHICH CAN USE SITEMAP
const prepareNavLinks = () => {
  const intl = useIntl()
  return [
    {
      priority: 1,
      link: '/signup',
      display_text: intl.formatMessage({ id: 'display_signup' })
    },
    {
      priority: 2,
      link: '/works',
      display_text: intl.formatMessage({ id: 'display_works' })
    }
  ]
}

const Navigation = props => {
  const { path } = props
  const navLinks = prepareNavLinks()

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>
          <Logo />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {navLinks
              .sort((nav, navNext) => nav.priority - navNext.priority)
              .map(navObj => (
                <LinkItem href={navObj.link} path={path} key={navObj.priority}>
                  {navObj.display_text}
                </LinkItem>
              ))}
            {/* <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation
