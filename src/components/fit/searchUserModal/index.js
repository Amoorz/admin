import React, { Component } from 'react'
import { Input, Modal } from 'antd'
import { dicModel } from '../../utils/dictionary'
import Accouts from '../../pages/accounts'

/**
 * 用户列表弹窗组件
 **/

class SearchUserModal extends Component {
    constructor (props) {
        super(props)
        this.state = {
            inputValue: '',
            isShowUserModal: false
        }
    }
    componentWillReceiveProps (nextProps) {
        this.setState({
            inputValue: nextProps.value
        })
    }
    shouldComponentUpdate (nextProps, nextState) {
        return (nextState.inputValue !== this.state.inputValue) || (nextState.isShowUserModal !== this.state.isShowUserModal)
    }
    toggleModal = () => {
        this.setState(prevState => ({
            isShowUserModal: !prevState.isShowUserModal
        }))
    }
    onRow = (record) => {
        return {
            onClick: () => {
                const { setFieldsValue } = this.props.form
                let field = this.props.field
                if (field) {
                    setFieldsValue({
                        [field]: record.accountName
                    })
                    this.setState({
                        isShowUserModal: false
                    }, () => {
                        this.props.getData()
                    })
                }
            }
        }
    }
    renderModal () {
        return (
            <Modal
                className="hideModel-okBtn"
                title="搜索用户"
                {...dicModel}
                visible={this.state.isShowUserModal}
                onCancel={this.toggleModal}
                width="80%"
            >
                <Accouts onRow={this.onRow} selectList="true" />
            </Modal>
        )
    }
    render () {
        return (
            <div>
                <Input
                    type="text"
                    placeholder={this.props.placeholder}
                    onChange={this.props.onChange}
                    onClick={this.toggleModal}
                    value={this.state.inputValue}
                />
                {this.renderModal()}
            </div>
        )
    }
}

SearchUserModal.defaultProps = {
    placeholder: '',
    onChange: h => h,
    field: undefined
}

export default SearchUserModal