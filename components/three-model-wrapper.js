import { forwardRef } from 'react'
import { Box, Spinner } from '@chakra-ui/react'
import { Box2 } from 'three'

export const ModelSpinner = () => (
  <Spinner
    size="xl"
    position="absolute"
    left="50%"
    top="50%"
    ml="calc(0px - var(--spinner-size) / 2)"
    mt="calc(0px - var(--spinner-size))"
  />
)

export const ModelContainer = forwardRef(({ children }, ref) => (
  <Box
    ref={ref}
    width={'100%'}
    maxWidth={'100%'}
    // m="auto"
    // className="voxel-dog"
    // mt={['-20px', '-20px']}
    // mb={['-20px', '-20px']}
    // w={[2160, 2160]}
    // h={[2160, 2160]}
    position="fixed"
  >
    {children}
  </Box>
))

ModelContainer.displayName = 'ModelContainer'

const ModelLoader = () => {
  return (
    <ModelContainer>
      <ModelSpinner />
    </ModelContainer>
  )
}

export default ModelLoader
