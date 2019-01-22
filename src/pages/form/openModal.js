import React, { Component } from 'react'
import Search from 'components/searchComponent'
import { Modal } from 'antd'

const config = [{
    name: '身份证',
    key: 'RoleTypeId',
    type: 'input',
    placeholder: ''
}, {
    name: '手机',
    key: 'RoleName',
    type: 'input',
    placeholder: ''
}, {
    name: '地址',
    key: 'Permis',
    type: 'input',
    placeholder: ''
}, {
    name: '备注',
    key: 'Remark',
    type: 'input',
    placeholder: ''
}]

class OpenModal extends Component {
    constructor (props) {
        super(props)
        this.state = {}
    }
    onModalComfirm = () => {

    }
    onModalCancel = () => {
        this.props.onStateChange({
            openVisible: false
        })
    }
    render () {
        const {
            visible
        } = this.props
        return (
            <Modal
                title="开户"
                className=""
                // centered
                width={900}
                visible={visible}
                footer={null}
                onCancel={this.onModalCancel}
                destroyOnClose
            >
                <Search
                    config={config}
                    isModal
                    footer
                    column={2}
                    onSearch={this.onModalComfirm}
                    onCancel={this.onModalCancel}
                />
            </Modal>
        )
    }
}

export default OpenModal