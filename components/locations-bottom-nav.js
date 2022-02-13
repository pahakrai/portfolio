import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import LocationList from './location-list'

export default function LocationsBottomNav() {
  const [displayNav, setDisplayNav] = useState(false)

  return (
    <Container
      className={displayNav ? 'bottombar' : 'bottombar close'}
      style={{
        paddingLeft: 0,
        paddingRight: 0
      }}
      // onPan={(e, pointInfo) => {
      //   if (pointInfo.point.x < width) x.set(pointInfo.point.x - width)
      //   // if (pointInfo.velocity.x < 0) x.set(pointInfo.point.x - width)

      //   // console.log("pointInfo.delta.x: ", pointInfo.delta.x)
      //   // console.log("pointInfo.offset.x: ", pointInfo.offset.x)
      //   // console.log("pointInfo.point.x: ", pointInfo.point.x)
      //   // console.log("pointInfo.velocity.x: ", pointInfo.velocity.x)
      // }}
      // onPanEnd={(e, pointInfo) => {
      //   if (Math.abs(pointInfo.velocity.x) > 1000 && !isOpen) {
      //     if (pointInfo.velocity.x > 0) {
      //       x.set(0)
      //     } else x.set(-width)
      //   } else {
      //     if (Math.abs(x.current) < width / 2) {
      //       x.set(0)
      //       // setOpen(true)
      //     } else {
      //       x.set(-width)
      //       // setOpen(false)
      //     }
      //   }
      // }}
    >
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
            <img src="/images/pahak.png" alt="" />
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
          <ul>{displayNav && <LocationList />}</ul>
        </div>
        <div className="bottom-content">
          <li className="">
            <i className="bx bx-log-out icon"></i>
            <span className="text nav-text">Location List End</span>
          </li>
        </div>
      </div>
    </Container>
  )
}
