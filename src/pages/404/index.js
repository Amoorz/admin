import React, { Component } from 'react'
// import {Link} from 'react-router-dom'
import img from '../../images/404.png';
import './index.less'

class Login404 extends Component {
    state = {
        animated: ''
    };
    enter = () => {
        // this.setState({animated: 'hinge'})
        // this.props.history.go(-1)
    };
    render() {
        return (
            <div className="center" style={{height: '100%', background: '#ececec', overflow: 'hidden'}}>
                <img src={img} alt="404" className={`animated swing ${this.state.animated}`} onMouseEnter={this.enter} />
            </div>
        )
    }
}
export default Login404