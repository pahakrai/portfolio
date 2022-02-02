import { forwardRef, useImperativeHandle, useState } from 'react'
import { Container, Row } from 'react-bootstrap'

const SideBar = forwardRef(({ children }, ref) => {
  const [display, setDisplay] = useState(false)

  useImperativeHandle(ref, () => ({
    toggleSidebar: () => setDisplay(!display)
  }))

  return (
    <div className={display ? 'sidebar' : 'sidebar close'}>
      {/* <div
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
      </div> */}
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
      <div className="locations-bar">
        <div className="location">
          <ul className="location-links">
            <li className="nav-link">
              <a href="#">
                <i className="bx bx-home-alt icon"></i>
                <span className="text nav-text">Location</span>
                {children}
              </a>
            </li>
          </ul>
        </div>
        <div className="bottom-content">
          <li className="">
            <i className="bx bx-log-out icon"></i>
            <span className="text nav-text">Location List End</span>
          </li>
        </div>
      </div>
    </div>
  )
})

export default SideBar
