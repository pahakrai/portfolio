import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import Image from 'next/image'
import NextLink from 'next/link'
import { debounce } from 'lodash'
import { prepareNavLinks } from './navbar'
import { useCurrentUser } from '../hooks/api/user'

const Container = styled.div`
  position: fixed;
  z-index: 9999;

  .active {
    border-right: 4px solid white;

    img {
      filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg)
        brightness(103%) contrast(103%);
    }
  }
`

const SidebarContainer = styled.div`
  background-color: black;
  width: ${props => (props.clicked ? '12rem' : 0)};
  height: 100vh;
  border-radius: 0 16px 16px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  position: relative;
`

const Logo = styled.div`
  width: 2rem;

  img {
    width: 100%;
    height: auto;
  }
`

const SlickBar = styled.ul`
  color: white;
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: black;

  padding: 2rem 0;

  position: absolute;
  left: 0;

  width: ${props => (props.clicked ? '12rem' : 0)};
  height: 100vh;
  transition: all 0.5s ease;
  border-radius: 0 16px 16px 0;
`

const Item = styled.a`
  text-decoration: none;
  color: white;
  width: 100%;
  padding: 1rem 0;
  cursor: pointer;

  display: flex;
  padding-left: 1rem;

  &:hover {
    border-right: 4px solid white;

    img {
      filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg)
        brightness(103%) contrast(103%);
    }
  }

  img {
    width: 1.2rem;
    height: auto;
    filter: invert(92%) sepia(4%) saturate(1033%) hue-rotate(169deg)
      brightness(78%) contrast(85%);
  }
`

const Text = styled.span`
  width: ${props => (props.clicked ? '100%' : '0')};
  overflow: hidden;
  margin-left: ${props => (props.clicked ? '1.5rem' : '0')};
  transition: all 0.3s ease;
`

const Profile = styled.div`
  width: ${props => (props.clicked ? '14rem' : '3rem')};
  height: 3rem;

  padding: 0.5rem 1rem;
  /* border: 2px solid white; */
  border-radius: 20px;

  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: ${props => (props.clicked ? '9rem' : '0')};

  background-color: black;
  color: white;

  transition: all 0.3s ease;

  img {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    cursor: pointer;

    &:hover {
      border: 2px solid var(--grey);
      padding: 2px;
    }
  }
`

const Details = styled.div`
  display: ${props => (props.clicked ? 'flex' : 'none')};
  justify-content: space-between;
  align-items: center;
`

const Name = styled.div`
  padding: 0 1.5rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h4 {
    display: inline-block;
  }

  a {
    font-size: 0.8rem;
    text-decoration: none;
    color: var(--grey);

    &:hover {
      text-decoration: underline;
    }
  }
`

const Logout = styled.button`
  border: none;
  width: 2rem;
  height: 2rem;
  background-color: transparent;

  img {
    width: 100%;
    height: auto;
    filter: invert(15%) sepia(70%) saturate(6573%) hue-rotate(2deg)
      brightness(100%) contrast(126%);
    transition: all 0.3s ease;
    &:hover {
      border: none;
      padding: 0;
      opacity: 0.5;
    }
  }
`

const Menubar = ({ clicked, setClicked }) => {
  const [profileClick, setprofileClick] = useState(false)
  const { currentUser } = useCurrentUser()
  const handleProfileClick = () => setprofileClick(!profileClick)

  useEffect(() => {
    const debouncedHandleResize = debounce(() => {
      setClicked(false)
    }, 0)
    window.addEventListener('resize', debouncedHandleResize)
    return _ => {
      window.removeEventListener('resize', debouncedHandleResize)
    }
  })

  const links = prepareNavLinks(currentUser)

  return (
    <Container>
      <SidebarContainer>
        <SlickBar clicked={clicked}>
          {links.map(link => (
            <NextLink href={link.link}>
              <Item onClick={() => setClicked(false)}>
                <Image
                  src={'/images/pahak.png'}
                  alt="Home"
                  width={60}
                  height={60}
                  roundedCircle
                />
                <Text clicked={clicked}>{link.display_text}</Text>
              </Item>
            </NextLink>
          ))}
        </SlickBar>
        {/* <Profile clicked={profileClick}>
          <Image
            onClick={() => handleProfileClick()}
            src={'/images/pahak.png'}
            alt="Profile"
            width={60}
            height={60}
            roundedCircle
          />
          <Details clicked={profileClick}>
            <Name>
              <h4>Jhon&nbsp;Doe</h4>
              <a href="/#">view&nbsp;profile</a>
            </Name>
            <Logout>
              <Image
                src={'/images/pahak.png'}
                alt="logout"
                width={60}
                height={60}
                roundedCircle
              />
            </Logout>
          </Details>
        </Profile> */}
      </SidebarContainer>
    </Container>
  )
}

export default Menubar
