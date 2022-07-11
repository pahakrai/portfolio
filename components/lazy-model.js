import dynamic from 'next/dynamic'
import ModelLoader from './three-model-wrapper'

const LazyModel = dynamic(() => import('./three-water'), {
  ssr: false,
  loading: () => <ModelLoader />
})

export default LazyModel
