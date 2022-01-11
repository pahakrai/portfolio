import NextLink from 'next/link'
import { useState, useRef, useEffect } from 'react'
import styles from '../styles/Home.module.css'
import Layout from '../components/layouts/article'
import Section from '../components/section'
import Paragraph from '../components/paragraph'
import { BioSection, BioYear } from '../components/bio'
import styled from '@emotion/styled'
import { AnimatePresence, motion } from 'framer-motion'
import { useIntl } from 'react-intl'

const TypeWrite = styled.p`
  overflow: hidden;
  border-right: 0.1em solid orange;
  white-space: nowrap;
  // margin: 0 auto;
  letter-spacing: 0.1em;
  animation: typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite;

  @keyframes typing {
    from {
      width: 0;
    }
    to {
      width: 50%;
    }
  }

  @keyframes blink-caret {
    from,
    to {
      border-color: transparent;
    }
    50% {
      border-color: orange;
    }
  }
`

// const Home = () => {
//   return (
//     <Layout>
//       <Container maxW="container.lg">
//         <div align="center" mt={{ base: 6 }} mb={{ base: 6 }}>
//           <a href="#" class={styles.neonButton}>
//             eat; sleep; code; repeat;
//           </a>
//         </div>
//         <div
//           broderRadius="lg"
//           bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}
//           p={3}
//           mb={6}
//           // align="center"
//           display="flex"
//           alignItems="baseline"
//         >
//           ~ &emsp;
//           <TypeWrite>
//             Hello, I&apos;m a full-stack developer based in Hong Kong
//           </TypeWrite>
//         </div>
//         <div display={{ md: 'flex' }}>
//           <div flexGrow={1}>
//             <div as="h2" variant="page-title">
//               Pahak Rai
//             </div>
//             <p>Digital Craftman (Developer / Designer)</p>
//           </div>
//           <div
//             flexShrink={0}
//             mt={{ base: 4, md: 0 }}
//             ml={{ md: 6 }}
//             align="center"
//           >
//             <Image
//               borderColor="whiteAlpha.800"
//               borderwidth={2}
//               borderStyle="solid"
//               maxWidth="100px"
//               display="inline-block"
//               borderRadius="full"
//               src="/images/pahak.png"
//               alt="Profile Image"
//             />
//           </div>
//         </div>
//         <Section delay={0.1}>
//           <div as="h3" variant="section-title">
//             Work
//           </div>
//           <Paragraph>
//             I am a full stack developer looking for more freelance opportunities
//             to provide solutions as services. If I am not coding I would be
//             dabbling with music or hiking.
//           </Paragraph>
//           <div align="center" my={4}>
//             <NextLink href="/works">
//               <Button rightIcon={<ChevronRightIcon />} colorScheme="teal">
//                 Portfolio
//               </Button>
//             </NextLink>
//           </div>
//         </Section>
//         <Section delay={0.2}>
//           <div as="h3" variant="section-title">
//             Bio
//           </div>
//           <BioSection>
//             <BioYear>1987</BioYear>
//             Born in Kathmandu, Nepal
//           </BioSection>
//           <BioSection>
//             <BioYear>2012</BioYear>
//             Completed the Master&apos;s Mobile Computing at University of West
//             London
//           </BioSection>
//         </Section>
//         <Section delay={0.3}>
//           <div as="h3" variant="section-title">
//             I Love
//           </div>
//           <Paragraph>
//             Art, Music, <Link>Drawing</Link>, Playing Guitar,{' '}
//             <Link>& Photography</Link>
//           </Paragraph>
//         </Section>
//       </Container>
//     </Layout>
//   )
// }

const FirstComponent = () => (
  <motion.div
    style={{ display: 'inline-block' }}
    initial={{ y: -20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    exit={{ y: 20, opacity: 0 }}
    transition={{ duration: 0.2 }}
  >
    <div as="h2" variant="page-title">
      First Component Contents
    </div>
  </motion.div>
)

const SecondComponent = () => (
  <motion.div
    style={{ display: 'inline-block' }}
    initial={{ y: -20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    exit={{ y: 20, opacity: 0 }}
    transition={{ duration: 0.2 }}
  >
    <div as="h2" variant="page-title">
      Second Component Contents
    </div>
  </motion.div>
)

const Drawer = ({ children }) => <div>{children}</div>

const Home = () => {
  const buttonRef = useRef()
  const intl = useIntl()
  const [drawerItems] = useState([
    {
      id: 1,
      name: intl.formatMessage({ id: 'label_username' }),
      component: <FirstComponent />
    },
    {
      id: 2,
      name: intl.formatMessage({ id: 'label_password' }),
      component: <SecondComponent />
    }
  ])

  const [activeDrawerId, setActiveDrawerId] = useState(1)

  const onClickItemButton = id => {
    if (activeDrawerId !== id) setActiveDrawerId(id)
    if (activeDrawerId === id) setActiveDrawerId(0)
  }

  useEffect(() => console.log(buttonRef, 'ref here '), [buttonRef])

  return (
    <div className="container.lg">
      <div align="center" mt={{ base: 6 }} mb={{ base: 6 }}>
        {drawerItems?.map(item => (
          <button
            ref={buttonRef}
            ml={{ base: 6 }}
            onClick={() => onClickItemButton(item.id)}
            _active={false}
            key={item.id}
          >
            {item.name}
          </button>
        ))}
      </div>
      <p>test content</p>
      {/* <Drawer>
          <AnimatePresence>
            {drawerItems?.find(item => item.id === activeDrawerId)?.component}
          </AnimatePresence>
        </Drawer> */}
    </div>
  )
}

export default Home
