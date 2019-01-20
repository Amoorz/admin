import Ajax from 'api/axios'

// 添加账号
export const addAccount = (data) => {
    return Ajax.post('/api/account/AddAccount', data)
}

// 修改账号
export const editAccount = (data) => {
    return Ajax.post('/api/account/ModifyAccoun', data)
}

// 获取登陆账号信息
export const loginInfo = (data) => {
    return Ajax.post('/api/Account/GetAccountLoginInfo', data)
}