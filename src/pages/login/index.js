import React, {Component} from 'react'
import LoginFrom from './login.js'
import { connect } from 'react-redux'
import './index.less'

class Login extends Component {
    render () {
        // const { responsive } = this.props
        return (
            <div className="login-page">
                <div className={`login-content`}>
                {/* <div className={`login-content ${responsive.isMobile ? 'login-mobile' : ''}`}> */}
                    <div className="ivu-card">
                        <div className="ivu-card-head">
                            <p>
                                <i className="iconfont icon-login mr10" />
                                react 后台
                            </p>
                        </div>
                        <div className="ivu-card-body">
                            <LoginFrom />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { responsive: state.responsiveData };
};
export default connect(mapStateToProps)(Login);