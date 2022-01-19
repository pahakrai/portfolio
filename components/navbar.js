import Logo from './logo'
import NextLink from 'next/link'
import React from 'react'

import ThemeToggleButton from './theme-toggle-button'
import { useIntl } from 'react-intl'
import { Navbar, Nav, Container, Button } from 'react-bootstrap'

import { IoMdArrowRoundBack } from 'react-icons/io'
import { useRouter } from 'next/router'
import styled from '@emotion/styled'
import { useCurrentUser } from '../hooks/api/user'
import { clearToken } from '../lib/auth'
import { queryClient } from '../utils/react-query-client'
import { logout } from '../hooks/logout'

// CHECK HOW TO MAKE IT WORK PROPERLY WITH REACT-BOOTSTRAP
const NavBarLinkItem = ({ href, path, children }) => {
  const active = path === href
  return (
    <NextLink href={href}>
      <Nav.Link
        href="#home"
        active={active}
        style={{ backgroundColor: active ? 'teal' : 'transparent' }}
      >
        {children}
      </Nav.Link>
    </NextLink>
  )
}

// NOTE: with styled-components
// const NavLogoWrapper = styled.div.attrs(() => ({
//   className: 'd-none d-md-block'
// }))`
//   //class features here
// `

// NOTE: simple wrapper
const NavLogoWrapper = ({ children }) => {
  return <div className="d-none d-md-block">{children}</div>
}

const NavBarBackButton = ({ onClick }) => (
  <IoMdArrowRoundBack
    onClick={onClick}
    className="d-block d-md-none" // for medium and small
  />
)

const NavbarWrapper = styled(Navbar)`
  padding-left: 8px;
  padding-right: 8px;

  // &:before {
  //   box-shadow: inset 0 0 2000px rgba(255, 255, 255, 0.5);
  //   filter: blur(10px);
  // }
`

// TODO: MOVE SOMEwHERE AS A UTIL WHICH CAN USE SITEMAP
const prepareNavLinks = currentUser => {
  const intl = useIntl()
  return [
    ...(currentUser
      ? [
          {
            priority: 1,
            link: '/works',
            display_text: intl.formatMessage({ id: 'display_works' })
          }
        ]
      : [])
  ]
}

const Navigation = props => {
  // from react-query hooks
  const { currentUser } = useCurrentUser()
  const router = useRouter()
  const navLinks = prepareNavLinks(currentUser)

  // NOTE: JUST IN CASE OF DIFFERENT NAV BACKGROUND ON SCREENS AFTER LOGIN
  const emptyNavPaths = ['/login', '/']
  const shouldBeEmpty = false || emptyNavPaths.includes(router.pathname)

  return (
    <NavbarWrapper bg="light" expand="lg" hidden={false} sticky="top">
      <Navbar.Brand>
        <NavBarBackButton onClick={() => router.back()} />
        <NavLogoWrapper>
          <Logo />
        </NavLogoWrapper>
      </Navbar.Brand>
      {currentUser && <Navbar.Toggle aria-controls="basic-navbar-nav" />}
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          {navLinks
            .sort((nav, navNext) => nav.priority - navNext.priority)
            .map(navObj => (
              <NavBarLinkItem
                href={navObj.link}
                path={router.pathname}
                key={navObj.priority}
              >
                {navObj.display_text}
              </NavBarLinkItem>
            ))}
        </Nav>
        {currentUser && (
          <Button
            variant="outline-success"
            onClick={() => {
              // logout mutation and cleartoken can be parallel

              // clear access and refresh token
              // clear react queryClient cache
              logout()

              // push to home page
              router.push('/')
            }}
          >
            Logout
          </Button>
        )}
      </Navbar.Collapse>
    </NavbarWrapper>
  )
}

export default Navigation
