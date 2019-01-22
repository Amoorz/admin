import React, { Component } from 'react'
import { Row, Col } from 'antd'
import Info from './info'
import Mission from './mission'
import "./index.less"

class Center extends Component {
    render () {
        const colL = {
            lg: 24,
            xl: 8
        }
        const colR = {
            lg: 24,
            xl: 16
        }
        return (
            <div className="myCenter" id="center">
                <Row>
                    <Col {...colL}>
                        <Info />
                    </Col>
                    <Col {...colR}>
                        <Mission />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Center