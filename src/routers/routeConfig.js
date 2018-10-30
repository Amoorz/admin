// import React from 'react'
import Loadable from 'react-Loadable'
import LoadingComponent from './loadable'

// const LoadingComponent = ({ isLoading, error }) => {
//     if (isLoading) {
//         return <div>Loading...</div>
//     }
//     else if (error) {
//         return <div>Sorry, there was a problem loading the page.</div>
//     }
//     else {
//         return null
//     }
// }

const config = [
    {
        name: 'settings',
        path: '/',
        exact: true,
        component: Loadable({
            loader: () => import(/* webpackChunkName: "settings"*/'pages/settings'),
            loading: LoadingComponent
        })
    }, {
        name: 'user',
        path: '/user',
        exact: false,
        component: Loadable({
            loader: () => import(/* webpackChunkName: "user"*/'pages/user'),
            loading: LoadingComponent
        })
    }, {
        name: 'workplace',
        path: '/workplace',
        exact: false,
        component: Loadable({
            loader: () => import(/* webpackChunkName: "workplace"*/'pages/workplace'),
            loading: LoadingComponent
        })
    }
]

export default config
// export {
//     Settings,
//     User,
//     Workplace
// }