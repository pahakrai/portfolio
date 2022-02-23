import dynamic from 'next/dynamic'
import ModelLoader from './three-model-wrapper'

const LazyModel = dynamic(() => import('./three-model'), {
  ssr: false,
  loading: () => <ModelLoader />
})

export default LazyModel
