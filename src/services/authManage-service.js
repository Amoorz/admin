import Ajax from 'api/axios'

// 查询权限列表
export const permisPagedList = (data) => {
    return Ajax.post('/api/SecurityPermis/GetSecurityPermisPagedList', data)
}

