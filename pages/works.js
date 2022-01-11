import thumbInkdrop from '../public/images/pahak.png'
import Layout from '../components/layouts/article'

const Works = () => {
  return (
    <Layout>
      <div>
        <div as="h3" fontSize={20} mb={4}>
          Works
        </div>

        <div
          overflowX="auto"
          maxW="100vw"
          h="100%"
          whiteSpace="nowrap"
          pb="17px"
          color="white"
          // px="32px"
          // the ::-webkit-scrollbar property should goes here
          flexDirection={'row'}
        >
          <div maxW={'40vw'} h="40px" bg="yellow.200">
            1
          </div>
          <div maxW={'40vw'} h="40px" bg="yellow.200">
            1
          </div>
          <div maxW={'40vw'} h="40px" bg="yellow.200">
            1
          </div>
          <div maxW={'40vw'} h="40px" bg="yellow.200">
            1
          </div>
          <div maxW={'40vw'} h="40px" bg="yellow.200">
            1
          </div>
          <div maxW={'40vw'} h="40px" bg="yellow.200">
            1
          </div>
        </div>
        <div templateColumns="repeat(5, 1fr)" gap={6}>
          <div w="100%" h="10" bg="blue.500" />
          <div w="100%" h="10" bg="blue.500" />
          <div w="100%" h="10" bg="blue.500" />
        </div>
        <div columns={[1, 1, 2]} gap={6}>
          <div delay={0.3}>
            <div id="inkdrop" title="Inkdrop" thumbnail={thumbInkdrop}>
              wow just wow
            </div>
          </div>
        </div>
        <div columns={[1, 1, 2]} gap={6}>
          <div delay={0.3}>
            <div id="inkdrop" title="Inkdrop" thumbnail={thumbInkdrop}>
              wow just wow
            </div>
          </div>
        </div>
        <div columns={[1, 1, 2]} gap={6}>
          <div delay={0.3}>
            <div id="inkdrop" title="Inkdrop" thumbnail={thumbInkdrop}>
              wow just wow
            </div>
          </div>
        </div>
        <div delay={0.4}>
          <div as="h3" fontSize={20}>
            Old Works
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Works
