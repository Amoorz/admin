import React from 'react'
import Loadable from 'react-Loadable'
import layoutComponent from 'components/layoutComponent'

const LoadingComponent = ({ isLoading, error }) => {
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

// 基础路由
export const constantMap = [
    {
        name: '登录',
        path: '/',
        exact: true,
        component: Loadable({
            loader: () => import(/* webpackChunkName: "login"*/'pages/login'),
            loading: LoadingComponent
        })
    }, {
        name: '后台',
        path: '/library',
        exact: false,
        isLayout: true,
        component: layoutComponent
    }, {
        name: '404',
        path: '*',
        exact: false,
        component: Loadable({
            loader: () => import(/* webpackChunkName: "404"*/'pages/404'),
            loading: LoadingComponent
        })
    }
]

// 带layout的路由配置
export const layoutMap = [
    {
        name: '工作台',
        path: '/workplace',
        icon: 'gateway',
        auth: 'workplace',
        component: Loadable({
            loader: () => import(/* webpackChunkName: "workplace"*/'pages/workplace'),
            loading: LoadingComponent
        })
    }, {
        name: '查询表格',
        path: '/accountInfo',
        icon: 'table',
        auth: 'accountInfo',
        component: Loadable({
            loader: () => import(/* webpackChunkName: "accountInfo"*/'pages/accountInfo'),
            loading: LoadingComponent
        })
    }, {
        name: '生命周期',
        path: '/lifecycle',
        icon: 'calendar',
        auth: 'Lifecycle',
        component: Loadable({
            loader: () => import(/* webpackChunkName: "lifecycle"*/'pages/lifecycle'),
            loading: LoadingComponent
        })
    }, {
        name: '组件通信',
        path: '/communicate',
        icon: 'phone',
        auth: 'communicate',
        component: Loadable({
            loader: () => import(/* webpackChunkName: "communicate"*/'pages/communicate'),
            loading: LoadingComponent
        })
    }, {
        name: 'react router dom',
        path: '/ledgerAccount',
        icon: 'database',
        auth: 'ledgerAccount',
        children: [
            {
                name: '001',
                path: '/journal',
                exact: false,
                auth: 'journal',
                component: Loadable({
                    loader: () => import(/* webpackChunkName: "journal"*/'pages/ledgerAccount/journal'),
                    loading: LoadingComponent
                })
            }, {
                name: '002',
                path: '/accountDetails',
                exact: false,
                auth: 'accountDetails',
                component: Loadable({
                    loader: () => import(/* webpackChunkName: "accountDetails"*/'pages/ledgerAccount/accountDetails'),
                    loading: LoadingComponent
                })
            }, {
                name: '003',
                path: '/wallet',
                exact: false,
                auth: 'wallet',
                component: Loadable({
                    loader: () => import(/* webpackChunkName: "wallet"*/'pages/ledgerAccount/wallet'),
                    loading: LoadingComponent
                })
            }
        ]
    }, {
        name: 'redux',
        path: '/systemManage',
        icon: 'coffee',
        auth: 'dashboard',
        children: [
            {
                name: '001',
                path: '/accountManage',
                exact: false,
                auth: 'accountManage',
                component: Loadable({
                    loader: () => import(/* webpackChunkName: "accountManage"*/'pages/systemManage/accountManage'),
                    loading: LoadingComponent
                })
            }, {
                name: '002',
                path: '/roleManage',
                exact: false,
                auth: 'roleManage',
                component: Loadable({
                    loader: () => import(/* webpackChunkName: "roleManage"*/'pages/systemManage/roleManage'),
                    loading: LoadingComponent
                })
            }, {
                name: '003',
                path: '/authManage',
                exact: false,
                auth: 'authManage',
                component: Loadable({
                    loader: () => import(/* webpackChunkName: "authManage"*/'pages/systemManage/authManage'),
                    loading: LoadingComponent
                })
            }, {
                name: '004',
                path: '/houseInfo',
                exact: false,
                auth: 'houseInfo',
                component: Loadable({
                    loader: () => import(/* webpackChunkName: "houseInfo"*/'pages/systemManage/houseInfo'),
                    loading: LoadingComponent
                })
            }, {
                name: '005',
                path: '/logManage',
                exact: false,
                auth: 'logManage',
                component: Loadable({
                    loader: () => import(/* webpackChunkName: "logManage"*/'pages/systemManage/logManage'),
                    loading: LoadingComponent
                })
            }
        ]
    }
]

// export const layoutMap = [
//     {
//         name: '用户管理',
//         path: '/user',
//         icon: 'pie-chart',
//         auth: 'user',
//         children: [
//             {
//                 name: '信息',
//                 path: '/info',
//                 auth: 'info',
//                 component: Loadable({
//                     loader: () => import(/* webpackChunkName: "info"*/'pages/test/info.js'),
//                     loading: LoadingComponent
//                 })
//             }
//         ]
//     }, {
//         name: '地图管理',
//         path: '/map',
//         icon: 'inbox',
//         auth: 'map',
//         component: Loadable({
//             loader: () => import(/* webpackChunkName: "map"*/'pages/test/map.js'),
//             loading: LoadingComponent
//         })
//     }, {
//         name: '业务',
//         path: '/business',
//         icon: 'desktop',
//         auth: 'business',
//         children: [
//             {
//                 name: '内部',
//                 path: '/inner',
//                 auth: 'inner',
//                 component: Loadable({
//                     loader: () => import(/* webpackChunkName: "inner"*/'pages/test/inner.js'),
//                     loading: LoadingComponent
//                 })
//             }, {
//                 name: '外部',
//                 path: '/outer',
//                 auth: 'outer',
//                 children: [
//                     {
//                         name: '交易',
//                         path: '/deal',
//                         auth: 'deal',
//                         children: [
//                             {
//                                 name: '时间',
//                                 path: '/time',
//                                 auth: 'time',
//                                 component: Loadable({
//                                     loader: () => import(/* webpackChunkName: "time"*/'pages/test/time.js'),
//                                     loading: LoadingComponent
//                                 })
//                             }, {
//                                 name: '金额',
//                                 path: '/sum',
//                                 auth: 'sum',
//                                 component: Loadable({
//                                     loader: () => import(/* webpackChunkName: "sum"*/'pages/test/sum.js'),
//                                     loading: LoadingComponent
//                                 })
//                             }
//                         ]
//                     }, {
//                         name: '反馈',
//                         path: '/feedback',
//                         auth: 'feedback',
//                         component: Loadable({
//                             loader: () => import(/* webpackChunkName: "feedback"*/'pages/test/feedback.js'),
//                             loading: LoadingComponent
//                         })
//                     }, {
//                         name: '申请',
//                         path: '/apply',
//                         auth: 'apply',
//                         children: [
//                             {
//                                 name: '清单',
//                                 path: '/detailed',
//                                 auth: 'detailed',
//                                 component: Loadable({
//                                     loader: () => import(/* webpackChunkName: "detailed"*/'pages/test/detailed.js'),
//                                     loading: LoadingComponent
//                                 })
//                             }, {
//                                 name: '人员',
//                                 path: '/staff',
//                                 auth: 'staff',
//                                 component: Loadable({
//                                     loader: () => import(/* webpackChunkName: "staff"*/'pages/test/staff.js'),
//                                     loading: LoadingComponent
//                                 })
//                             }
//                         ]
//                     }
//                 ]
//             }
//         ]
//     }
// ]

// 遍历带layout的路由
function routesLoop (arr, base = []) {
    let currentArr = base, // 记录当前路由
        nextArr = [] // 下一个路由
        // exact
    for (let i = 0; i < arr.length; i++) {
        const { name, path, children, auth, component } = arr[i]
        if (children) {
            for (let j = 0; j < children.length; j++) {
                if (children[j].children) {
                    nextArr.push({
                        name: `${name}-${children[j].name}`,
                        path: `${path}${children[j].path}`,
                        auth: children[j].auth,
                        routeName: children[j].name,
                        // exact: children[j].exact,
                        children: children[j].children
                    })
                } else {
                    currentArr.push({
                        name: `${name}-${children[j].name}`,
                        path: `${path}${children[j].path}`,
                        auth: children[j].auth,
                        routeName: children[j].name,
                        // exact: children[j].exact,
                        component: children[j].component
                    })
                }
            }
        } else {
            currentArr.push({
                name,
                path,
                auth,
                routeName: name,
                component
            })
        }
    }
    if (nextArr.length > 0) {
        return routesLoop(nextArr, currentArr)
    } else {
        return currentArr
    }
}

// 获取带子级菜单的菜单列表
function menuIdLoop (arr, base = []) {
    let currentArr = base, // 记录当前路由
        nextArr = [] // 下一个路由
    for (let i = 0; i < arr.length; i++) {
        const { name, children, id } = arr[i]
        if (children) {
            if (!id) {
                currentArr.push({
                    name,
                })
            } else {
                currentArr.push({
                    name,
                    id
                })
            }
            for (let j = 0; j < children.length; j++) {
                if (children[j].children) {
                    nextArr.push({
                        name: children[j].name,
                        id: id ? `${id}-${name}-${children[j].name}` : `${name}-${children[j].name}`,
                        children: children[j].children
                    })
                }
            }
        }
    }
    if (nextArr.length > 0) {
        return menuIdLoop(nextArr, currentArr)
    } else {
        return currentArr
    }
}

// layout路由列表
export const layoutTree = routesLoop(layoutMap)
// layout路由名称列表
// export const layoutPathName = layoutTree.map((v) => v.routeName)
// menu 菜单点击其中一个其他收起 配置
export const menuTree = menuIdLoop(layoutMap)