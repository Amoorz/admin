import Ajax from 'api/axios'

// 登录
export const platformAuth = (data) => {
    return Ajax.post('/login', data)
}

// 获取用户信息
export const getUserInfo = (data) => {
    return Ajax.post('/api/Account/GetAccountLoginInfo', data) 
}

// 短信验证码登录
export const sendCode = (data) => {
    return Ajax.post('/api/Zthysms/SendVerificationCode', data)
}