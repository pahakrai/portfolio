import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Card from './card'

const deliveryLocations = [
  {
    id: 1,
    address: 'Lalitpur 17',
    delivered: false
  },
  {
    id: 2,
    address: 'Dharan 15',
    delivered: true
  },
  {
    id: 3,
    address: 'Satdobato',
    delivered: true
  },
  {
    id: 4,
    address: 'Thecho',
    delivered: true
  }
]

export default function LocationList() {
  const hasRendered = useRef(false)
  const [selectedAddress, setSelectedAddress] = useState(1)

  useEffect(() => {
    if (deliveryLocations.length) {
      hasRendered.current = true
    } else {
      hasRendered.current = true
    }
  }, [deliveryLocations])

  return (
    <AnimatePresence>
      {deliveryLocations.map((location, i) => (
        <motion.li
          variants={{
            hidden: (i) => ({
              opaciity: 0,
              y: -50 * i
            }),
            visible: (i) => ({
              opacity: 1,
              transition: { delay: i * 0.05 },
              y: 0
            }),
            removed: {
              opacity: 0
            }
          }}
          initial={hasRendered.current ? 'visible' : 'hidden'}
          animate="visible"
          exit="removed"
          custom={i}
          key={location.id}
          onClick={() => setSelectedAddress(location.id)}
          className={selectedAddress ? 'step step-active' : 'step'}
          style={{
            backgroundColor:
              selectedAddress === location.id ? '#D3D3D3' : 'transparent'
          }}
        >
          <div style={{ height: 'inherit' }}>
            <div className="circle">
              {i === 0 ? <i className="fa fa-check"></i> : i}
            </div>
          </div>
          <div>
            <div className="title">Steps</div>
            <div className="caption">{location.address}</div>
          </div>
        </motion.li>
      ))}
    </AnimatePresence>
  )
}
