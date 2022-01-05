import {
  Container,
  Box,
  Heading,
  Image,
  useColorModeValue
} from '@chakra-ui/react'
import styles from '../styles/Home.module.css'

const Home = () => {
  return (
    <Container>
      <Box align="center" mt={{ base: 6 }} mb={{ base: 6 }}>
        <a href="#" class={styles.neonButton}>
          eat; sleep; code;
        </a>
      </Box>
      <Box
        broderRadius="lg"
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
          <p>Digital Craftman (Developer / Designer)</p>
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
            src="/images/takya.jpg"
            alt="Profile Image"
          />
        </Box>
      </Box>
    </Container>
  )
}

export default Home
