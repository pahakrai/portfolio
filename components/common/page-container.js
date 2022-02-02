import { Container } from 'react-bootstrap'
import Layout from '../layouts/article'

export default function PageContainer({ children }) {
  return (
    <Layout>
      <Container
        style={{
          maxWidth: '400px',
          marginTop: '5vh',
          marginBottom: '5vh'
        }}
      >
        {children}
      </Container>
    </Layout>
  )
}
