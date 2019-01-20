import React, { Component } from 'react'
import { Table, Button } from 'antd'
import Search from 'components/searchComponent'
import { rolePagedList } from 'services/roleManage-service'
import { checkFields } from 'utils/utils'
import EditModal from './editModal'
import AddModal from './addModal'

const config = [{
    name: '角色所属组',
    key: 'RoleTypeId',
    type: 'input',
    placeholder: '请输入角色所属组'
}, {
    name: '角色名称	',
    key: 'RoleName',
    type: 'input',
    placeholder: '请输入角色名称'
}, {
    name: '权限值',
    key: 'Permis',
    type: 'input',
    placeholder: '请输入权限值'
}, {
    name: '备注',
    key: 'Remark',
    type: 'input',
    placeholder: '请输入备注'
}]

const pageInit = {
    pageSize: 20,
    pageIndex: 1,
}

class roleManage extends Component {
    constructor (props) {
        super(props)
        this.state = {
            dataSource: [],
            loading: true,
            editVisible: false,
            searchFields: {
                ...pageInit,
                param: {}
            }
        }
    }
    componentDidMount () {
        this.tableData()
    }
    onStateChange = (obj, fn) => {
        // console.log(obj)
        this.setState(obj, fn && fn())
    }
    onhandleChange = (pagination, filters, sorter) => {
        console.log(pagination, filters, sorter)
    }
    onSearch = (val) => {
        // console.log(checkFields(val))
        let obj = checkFields(val)
        let len = Object.keys(obj).length
        if (len > 0) {
            this.setState({
                searchFields: {
                    ...pageInit,
                    param: {
                        ...obj   
                    }
                },
                loading: true
            }, () => this.tableData())
        } else {
            this.onClear()
        }
    }
    onClear = () => {
        this.setState({
            searchFields: {
                ...pageInit,
                param: {}
            },
            loading: true
        }, () => this.tableData())
    }
    tableData = () => {
        const { searchFields } = this.state
        rolePagedList(searchFields).then(res => {
            // console.log('rolePagedList--->', JSON.parse(res))
            // let dataSource = []
            // for (let i = 0; i < 30; i++) {
            //     dataSource.push({
            //         RoleTypeId: i,
            //         RoleName: i,
            //         Permis: i,
            //         Remark: i
            //     })
            // }
            let { Item1, Item2 } = JSON.parse(res)
            this.setState({
                // dataSource,
                dataSource: Item1,
                total: Item2,
                loading: false
            })
        }).catch(err => {
            this.setState({
                dataSource: [],
                loading: false
            })
        })
    }
    onAddClick = () => {
        this.setState({
            addVisible: true
        })
    }
    editClick = (text, record) => () => {
        // console.log(record)
        this.setState({
            editVisible: true
        })
    }
    render () {
        const columns = [{
            title: '角色所属组',
            dataIndex: 'RoleTypeId',
            key: 'RoleTypeId'
        }, {
            title: '角色名',
            dataIndex: 'RoleName',
            key: 'RoleName'
        }, {
            title: '权限值',
            dataIndex: 'Permis',
            key: 'Permis'
        }, {
            title: '备注',
            dataIndex: 'Remark',
            key: 'Remark'
        }, {
            title: '操作',
            dataIndex: 'edit',
            render: (text, record) => {
                return (<Button onClick={this.editClick(text, record)}>编辑</Button>)
            }
        }]
        const {
            dataSource,
            loading,
            total,
            addVisible,
            editVisible
        } = this.state
        const pagination = {
            current: 1,
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total, range) => `共 ${total} 条`,
            total
        }
        return (
            <div className="roleManage">
                <Search
                    config={config}
                    onSearch={this.onSearch}
                    onClear={this.onClear}
                />
                <div className="mb10">
                    <Button type="primary" icon="plus" onClick={this.onAddClick}>增加</Button>
                </div>
                <Table
                    loading={loading}
                    dataSource={dataSource}
                    columns={columns}
                    pagination={pagination}
                    onChange={this.onhandleChange}
                    bordered
                />
                <AddModal visible={addVisible} onStateChange={this.onStateChange} />
                <EditModal visible={editVisible} onStateChange={this.onStateChange} />
            </div>
        )
    }
}

export default roleManage