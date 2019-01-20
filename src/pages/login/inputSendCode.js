import React, { Component } from 'react'
import { Icon, Input } from 'antd'
// import { regExp } from 'utils/utils'
// import { sendCode } from 'services/login-service'

class InputSendCode extends Component {
    constructor (){
        super()
        this.state = {
            tel: '',
            countdown: 0
        }
        this.getCode = this.getCode.bind(this)
        this.inputChange = this.inputChange.bind(this)
    }
    inputChange (e) {
        // 改变值
        const val = e.target.value
        this.setState({tel: val})
        this.props.changeState({[this.props.changeKey || 'tel']: val})
    }
    changeCountdown (num) {
        if (num >= 0) {
            window.setTimeout(() => {
                this.setState({countdown:num}, () => {
                    if (num > 0) {
                        this.changeCountdown(num - 1)
                    }
                })
            },1000)
        }
    }
    getCode () {
        // const { tel, countdown } = this.state
        // const time = 120
        // if (countdown === 0) {
        //     if (!regExp.tel.test(tel)) {
        //         message.warning('请输入正确的手机号码！')
        //         return false
        //     }
        //     this.setState({countdown: time}, () => {
        //         let params = {
        //             mobile: tel,
        //             moduleName: 'login'
        //         }
        //         sendCode(params).then(res => {
        //             const { success, data } = JSON.parse(res)
        //             if (success) {
        //                 message.success(data)
        //             } else {
        //                 message.success(data)
        //             }
        //         })
        //         this.changeCountdown(time - 1)
        //     })
        // }
    }
    render () {
        const { countdown } = this.state
        const { addonBefore } = this.props
        return (
            <Input
                addonBefore={addonBefore ? <Icon type={addonBefore} /> : null}
                addonAfter={
                    <span className="cup" style={{'width':'70px', 'display':'inline-block'}} onClick={this.getCode}>
                        { countdown > 0 ? countdown.toString() : '获取验证码' }
                    </span>
                }
                maxLength={11}
                placeholder="请输入手机号码"
                onChange={this.inputChange}
            />
        )
    }
}
export default InputSendCode