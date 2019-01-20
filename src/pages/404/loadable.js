import Loadable from 'react-loadable';
import LoadingComponent from '../../components/LoadingComponent'

const LoadableComponent = Loadable({
    loader: () => import('./index'),
    loading: LoadingComponent
})

export default LoadableComponent