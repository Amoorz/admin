import React, { Component } from 'react'
import Search from 'components/searchComponent'
import { Modal } from 'antd'

const config = [{
    name: '用户姓名',
    key: 'name',
    type: 'input',
    placeholder: '请输入用户名'
}]

class ChangeModal extends Component {
    constructor (props) {
        super(props)
        this.state = {}
    }
    onModalComfirm = (val) => {
        console.log(val)
        // addRoleType().then()
    }
    onModalCancel = () => {
        this.props.onStateChange({
            changeVisible: false
        })
    }
    render () {
        const {
            visible
        } = this.props
        return (
            <Modal
                title="账户资料"
                className=""
                centered
                width={null}
                visible={visible}
                footer={null}
                onCancel={this.onModalCancel}
                destroyOnClose
            >
                <Search
                    config={config}
                    isModal
                    footer
                    onSearch={this.onModalComfirm}
                    onCancel={this.onModalCancel}
                />
            </Modal>
        )
    }
}

export default ChangeModal