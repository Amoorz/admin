import Ajax from 'api/axios'

// 查询机构性质列表
export const getOrganizePropertyType = (data) => {
    return Ajax.post('/api/OrganizeType/GetOrganizePropertyType', data)
}

// 查询机构信息-单个
export const getOrganizeTypeSingle = (data) => {
    return Ajax.post('/api/OrganizeType/GetOrganizeTypeSingle', data)
}

// 查询机构信息-分页
export const getOrganizeTypePagedList = (data) => {
    return Ajax.post('/api/OrganizeType/GetOrganizeTypePagedList', data)
}

// 添加机构信息
export const addOrganizeType = (data) => {
    return Ajax.post('/api/OrganizeType/AddOrganizeType', data)
}

// 修改机构信息
// export const modifyOrganizeType = (data) => {
//     return Ajax.post('/api/OrganizeType/ModifyOrganizeType', data)
// }

export const modifyOrganizeType = (data) => {
    return Ajax.post('https://www.easy-mock.com/mock/5c09dc3357b1777d53e590c8/admin/list', data)
}
