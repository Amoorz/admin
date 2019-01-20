import { setCookie, getCookie, delCookie, clearAllCookie } from "./cookie"
// import Global from "./Global";
const env = process.env.MY_ENV || 'dev'

let envConfig = {
    'dev':{
        api:"https://www.easy-mock.com/mock/5c09dc3357b1777d53e590c8/admin",
        imgPrefix:"http://wxpt.localhome.cn",//房源图片
        newImagePrefix:"http://120.78.15.214",//上传图片
        designImagePrefix:"http://qy.localhome.com.cn/locals",// 签名图片
        // fileUrl:'http://192.168.0.215:9092'
        fileUrl:'http://120.76.204.105'
    },
    'uat':{
        api:"http://uat.localhome.cn/api",
        imgPrefix:"http://wxpt.localhome.cn",
        newImagePrefix:"http://120.78.15.214",
        designImagePrefix:"http://qy.localhome.com.cn/locals",
        // fileUrl:'http://192.168.0.215:9092'
        fileUrl: 'http://120.76.204.105'//临时下载文件地址 到时候改测试的
    },
    'prod':{
        api:"http://ms.localhome.cn/api",
        imgPrefix:"http://app.localhome.cn",//线上房源图片
        newImagePrefix:"http://120.76.204.105",
        designImagePrefix:"http://qy.localhome.com.cn/locals",
        fileUrl:'http://120.76.204.105'
    }
}
envConfig = envConfig[env]

const getNewImagePrefix = (url) => {
    if(typeof url !== "string")return ""
    if((url.includes("/upload/") || url.includes("Article")) && (!url.includes("http"))){
        return (envConfig.newImagePrefix + url)
    }
    return url
}

const getImgPrefix = (url) => {
    if(typeof url !== "string")return ""
    if(url.includes("/upload/") || !url.includes("http")){
        return (envConfig.imgPrefix + url)
    }
    return url
}

// const onExit = function () {
//     // 退出
//     return new Promise((resolve, reject) => {
//         sessionStorage.clear()
//         clearAllCookie()
//         Global.userInfo = {}
//         Global.role = []
//         Global.token = ''
//         Global.pathName = ''
//         window.location.reload()
//         resolve({success: true})
//     })
// }
// 正则
const regExp = {
    tel: /^1[3|4|5|7|8][0-9]\d{8}$/,
    chinese: /[\u4e00-\u9fa5]{1}/,
    int: /^[1-9]\d*$/,
    intDot: /^([1-9]\d*|0)(\.\d{1,2})?$/
}

const pageOption = {
    // 分页公共object
    pageSizeOpts: ['10','20','50','100','2000'],
    pageNum: 1,
    pageSize: 10
}
const dataFormat = function (d, fmt = 'yyyy-MM-dd') {
    // 日期格式化
    if (!(d > 0)) {
        return ''
    }
    if (typeof d !== "number") {
        d = +d
    }
    var date = new Date(d)
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(regExp.$1, (date.getFullYear() + '').substr(4 - regExp.$1.length))
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    }
    for (let k in o) {
        if (new regExp(`(${k})`).test(fmt)) {
            let str = o[k] + ''
            fmt = fmt.replace(regExp.$1, (regExp.$1.length === 1) ? str : ('00' + str).substr(str.length))
        }
    }
    return fmt
}


function checkKey (list) {
    let items = list

    if(checkType.isArray (items)){
        function connetKey () {
            return createUUID()
        }
        for(let i in items){
            if (items[i]) {
                items[i]['key'] = items[i].key ? items[i].key : connetKey()
            }
        }
        return items
    }else{
        return items
    }
}

function getNowTime (){
    return new Date().getTime()
}

function createUUID (t = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx',ary = 16){
    var d = getNowTime ()
    var uuid = t.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * ary) % ary | 0
        d = Math.floor(d / ary)
        return (c === 'x' ? r : ((r && 0x7) || 0x8)).toString(ary)
    })
    return uuid
}

const checkType = {
    isNumber : function (arg){
        return Object.prototype.toString.call(arg) === '[object Number]'
    },
    isString : function (arg){
        return Object.prototype.toString.call(arg) === '[object String]'
    },
    isUndefined : function (arg){
        return Object.prototype.toString.call(arg) === '[object Undefined]'
    },
    isBoolean : function (arg){
        return Object.prototype.toString.call(arg) === '[object Boolean]'
    },
    isObject : function (arg){
        return Object.prototype.toString.call(arg) === '[object Object]'
    },
    isArray : function (arg){
        return Object.prototype.toString.call(arg) === '[object Array]'
    },
    isFunction : function (arg){
        return Object.prototype.toString.call(arg) === '[object Function]'
    },
    isEmpty: function (s) {
        if(typeof(s) === "undefined" || s === null || s === "" || s.toString().trim() === "") {
            return true
        } else {
            return false
        }
    }
}

// 筛选obj属性，只保留有定义的字段
function checkFields (obj) {
    let sth = {}
    for (let i in obj) {
        if (obj[i]) {
            if (obj[i].constructor === String && obj[i]) {
                sth[i] = obj[i]
            } else if (obj[i].constructor === Array && obj[i].length > 0) {
                sth[i] = obj[i]
            }
        }
    }
    return sth
}

// 判断对象是否为空
function checkVain (obj) {
    var arr = Object.keys(obj)
    return arr.length === 0 
}

function setStorage (key, value) {
    var curtime = new Date().getTime() // 获取当前时间
    localStorage.setItem(key, JSON.stringify({val: value, time: curtime})) // 转换成json字符串序列
}

// exp是设置的过期时间
function getStorage (key, exp = 15 * 24 * 60 * 60 * 1000) {
    // 获取存储的元素
    var val = localStorage.getItem(key)
    // 解析出json对象
    var dataobj = JSON.parse(val)
    // 如果当前时间 - 减去存储的元素在创建时候设置的时间 > 过期时间
    if (new Date().getTime() - dataobj.time > exp) {
        // 提示过期
        return "expires"
    } else {
        return dataobj.val
    }
}

export {
    envConfig,
    getNewImagePrefix,
    getImgPrefix,
    // onExit,
    setCookie,
    getCookie,
    delCookie,
    clearAllCookie,
    regExp,
    pageOption,
    dataFormat,
    createUUID,
    checkType,
    checkKey,
    checkFields,
    checkVain,
    setStorage,
    getStorage
}