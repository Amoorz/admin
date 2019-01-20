import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import { Icon, Tabs, Input, Button, Form, message } from 'antd'
import { platformAuth } from 'services/login-service.js'
import { layoutTree } from 'routers/routesConfig'
import InputSendCode from './inputSendCode'
import { regExp } from 'utils/utils'

const TabPane = Tabs.TabPane
const FormItem = Form.Item

class LoginFrom extends Component {
    constructor (props) {
        super(props)
        this.state = {
            loginType: 'pass',
            buttonLoading: false,
            userName:'',
            password: '',
            tel: '',
            code: '',
            formValues: {}
        }
        this.tabsChange = this.tabsChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.loginClick = this.loginClick.bind(this)
        this.loginSuccess = this.loginSuccess.bind(this)
        this.loginError = this.loginError.bind(this)
        this.changeFormState = this.changeFormState.bind(this)
    }
    componentDidMount () {
        localStorage.removeItem('token')
        localStorage.removeItem('one')
    }
    tabsChange (key) {
        // tabs 标签change
        this.setState({
            loginType: key
        })
    }
    loginClick () {
        // 登录按钮
        // this.setState({
        //buttonLoading: !this.state.buttonLoading
        // })
    }
    changeState (obj,fn) {
        // 状态改变
        this.setState(obj, () => {fn && fn()})
    }
    changeFormState (obj){
        // 修改手机号
        this.props.form.setFieldsValue(obj)
    }
    handleSubmit (e){
        e.preventDefault()
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.setState({
                    buttonLoading: true,
                    formValues: values
                }, () => {
                    if(this.state.loginType === 'pass'){
                        this.passLogin(values)
                    }else{
                        this.codeLogin(values)
                    }
                })
            }
        })
    }
    // 用户名登录
    passLogin (obj){
        const params = {
            'username': obj.userName,
            'password': obj.password
        }
        platformAuth(params).then(this.loginSuccess).catch(this.loginError)
    }
    // 验证码登录
    codeLogin (obj) {
        // console.log(obj)
        // const params = {
        //     'LoginId': obj.tel,
        //     'Password': '',
        // }
        // platformAuth({requestData: params}).then(this.loginSuccess).catch(this.loginError)
    }
    loginSuccess (data) {
        console.log('loginSuccess--->', data)
        if (data.code) {
            message.success('登录成功！')
            localStorage.setItem('token', JSON.stringify(data.code.token))
            this.props.history.push(`/library${layoutTree[0].path}`)
        } else {
            message.error('账号或密码不正确！')
        }
        this.setState({
            buttonLoading: false
        })
        
        // let params = {
        //     PlatformType: 1
        // }
        // getUserInfo({param: params}).then((res) => {
        //     let data = JSON.parse(res),
        //         SecurityRoleList,
        //         permisList = '',
        //         allInOne
        //     if (data) {
        //         SecurityRoleList = data.SecurityRoleList
        //         for (let i = 0; i < SecurityRoleList.length; i++) {
        //             permisList = permisList + SecurityRoleList[i].Permis
        //         }
        //         allInOne = permisList.split(',')
        //         allInOne = allInOne.filter(v => v !== '')
        //         localStorage.setItem('one', JSON.stringify(allInOne))
        //         message.success('登录成功')
        //         this.props.history.push(`/library${layoutTree[0].path}`)
        //     }
        // }).catch((err) => {
        //     this.setState({
        //         buttonLoading: false
        //     })
        // })
    }
    loginError (data){
        // console.log('loginError--->', data)
        this.setState({
            buttonLoading: false
        })
    }
    render () {
        const { loginType, buttonLoading } = this.state
        const { getFieldDecorator } = this.props.form
        return (
            <Tabs defaultActiveKey={loginType} onChange={this.tabsChange}>
                <TabPane tab="密码登录" key="pass" className="passBox">
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem className="dfadf">
                            {getFieldDecorator('userName', {
                                rules: [{
                                    required: loginType === 'pass',
                                    message: '请输入用户名!'
                                }]
                            })(
                                <Input addonBefore={<Icon type="user" />} placeholder="请输入： admin" />
                            )}
                        </FormItem>
                        <FormItem className="dfadf">
                            {getFieldDecorator('password', {
                                rules: [{
                                    required: loginType === 'pass', message: '请输入密码!'
                                }]
                            })(
                                <Input type="password" className="ffff" addonBefore={<Icon type="lock" />} placeholder="请输入： 123456" />
                            )}
                        </FormItem>
                        <Button type="primary" className="width100 mt10" loading={buttonLoading} onClick={this.loginClick} htmlType="submit">登录</Button>
                        <div className="mt20 tips">用户名密码登录</div>
                    </Form>
                </TabPane>
                <TabPane tab="手机登录" key="tel" className="telBox">
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem>
                            {getFieldDecorator('tel', {
                                rules: [{
                                    required: loginType === 'tel', message: '请输入手机号码!'
                                },{
                                    pattern: regExp.tel,message: '请输入正确手机号码!'
                                }]
                            })(
                                <InputSendCode changeState={this.changeFormState} addonBefore="user" />
                            )}
                        </FormItem>
                        <FormItem>
                            {getFieldDecorator('code', {
                                rules: [{
                                    required: loginType === 'tel', message: '请输入验证码!'
                                }]
                            })(
                                <Input addonBefore={<Icon type="lock" />} placeholder="请输入验证码" />
                            )}
                        </FormItem>
                        <Button type="primary" className="width100 mt10" loading={buttonLoading} onClick={this.loginClick} htmlType="submit">登录</Button>
                        <div className="mt20 tips">手机号获取认证码登录</div>
                    </Form>
                </TabPane>
            </Tabs>
        )
    }
}

export default withRouter(Form.create()(LoginFrom))