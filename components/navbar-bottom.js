import { useState } from 'react'
import { Container, Row } from 'react-bootstrap'
export default function NavBarBottom() {
  const [displayNav, setDisplayNav] = useState(false)

  return (
    <Container className={displayNav ? 'bottombar' : 'bottombar close'}>
      <div
        style={{
          alignSelf: 'center',
          justifyContent: 'center',
          display: 'flex'
        }}
      >
        <div
          style={{
            width: '200px',
            height: '8px',
            borderRadius: '8px',
            backgroundColor: 'black'
          }}
          onClick={() => setDisplayNav(!displayNav)}
        />
      </div>
      <header>
        <div className="image-text">
          <span className="image">
            <img src="logo.png" alt="" />
          </span>
          <div className="text logo-text">
            <span className="name">Finishes 5 pm</span>
            <span className="profession">40 stops 220 kms</span>
          </div>
        </div>
        {/* <i className="bx bx-chevron-right toggle"></i> */}
      </header>
      <div className="menu-bar">
        <div className="menu">
          <ul className="menu-links">
            <li className="nav-link">
              <a href="#">
                <i className="bx bx-home-alt icon"></i>
                <span className="text nav-text">Location</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="bottom-content">
          <li className="">
            <a href="#">
              <i className="bx bx-log-out icon"></i>
              <span className="text nav-text">Location List End</span>
            </a>
          </li>
          <li className="mode">
            <span className="mode-text text">Dark mode</span>
            <div className="toggle-switch">
              <span className="switch"></span>
            </div>
          </li>
        </div>
      </div>
    </Container>
  )
}
