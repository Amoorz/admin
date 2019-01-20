import Ajax from 'api/axios'

// 添加角色
export const addRole = (data) => {
    return Ajax.post('/api/SecurityRole/AddSecurityRole', data)
}

// 修改角色
export const editRole = (data) => {
    return Ajax.post('/api/SecurityRole/ModifySecurityRole', data)
}

// 查询角色列表
export const rolePagedList = (data) => {
    return Ajax.post('/api/SecurityRole/GetSecurityRolePagedList', data)
}

// 添加角色组
export const addRoleType = (data) => {
    return Ajax.post('/api/SecurityRoleType/AddSecurityRoleType', data)
}

// 修改角色组
export const editRoleType = (data) => {
    return Ajax.post('/api/SecurityRoleType/ModifySecurityRoleType', data)
}

// 查询角色组列表
export const RoleTypeSingleList = (data) => {
    return Ajax.post('/api/SecurityRoleType/GetSecurityRoleTypeSingleList', data)
}
