import { Box, Tab, TabList, TabPanel, TabPanels, Tabs, useColorModeValue } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const AnimatedFilter = ({ tag }) => {
  const [type, setType] = useState(tag || 'experience')
  const accentColor = useColorModeValue('#88ccca', '#FFD700')
  const secondaryBg = useColorModeValue('#e8e0d5', '#2d2d32')
  const data = [
    {
      id: 1,
      type: 'project',
      data: 'Buyco',
      src: 'buyco.png',
      description: 'An e-commerce platform with modern UI/UX, shopping cart, and payment integration.'
    },
    {
      id: 2,
      type: 'project',
      data: 'BrilliantWealthy',
      src: 'brilliantwealthy.png',
      description: 'A financial planning application with investment tracking and wealth management features.'
    },
    {
      id: 3,
      type: 'project',
      data: 'PTimes',
      src: 'ptimes.png',
      description: 'A digital news platform with real-time updates, personalized feeds, and multimedia content.'
    },
    {
      id: 4,
      type: 'project',
      data: 'Busgo',
      src: 'busgo.png',
      description: 'A public transportation app with route planning, real-time tracking, and booking system.'
    },
    {
      id: 5,
      type: 'project',
      data: 'FutureMakers',
      src: 'futuremakers.png',
      description: 'An educational platform connecting learners with mentors for skill development and career growth.'
    },
    {
      id: 6,
      type: 'experience',
      data: 'Web Development',
      description:
        'Full-stack web development using HTML, CSS, and JavaScript. React is my preferred framework for building modern, responsive web applications.',
      src: 'azurlane.jpg'
    },
    {
      id: 7,
      type: 'experience',
      data: 'Mobile App Development',
      description:
        'Cross-platform mobile application development using React Native and Flutter. Design, build, and deploy native-feeling apps for iOS and Android.',
      src: 'azurlane.jpg'
    },
    {
      id: 8,
      type: 'experience',
      data: 'Backend Development',
      description:
        'Backend development expertise with Node.js and PHP. Experience deploying and managing scalable applications on AWS cloud infrastructure.',
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
      <Tabs variant="soft-rounded" colorScheme="gray" id="projects-tabs">
        <TabList mb={4} justifyContent="center" spacing={0}>
          {dataType.map((t, idx) => (
            <Tab
              key={idx}
              onClick={() => setType(t)}
              // className={'tag'}
              className={`tag ${t === type ? 'active' : ''}`}
              color='whiteAlpha.900'
              bg={secondaryBg}
              px={6}
              py={3}
              mx={1}
              _selected={{ color: 'whiteAlpha.900', bg: accentColor }}
            >
              <span> {t.charAt(0).toUpperCase() + t.slice(1)}</span>
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
                        <span>{pr.description}</span>
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
