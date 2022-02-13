import React, { useState } from 'react'
import NextLink from 'next/link'
import { useIntl } from 'react-intl'
import styled from '@emotion/styled'
import { useRouter } from 'next/router'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { Navbar, Nav, Button, Container } from 'react-bootstrap'

import { logout } from '../hooks/logout'
import { useCurrentUser } from '../hooks/api/user'

import ThemeToggle from './theme-toggle'
import ThemeToggleButton from './theme-toggle-button'

import Logo from './logo'
import Menubar from './menu-sidebar'
import { H1 } from './common'
import { askForNotificationPermission } from '../helpers/notification'

// NOTE: with styled-components
// const NavLogoWrapper = styled.div.attrs(() => ({
//   className: 'd-none d-md-block'
// }))`
//   //class features here
// `

const MenuButton = styled.button`
  background-color: black;
  border: none;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  margin: 0.5rem 0 0 0.5rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  &::before,
  &::after {
    content: '';
    background-color: white;
    height: 2px;
    width: 1rem;
    position: absolute;
    transition: all 0.3s ease;
  }
  &::before {
    top: ${(props) => (props.clicked ? '1.5' : '1rem')};
    transform: ${(props) => (props.clicked ? 'rotate(135deg)' : 'rotate(0)')};
  }
  &::after {
    top: ${(props) => (props.clicked ? '1.2' : '1.5rem')};
    transform: ${(props) => (props.clicked ? 'rotate(-135deg)' : 'rotate(0)')};
  }
`

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
const NavLogoWrapper = ({ children }) => {
  return <div className="d-none d-md-block">{children}</div>
}

// NOTE: simple wrapper
const NavBarBackButton = ({ onClick }) => (
  <IoMdArrowRoundBack
    onClick={onClick}
    className="d-block d-md-none" // for medium and small
  />
)

const NavbarWrapper = styled(Navbar)`
  padding-left: 8px;
  padding-right: 8px;

  &:before {
    box-shadow: inset 0 0 2000px rgba(255, 255, 255, 0.5);
    filter: blur(10px);
  }
`

// TODO: MOVE SOMEwHERE AS A UTIL WHICH CAN USE SITEMAP
export const useNavLinks = (currentUser) => {
  const intl = useIntl()
  return [
    {
      priority: 1,
      link: '/',
      display_text: intl.formatMessage({ id: 'display_home' })
    },
    ...(currentUser
      ? [
          {
            priority: 2,
            link: '/subscription',
            display_text: intl.formatMessage({ id: 'display_subscription' })
          },
          {
            priority: 3,
            link: '/location',
            display_text: intl.formatMessage({ id: 'display_location' })
          }
        ]
      : [])
  ]
}

const NavBar = (props) => {
  // from react-query hooks
  const { currentUser } = useCurrentUser()
  const router = useRouter()
  const [clicked, setClicked] = useState(false)
  const navLinks = useNavLinks(currentUser)

  // NOTE: JUST IN CASE OF DIFFERENT NAV BACKGROUND ON SCREENS AFTER LOGIN
  const emptyNavPaths = ['/login', '/']
  const shouldBeEmpty = false || emptyNavPaths.includes(router.pathname)
  const handleClick = (boolVal) => {
    if (boolVal || boolVal === false) {
      setClicked(boolVal)
    } else {
      setClicked(!clicked)
    }
  }

  return (
    <>
      <Menubar clicked={clicked} setClicked={handleClick} />
      <NavbarWrapper bg="light" expand="lg" hidden={false} sticky="top">
        <Navbar.Brand>
          <NavBarBackButton onClick={() => router.back()} />
          <NavLogoWrapper>
            <Logo />
          </NavLogoWrapper>
        </Navbar.Brand>
        <Container className="d-none d-md-block" fluid>
          <div className="d-flex justify-content-between">
            <Nav className="me-auto">
              {navLinks
                .sort((nav, navNext) => nav.priority - navNext.priority)
                .map((navObj) => (
                  <NavBarLinkItem
                    href={navObj.link}
                    path={router.pathname}
                    key={navObj.priority}
                  >
                    {navObj.display_text}
                  </NavBarLinkItem>
                ))}
            </Nav>
            <div>
              <ThemeToggle />
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
              <Button
                variant="outline-success"
                onClick={askForNotificationPermission}
              >
                Enable Notifications
              </Button>
            </div>
          </div>
        </Container>
        <div className="d-block d-md-none">
          <MenuButton
            clicked={clicked}
            onClick={() => handleClick()}
          ></MenuButton>
        </div>
      </NavbarWrapper>
    </>
  )
}

export default NavBar
