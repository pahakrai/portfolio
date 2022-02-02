import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef } from 'react'

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
            hidden: i => ({
              opaciity: 0,
              y: -50 * i
            }),
            visible: i => ({
              opacity: 1,
              transition: { delay: i * 0.05 },
              y: 0
            }),
            removed: {
              opacity: 0
            }
          }}
          className="nav-link"
          initial={hasRendered.current ? 'visible' : 'hidden'}
          animate="visible"
          exit="removed"
          custom={i}
          key={location.id}
        >
          <a href="#">
            <i className="bx bx-home-alt icon"></i>
            <span className="text nav-text">{location.address}</span>
          </a>
        </motion.li>
      ))}
    </AnimatePresence>
  )
}
