import axios from 'axios'
// import {envConfig, clearAllCookie, regExp} from './utils'
import { envConfig } from 'utils/utils'
// import { message } from 'antd'

// 无需添加token的接口
const noApiToken = [
    '/api/oauth2/token'
]

// 设置请求头
const setHeader = (url, method)=> {
    if(method === "UPLOAD"){
        return {
            'Accept': '*/*',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'X-Requested-With'
        }
    }
    let header = {
        // 'Accept': 'application/json, text/plain, */*',
        'Accept': 'application/json, */*',
        'Content-Type': 'application/json'
    }
    let token = JSON.parse(localStorage.getItem('token'))
    // console.log('token--->', token)
    // 如果存在token直接加入到头部
    if(token && (!noApiToken.includes(url))){
        // header["Authorization"] = token
    }else{
        // header["Access-Control-Allow-Headers"] = 'accept, origin, content-type'
    }
    return header
}

// 参数拼接
const urlEncode = function (param, key, encode) {
    if (param == null) return ''
    var paramStr = ''
    var t = typeof (param)
    if (t === 'string' || t === 'number' || t === 'boolean') {
        paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param)
    } else {
        for (var i in param) {
            var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i)
            paramStr += urlEncode(param[i], k, encode)
        }
    }
    return paramStr
}

const Ajax = (method, url, params) => {
    method = method.toUpperCase()

    var myRequest = ''

    // 开发环境联调后端
    if(url.indexOf('http') >= 0){
        myRequest = url
    }else{
        myRequest = envConfig.api + url
    }
    // myRequest = envConfig.api + url

    const header = setHeader(url, method)
    if(method === 'UPLOAD'){
        method = 'POST'
    }
    return new Promise((resolve, reject) => {
        axios({
            url: myRequest, 
            method,
            headers: header,
            // credentials : 'omit',
            // mode : "cors",
            data: params
        }).then((response) => {
            console.log(response)
            // debugger
            if (response.ok || response.status === 200) {
                return response.data;
            } else {
                // try {
                    // fundebug.notify("ajaxError",response.status,{...params,myRequest})// eslint-disable-line no-undef
                // } catch (error) {}
                reject({status: response.status})
            }
        }).then(responseData => {
            // console.log(responseData)
            resolve(responseData)
            if(responseData && responseData.IsSucceed) {
                // resolve(responseData.Entity)
            } else {
                
                reject(responseData)
            }
        }).catch(err => {
            reject(err)
        })
    })
}

export default {
    async get ( url, data, IsUrlParams ) {
        // 传入第三个参数 true，url 拼接data
        if(IsUrlParams){
            url += '/' + data
        }else{
            let enCodeData = urlEncode(data).substr(1)
            if(enCodeData){
                url += '?' + enCodeData
            }
        }
        return Ajax('get', url)
    },
    async post ( url, data ) {
        // data = JSON.stringify(data)
        // console.log(data)
        return Ajax('post', url, data)
    },
    async put ( url, data ) {
        data = JSON.stringify(data)
        return Ajax('put', url, data)
    },
    async delete ( url, data, IsUrlParams ) {
        // 传入第三个参数 true，url 拼接data
        if(IsUrlParams){
            url += '/' + data
            return Ajax('delete', url)
        }
        return Ajax('delete', url, data)
    },
    async uploadPost ( url, formData ) {
        return Ajax('upload', url, formData)
    }
}