import NextLink from 'next/link'
import {
  Button,
  Container,
  Box,
  Heading,
  Image,
  useColorModeValue
} from '@chakra-ui/react'
import Section from '../components/section'
import Paragraph from '../components/paragraph'
import { ChevronRightIcon } from '@chakra-ui/icons'
import { BioSection, BioYear } from '../components/bio'
import AnimatedFilter from '../components/filter-animated'
import LazyModel from '../components/lazy-model'
import { useState } from 'react'

const Home = () => {
  const [tag, setTag] = useState(null)
  return (
    <Container>
      <Box
        borderRadius="lg"
        bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')}
        p={3}
        mb={6}
        align="center"
      >
        Hello, I&apos;m a full-stack developer based in Hong Kong
      </Box>
      <Box display={{ md: 'flex' }}>
        <Box flexGrow={1}>
          <Heading as="h2" variant="page-title">
            Pahak Rai
          </Heading>
          <p>Developer / Designer</p>
        </Box>
        <Box
          flexShrink={0}
          mt={{ base: 4, md: 0 }}
          ml={{ md: 6 }}
          align="center"
        >
          <Image
            borderColor="whiteAlpha.800"
            borderwidth={2}
            borderStyle="solid"
            maxWidth="100px"
            display="inline-block"
            borderRadius="full"
            src="/images/pahak.png"
            alt="Profile Image"
          />
        </Box>
      </Box>
      <Section delay={0.1}>
        <Heading as="h3" variant="section-title">
          Work
        </Heading>
        <Paragraph>
          I am a full stack developer looking for more freelance opportunities
          to provide solutions as services. If I am not coding I would be
          dabbling with music or hiking.
        </Paragraph>
        <Box align="center" my={4}>
          <NextLink href="/works">
            <Button rightIcon={<ChevronRightIcon />} colorScheme="teal">
              Portfolio
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
          Born in Kathmandu, Nepal
        </BioSection>
        <BioSection>
          <BioYear>2012</BioYear>
          Completed the Master&apos;s Mobile Computing at University of West
          London
        </BioSection>
        <LazyModel onClickTag={t => setTag(t)} />
        <AnimatedFilter tag={tag} />
      </Section>
      <Box align="center" mt={{ base: 6 }} mb={{ base: 6 }}>
        <a href="#" className="neonButton">
          eat; sleep; code; repeat;
        </a>
      </Box>
    </Container>
  )
}

export default Home
