import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const AnimatedFilter = ({ tag }) => {
  const [type, setType] = useState(tag || 'experience')
  const data = [
    {
      id: 1,
      type: 'project',
      data: 'Buyco',
      src: 'buyco.png'
    },
    {
      id: 2,
      type: 'project',
      data: 'BrilliantWealthy',
      src: 'brilliantwealthy.png'
    },
    {
      id: 3,
      type: 'project',
      data: 'PTimes',
      src: 'ptimes.png'
    },
    {
      id: 4,
      type: 'project',
      data: 'Busgo',
      src: 'busgo.png'
    },
    {
      id: 5,
      type: 'project',
      data: 'FutureMakers',
      src: 'futuremakers.png'
    },
    {
      id: 6,
      type: 'experience',
      data: 'Web Development',
      description:
        'Design and development with HTML, CSS, JS. React is my current preferred framwork for web.',
      src: 'azurlane.jpg'
    },
    {
      id: 7,
      type: 'experience',
      data: 'Mobile App Development',
      description:
        'Design and deploy mobile hybrid applications with React Native and Flutter.',
      src: 'azurlane.jpg'
    },
    {
      id: 8,
      type: 'experience',
      data: 'Backend Developemnt',
      description:
        'Experience in Backend Development with NodeJS, PHP and currently in demand AWS infrastructure',
      src: 'azurlane.jpg'
    }
  ]
  useEffect(() => {
    if (tag) {
      setType(tag)
    }
  }, [tag])
  const dataType = ['experience', 'project']
  const filteredData = type ? data.filter(data => data.type === type) : data
  return (
    <div>
      {/* <Box className="filter-option">
        <div className="tags"></div>
      </Box> */}
      {/* <Box> */}
      <Tabs variant="soft-rounded" colorScheme="green" id="projects-tabs">
        <TabList>
          {dataType.map((t, idx) => (
            <Tab
              key={idx}
              onClick={() => setType(t)}
              // className={'tag'}
              className={`tag ${t === type ? 'active' : ''}`}
            >
              <span> {t}</span>
            </Tab>
          ))}
          {/* <button onClick={() => setType(null)}>clear</button> */}
        </TabList>
        <motion.div layout>
          <TabPanels>
            <TabPanel className="filters">
              {filteredData.map((pr, idx) => (
                <AnimatePresence key={idx}>
                  <motion.div
                    layout
                    animate={{ opacity: 1 }}
                    initial={{ opacity: 0 }}
                    exit={{ opacity: 0 }}
                    className="filter"
                  >
                    <div className="experience-txtx">
                      <h3>{pr.data}</h3>
                      <span style={{ marginTop: '16px' }}>
                        {pr.description}
                      </span>
                    </div>
                    {pr.src && (
                      <img src={pr.src} style={{ objectFit: 'cover' }} />
                    )}
                  </motion.div>
                </AnimatePresence>
              ))}
            </TabPanel>
            <TabPanel className="filters">
              {filteredData.map((pr, idx) => (
                <AnimatePresence key={idx}>
                  <motion.div
                    layout
                    animate={{ opacity: 1 }}
                    initial={{ opacity: 0 }}
                    exit={{ opacity: 0 }}
                    className="filter"
                  >
                    <div className="proj-imgbx">
                      <img src={pr.src} style={{ objectFit: 'cover' }} />
                      <div className="proj-txtx">
                        <h4>{pr.data}</h4>
                        <span>{pr.data}</span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              ))}
            </TabPanel>
          </TabPanels>
        </motion.div>
      </Tabs>
      {/* </Box> */}
    </div>
  )
}

export default AnimatedFilter
