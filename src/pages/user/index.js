import React, { Component } from 'react'
import MyTable from 'components/table'

class User extends Component {
    constructor (props) {
        super(props)
        this.state = {
            data: null
        }
    }
    // componentWillMount () {
    //     console.log('%c User componentWillMount--> 1', 'color: #1890ff')
    // }
    componentDidMount () {
        // console.log('%c User componentDidMount--> 3', 'color: #1890ff')
        this.setState({
            data: [0,1,2]
        })
    }
    // componentWillReceiveProps (nextProps) {
    //     console.log('%c User componentWillReceiveProps---> 4', 'color: #1890ff')
    // }
    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log('%c User shouldComponentUpdate---> 5', 'color: #1890ff', nextProps)
    //     return true
    // }
    // componentWillUpdate (prevProps, prevState) {
    //     console.log('%c User componentWillUpdate---> 6', 'color: #1890ff', prevProps)
    // }
    // componentDidUpdate (prevProps, prevState) {
    //     console.log('%c User componentDidUpdate---> 7', 'color: #1890ff', prevProps)
    // }
    componentWillUnmount () {
        console.log('%c User componentWillUnmount---> 8', 'color: #1890ff')
    }
    render () {
        // console.log('%c User render---> 2', 'color: #1890ff')
        const { data } = this.state
        return (
            <div>
                <p>用户中心</p>
                <MyTable data={data} />
            </div>
        )
    }
}

export default User