import React, { Component } from 'react'
import { Input, InputNumber, Modal, Form } from 'antd'
const FormItem = Form.Item

class EditLabelModal extends Component {
    constructor (props) {
        super(props)
        this.state = {
            editModalVisible: true,
            confirmLoading: false
        }
    }
    componentDidMount (){
        this.setState({
            id:this.props._data.id,
            name:this.props._data.name,
            orderNumber:this.props._data.orderNumber,
            description:this.props._data.description
        })
    }
    handleCancel = () => {
        this.setState({
            editModalVisible: false
        })
    }
    onModalOk = (e) => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.handleCancel()
                if(this.props.editType === 'add'){
                    this.props.modalAddSave(values)
                }else{
                    this.props.modalEditSave(values)
                }
            }
        })
    }
    afterClose = ()=>{
        this.props.stateChange({editModalVisible: false})
    }
    getFormItem = () =>{
        const { getFieldDecorator } = this.props.form
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 7 }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 15 }
            }
        }
        let formItems = []
        for (const key in this.props._data) {
            const item = this.props._data[key]
            if(item.noVisible){
                formItems.push((
                    <FormItem key={key} style={{display: 'none'}}>
                        {getFieldDecorator(key, {
                            initialValue: item.defaultValue
                        })(
                            <Input />
                        )}
                    </FormItem>))
                break
            }
            let FormItemDom
            switch (item.element) {
            case 'number':
                FormItemDom = <InputNumber placeholder={item.placeholder || '请输入'} />
                break
            case 'textarea':
                FormItemDom = <Input.TextArea rows={3} placeholder={item.placeholder || '请输入'} />
                break
            default:
                FormItemDom = <Input placeholder={item.placeholder || '请输入'} />
                break
            }
            formItemLayout.key = key
            formItems.push((
                <FormItem
                    {...formItemLayout}
                    label={item.label}
                >
                    {getFieldDecorator(key, {
                        initialValue: item.defaultValue || '',
                        rules: [{ required: item.rules && item.rules.required, message: `请输入${item.placeholder}` }]
                    })(
                        FormItemDom
                    )}
                </FormItem>
            ))
        }
        return formItems
    }
    render () {
        const _state = this.state
        const {confirmLoading} = _state
        return (
            <Modal
                visible={_state.editModalVisible}
                title={_state.editType === "add" ? '新增标签' : '编辑标签'}
                onOk={this.onModalOk}
                onCancel={this.handleCancel}
                confirmLoading={confirmLoading}
                cancelText="关闭"
                okText="保存"
                afterClose={this.afterClose}
            >
                <Form>
                    {this.getFormItem()}
                </Form>
            </Modal>
        )
    }
}

EditLabelModal = Form.create()(EditLabelModal)
export default EditLabelModal