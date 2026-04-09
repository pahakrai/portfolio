import NextLink from 'next/link'
import {
  Button,
  Container,
  Box,
  Heading,
  Image,
  Text,
  useColorModeValue,
  Flex,
  Stack
} from '@chakra-ui/react'
import Section from '../components/section'
import Paragraph from '../components/paragraph'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { BioSection, BioYear } from '../components/bio'
import AnimatedFilter from '../components/filter-animated'
import LazyModel from '../components/lazy-model'
import { useState } from 'react'
import Skills from '../components/skills'

const Home = () => {
  const [tag, setTag] = useState(null)
  const accentColor = useColorModeValue('#88ccca', '#FFD700')
  const secondaryBg = useColorModeValue('#e8e0d5', '#2d2d32')
  return (
    <Container maxWidth={'container.xl'}>
      <Box className="shape" display="flex" flexDirection="column" alignItems="center" justifyContent="center" mb={6}>
        <Box
          flexShrink={0}
          mt={{ base: 4, md: 0 }}
          ml={{ md: 6 }}
          align="center"
        >
          <Image
            borderColor="whiteAlpha.800"
            borderWidth={2}
            borderStyle="solid"
            height="120px"
            width="120px"
            display="inline-block"
            borderRadius="full"
            objectFit="cover"
            src="/images/pahak.png"
            alt="Profile Image"
          />
        </Box>
        <svg className="headingWrapper color-bright" width="100%" >
          <text
            id="text"
            x="50%"
            y="70%"
            fontFamily="'Cabin Condensed'"
            fontSize="160"
            className="header header--pushDown header--shadow"
            textAnchor="middle"
          >
            PAHAK RAI
          </text>
        </svg>
        <Text fontSize="lg" textAlign="center" mt={2}>
          Developer / Designer
        </Text>
      </Box>
      {/* <Box
        borderRadius="lg"
        bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}
        p={3}
        mb={6}
        // align="center"
      >
        <h1>
          Coding is
          <div className="scroller">
            <span>
              Cool
              <br />
              Art
              <br />
              Intruiging
              <br />
              Challenging
            </span>
          </div>
        </h1>
        <p className="note">
          Hello, I&apos;m a full-stack developer based in Hong Kong
        </p>
      </Box> */}
      <Box display={{ md: 'flex' }}>
        <Box flexGrow={1}>
          <Text fontSize="md" className="note">
            Hello, I&apos;m a full-stack developer based in Hong Kong
          </Text>
        </Box>
        <Box
          flexShrink={0}
          mt={{ base: 4, md: 0 }}
          ml={{ md: 6 }}
          align="center"
        >
          {/* <Image
            borderColor="whiteAlpha.800"
            borderWidth={2}
            borderStyle="solid"
            maxWidth="100px"
            display="inline-block"
            borderRadius="full"
            src="/images/pahak.png"
            alt="Profile Image"
          /> */}
        </Box>
      </Box>
      <Section delay={0.1}>
        <Heading as="h3" variant="section-title">
          Work
        </Heading>
        <Paragraph>
          As a seasoned full-stack developer, I specialize in creating robust digital solutions and delivering high-quality software services. My expertise spans across modern web technologies, enabling me to build scalable applications from concept to deployment. When not architecting code, I find inspiration in music composition and outdoor exploration.
        </Paragraph>
        <Box align="center" my={4}>
          <NextLink href="https://github.com/pahakrai">
            <Button rightIcon={<ChevronRightIcon />} bg={secondaryBg} _hover={{ bg: accentColor }} color='whiteAlpha.900'>
              Github
            </Button>
          </NextLink>
        </Box>
      </Section>
      <Section delay={0.2}>
        <Heading as="h3" variant="section-title">
          Bio
        </Heading>
        <BioSection>
          <BioYear>1987</BioYear>
          Born in Kathmandu, Nepal, with a multicultural perspective that informs my approach to global software solutions.
        </BioSection>
        <BioSection>
          <BioYear>2012</BioYear>
          Earned a Master&apos;s degree in Mobile Computing from the University of West London, specializing in mobile application development and emerging technologies.
        </BioSection>
      </Section>
      <Section>
        <AnimatedFilter tag={tag} />
      </Section>
      <Section>
        <Skills />
      </Section>
      <Section delay={0.3}>
        <Heading as="h3" variant="section-title" mb={6}>
          Contact
        </Heading>
        <Stack spacing={4} align="center" justify="center">
          <Flex
            direction={{ base: 'column', md: 'row' }}
            align="center"
            justify="center"
            spacing={6}
            wrap="wrap"
          >
            <a
              href="https://wa.me/85263540451"
              target="_blank"
              rel="noopener noreferrer"
              className="neonButton"
              aria-label="Contact via WhatsApp"
              title="Open WhatsApp to message +45 64 54 04 51"
              style={{
                margin: '8px 16px',
                backgroundColor: accentColor
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: 'bold', fontSize: '1.125rem', marginBottom: '4px' }}>Phone</div>
                <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>+852 63540451</div>
              </div>
            </a>
            <a
              href="mailto:rai.pahak@gmail.com"
              className="neonButton"
              aria-label="Send email"
              title="Open email client to send message to rai.pahak@gmail.com"
              style={{
                margin: '8px 16px',
                backgroundColor: accentColor
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: 'bold', fontSize: '1.125rem', marginBottom: '4px' }}>Email</div>
                <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>rai.pahak@gmail.com</div>
              </div>
            </a>
          </Flex>
        </Stack>
      </Section>
    </Container>
  )
}

export default Home
