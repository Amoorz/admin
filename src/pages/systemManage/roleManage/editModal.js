import React, { Component } from 'react'
import Search from 'components/searchComponent'
import { Modal } from 'antd'

const config = [{
    name: '角色所属组',
    key: 'RoleTypeId',
    type: 'input',
    placeholder: ''
}, {
    name: '角色名称',
    key: 'RoleName',
    type: 'input',
    placeholder: ''
}, {
    name: '权限值',
    key: 'Permis',
    type: 'input',
    placeholder: ''
}, {
    name: '备注',
    key: 'Remark',
    type: 'input',
    placeholder: ''
}]

class EditModal extends Component {
    constructor (props) {
        super(props)
        this.state = {
            // visible: this.props.visible
        }
    }
    onModalCancel = () => {
        this.props.onStateChange({
            editVisible: false
        })
    }
    render () {
        const {
            visible
        } = this.props
        return (
            <Modal
                title="编辑角色"
                className=""
                centered
                width={800}
                visible={visible}
                footer={null}
                onCancel={this.onModalCancel}
                destroyOnClose
            >
                <Search config={config} isModal footer onCancel={this.onModalCancel} />
            </Modal>
        )
    }
}

export default EditModal