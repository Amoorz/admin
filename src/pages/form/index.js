import React, { Component } from 'react'
import Search from 'components/searchComponent'
import { Table, Button } from 'antd'
import OpenModal from './openModal'

const ButtonGroup = Button.Group

const config = [{
    name: '文字',
    key: 'input',
    type: 'input',
    placeholder: '请输入文字',
    // disabled: true
}, {
    name: '数字',
    key: 'number',
    type: 'inputNumber',
    placeholder: '请输入数字'
}, {
    name: '选框',
    key: 'select',
    type: 'select',
    placeholder: '请选择城市',
    opts: [{
        text: '广州',
        value: '001'
    }]
}, {
    name: '联立选框',
    key: 'cascader',
    type: 'cascader',
    placeholder: '请选择内容',
    opts: [{
        value: '1',
        label: 'Zhejiang',
        children: [{
            value: '2',
            label: 'Hangzhou',
            children: [{
                value: '3',
                label: 'West Lake'
            }]
        }]
    }]
}, {
    name: '日期',
    key: 'datePicker',
    type: 'datePicker',
    placeholder: '请选择日期'
}, {
    name: '开始 - 结束',
    key: 'rangePicker',
    type: 'rangePicker',
    placeholder: ['开始', '结束']
  }]

class AccountInfo extends Component {
    constructor (props) {
        super(props)
        this.state = {
            dataSource: [{key: 0}],
            openVisible: false
        }
    }
    componentDidMount () {
        let arr = []
        for (let i = 0; i < 10; i++) {
            arr.push({
                ID: '指标',
                phone: '15355364881',
                remake: '这是一条备注'
            })
        }
        this.setState({
            dataSource: arr
        })
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
            title: 'ID',
            dataIndex: 'ID',
            key: 'ID',
            width: 100
        }, {
            title: '手机',
            dataIndex: 'phone',
            key: 'phone',
            width: 100
        }, {
            title: '备注',
            dataIndex: 'remake',
            key: 'remake',
            width: 100
        }, {
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
            },
            width: 300
        }]
        const {
            dataSource,
            openVisible
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
                    scroll={{ x: 1000}}
                />
                <OpenModal visible={openVisible} onStateChange={this.onStateChange} />
            </div>
        )
    }
}

export default AccountInfo