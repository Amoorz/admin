import Loadable from 'react-Loadable'
import React, { Component } from 'react'

const MyLoadingComponent = ({ isLoading, error }) => {
    if (isLoading) {
        return <div>Loading...</div>
    }
    else if (error) {
        return <div>Sorry, there was a problem loading the page.</div>
    }
    else {
        return null
    }
}
   
const LoadableAnotherComponent = Loadable({
    loader: () => import('./index'),
    loading: MyLoadingComponent
})
   
class Setting extends Component {
    render() {
        return <LoadableAnotherComponent/>
    }
}

export default Setting