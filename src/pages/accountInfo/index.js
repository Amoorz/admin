import React, { Component } from 'react'
import Search from 'components/searchComponent'
import { Table, Button } from 'antd'
import OpenModal from './openModal'
// import VerifyModal from './verifyModal'
// import ChangeModal from './changeModal'

const ButtonGroup = Button.Group

const config = [{
    name: '姓名',
    key: 'IDNumber',
    type: 'input',
    placeholder: '请输入姓名',
    // disabled: true
}, {
    name: '地址',
    key: 'RoleName',
    type: 'input',
    placeholder: '请输入地址'
}, {
    name: '规则',
    key: 'RoleName',
    type: 'input',
    placeholder: '请输入规则'
}]

class AccountInfo extends Component {
    constructor (props) {
        super(props)
        this.state = {
            dataSource: [{key: 0}],
            openVisible: false,
            verifyVisible: false,
            changeVisible: false
        }
    }
    componentDidMount () {

    }
    onStateChange = (obj, fn) => {
        // console.log(obj)
        this.setState(obj, fn && fn())
    }
    onSearch = () => {

    }
    onClear = () => {

    }
    onOpenClick = () => {
        this.setState({
            openVisible: true
        })
    }
    render () {
        const columns = [{
            title: '操作',
            dataIndex: 'edit',
            render: (text, record) => {
                return (
                    <ButtonGroup size="small">
                        <Button>冻结/解冻</Button>
                        <Button>验证</Button>
                        <Button>变更资料</Button>
                    </ButtonGroup>
                )
            }
        }]
        const {
            dataSource,
            openVisible,
            // verifyVisible,
            // changeVisible
        } = this.state
        return (
            <div className="accountInfo">
                <Search
                    config={config}
                    onSearch={this.onSearch}
                    onClear={this.onClear}
                />
                <div className="mb10">
                    <Button type="primary" icon="plus" onClick={this.onOpenClick}>开户</Button>
                </div>
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    bordered
                />
                <OpenModal visible={openVisible} onStateChange={this.onStateChange} />
                {/* <VerifyModal visible={verifyVisible} onStateChange={this.onStateChange} />
                <ChangeModal visible={changeVisible} onStateChange={this.onStateChange} /> */}
            </div>
        )
    }
}

export default AccountInfo