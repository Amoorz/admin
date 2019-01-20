import React, { Component } from 'react'
import { Card } from 'antd'
import './index.less'

class Lifecycle extends Component {
    render () {
        return (
            <div className="lifecycle">
                <Card
                    title="装配"
                >
                    <p>触发：组件第一次建立 </p>
                    <p>constructor()</p>
                    <p>static getDerivedStateFromProps()</p>
                    <p>componentWillMount() / UNSAFE_componentWillMount()</p>
                    <p>render()</p>
                    <p>componentDidMount()</p>
                </Card>
                <Card
                    title="更新"
                >
                    <p>属性或状态的改变会触发一次更新。当一个组件在被重渲时，这些方法将会被调用：</p>
                    <p>componentWillReceiveProps() / UNSAFE_componentWillReceiveProps()</p>
                    <p>static getDerivedStateFromProps()</p>
                    <p>shouldComponentUpdate()</p>
                    <p>componentWillUpdate() / UNSAFE_componentWillUpdate()</p>
                    <p>render()</p>
                    <p>getSnapshotBeforeUpdate()</p>
                    <p>componentDidUpdate()</p>
                </Card>
                <Card
                    title="卸载"
                >
                    <p>当一个组件被从DOM中移除时，该方法被调用：</p>
                    <p>componentWillUnmount()</p>
                </Card>
            </div>
        )
    }
}

export default Lifecycle