// import React from 'react'
// import Loadable from 'react-Loadable'
import layoutComponent from 'components/layoutComponent'

import Login from 'pages/login'
import page404 from 'pages/404'
import Workplace from 'pages/workplace'
import Form from 'pages/form'
import Lifecycle from 'pages/lifecycle'
import Communicate from 'pages/communicate'
import Center from 'pages/account/center'
import Settings from 'pages/account/settings'

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

// 基础路由
export const constantMap = [
    {
        name: '登录',
        path: '/',
        exact: true,
        // component: Loadable({
        //     loader: () => import(/* webpackChunkName: "login"*/'pages/login'),
        //     loading: LoadingComponent
        // })
        component: Login
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
        // component: Loadable({
        //     loader: () => import(/* webpackChunkName: "404"*/'pages/404'),
        //     loading: LoadingComponent
        // })
        component: page404
    }
]

// 带layout的路由配置
export const layoutMap = [
    {
        name: '工作台',
        path: '/workplace',
        icon: 'gateway',
        auth: 'workplace',
        // component: Loadable({
        //     loader: () => import(/* webpackChunkName: "workplace"*/'pages/workplace'),
        //     loading: LoadingComponent
        // })
        component: Workplace
    }, {
        name: '查询表格',
        path: '/form',
        icon: 'table',
        auth: 'form',
        // component: Loadable({
        //     loader: () => import(/* webpackChunkName: "accountInfo"*/'pages/accountInfo'),
        //     loading: LoadingComponent
        // })
        component: Form
    }, {
        name: '生命周期',
        path: '/lifecycle',
        icon: 'calendar',
        auth: 'Lifecycle',
        // component: Loadable({
        //     loader: () => import(/* webpackChunkName: "lifecycle"*/'pages/lifecycle'),
        //     loading: LoadingComponent
        // })
        component: Lifecycle
    }, {
        name: '组件通信',
        path: '/communicate',
        icon: 'phone',
        auth: 'communicate',
        // component: Loadable({
        //     loader: () => import(/* webpackChunkName: "communicate"*/'pages/communicate'),
        //     loading: LoadingComponent
        // })
        component: Communicate
    }, {
        name: '用户页',
        path: '/account',
        icon: 'user',
        exact: false,
        auth: 'account',
        children: [
            {
                name: '个人中心',
                path: '/center',
                exact: false,
                auth: 'Center',
                component: Center
            }, {
                name: '个人设置',
                path: '/settings',
                exact: false,
                auth: 'settings',
                component: Settings
            }
        ]
    }
]

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