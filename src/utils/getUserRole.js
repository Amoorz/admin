import Global from '../utils/Global.js'
import { userService } from '../services'
import RoutesItem from '../configRoutes'
import {getCookie, clearAllCookie} from '../utils/utils';
import {notification} from 'antd';

const checkToken = async () =>{
    const token = Global.token ? Global.token : getCookie('token')
    return new Promise((resolve, reject) => {
        if(token){
            if(!getCookie('token')){
                clearAllCookie()
            }
            Global.token = token
            getUserInfo(resolve, reject)
        } else {
            reject({
                error:'no token'
            })
            // this.props.history.push('/login')
        }
    })
}
const getUserInfo = (resolve, reject) =>{
    // 获取用户信息
    userService.getUserInfo().then((data)=>{
        if (data){
            Global.userInfo = {...data}
            sessionStorage.setItem('userInfo', JSON.stringify(Global.userInfo))
            getUserRole(Global.userInfo.id, resolve, reject)
        }
    }).catch(() =>{
        reject({error: 'no userInfo'})
    })
}
const getUserRole = (id, resolve, reject) =>{
    // 获取用户权限
    userService.getUserRole(id).then((data)=>{
        const role = [...data].map(_ => _.authCode)
        Global.role = role
        const routers = routerFilter(role)
        // console.log('routers', routers)
        if(routers && routers.length > 0 && routers[0].firstRoute){
            resolve({
                firstRoute: routers[0].firstRoute
            })
        }else{
            notification.error({
                message: '提示',
                description: '用户暂无权限',
                duration: 0
            })
            reject({error: 'User No Role'})
        }
    }).catch((e)=>{
        // 获取用户权限出错
        console.log('e',e)
        reject({error: 'no userRole'})
    })
}
const MapActivePath = (route,pathName,item = []) => {
    const activeRoute = route.filter(_ => {
        let index
        if(_.path.includes('/:')){
            const path = _.path.substr(0,_.path.indexOf('/:') + 1)
            index = pathName.indexOf(path)
            _.pathlength = path.length
        }else{
            index = pathName.indexOf(_.path)
            _.pathlength = _.path.length
        }
        return index >= 0
    }).sort((a,b) => a.pathlength < b.pathlength)[0]
    item.push(activeRoute)
    if(activeRoute && activeRoute.childRoutes && activeRoute.childRoutes.length > 0){
        const index = pathName.indexOf(activeRoute.path) + activeRoute.path.length
        MapActivePath(activeRoute.childRoutes, pathName.substr(index),item)
    }
    return item
}
const routerFilter = (roleList) => {
    // 路由过滤
    let routes = [...RoutesItem.RoutesItem]
    // console.log('routes=>',[...routes])
    routes[0].childRoutes = routes[0].childRoutes.filter(_ => {
        if(_.authority && _.authority.includes('*')){
            return true
        }
        const roleMapBol = roleMap(_.authority,roleList)
        if(roleMapBol) {
            if(_.childRoutes && Array.isArray(_.childRoutes)){
                _.childRoutes = _.childRoutes.filter(i => (i.authority && i.authority.includes('*')) || roleMap(i.authority,roleList))
            }
        }
        return roleMapBol
    })
    const href = window.location.hash.substr(1)
    const firstRoute = getFirst([...routes[0].childRoutes])
    let pathName = MapActivePath(routes[0].childRoutes, href === "/login" ? firstRoute : href).filter(_ => _)
    if (pathName.length > 0){
        routes[0].activePath = pathName.map(_=> _.path).join('=>')
        routes[0].activePathName = pathName.map(_=> _.pathName).join('=>')
    }else{
        routes[0].activePath = ""
        routes[0].activePathName = ""
    }
    routes[0].firstRoute = firstRoute
    routes[0].loading = true
    RoutesItem.RoutesItem = routes
    // console.log('routes', routes)
    return routes
}
const roleMap = ( authority, roleList ) => {
    // 权限循环
    if(Array.isArray(authority) && Array.isArray(roleList)){
        return authority.filter(i=>roleList.includes(i)).length > 0
    }
    return false
}
const getFirst = (router, path = '') => {
    if(router[0] && (router[0].noNav || router[0].noRoute)){
        if(router[1]){
            router.splice(0,1)
            return getFirst(router,path)
        }
    }else if(router[0] && router[0].childRoutes && router[0].childRoutes.length > 0 && (router[0].noChildLink !== true)){
        return getFirst(router[0].childRoutes,path + '/' + (router[0].path || ''))
    }else if(router[0] && router[0].componentDom && router[0].path){
        return (path || '') + ((router && router[0]) ? '/' + (router[0].path || '') : '')
    }else if(router[1]){
        router.splice(0,1)
        return getFirst(router,path)
    }
    return path
}
export default checkToken
export {MapActivePath}