import { motion } from 'framer-motion'
import isPropValid from '@emotion/is-prop-valid'
import styled from '@emotion/styled'

const StyledDiv = styled(motion.div, {
  shouldForwardProp: prop => {
    return isPropValid(prop) || prop === 'transition'
  }
})

const Section = ({ children, delay = 0 }) => (
  <StyledDiv
    initial={{ y: 10, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.8, delay }}
    mb={6}
  >
    {children}
  </StyledDiv>
)

export default Section
