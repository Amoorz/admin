import React, { Component } from 'react'
import Todo from 'components/todo'

class Settings extends Component {
    constructor (props) {
        super(props)
        this.state = {
            data: null
        }
    }
    // componentWillMount () {
    //     console.log('%c Settings componentWillMount--> 1', 'color: #1890ff')
    // }
    componentDidMount () {
        // console.log('%c Settings componentDidMount--> 3', 'color: #1890ff')
        this.setState({
            data: [0,1,2]
        })
    }
    // componentWillReceiveProps (nextProps) {
    //     console.log('%c Settings componentWillReceiveProps---> 4', 'color: #1890ff')
    // }
    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log('%c Settings shouldComponentUpdate---> 5', 'color: #1890ff', nextProps)
    //     return true
    // }
    // componentWillUpdate (prevProps, prevState) {
    //     console.log('%c Settings componentWillUpdate---> 6', 'color: #1890ff', prevProps)
    // }
    // componentDidUpdate (prevProps, prevState) {
    //     console.log('%c Settings componentDidUpdate---> 7', 'color: #1890ff', prevProps)
    // }
    // componentWillUnmount () {
    //     console.log('%c Settings componentWillUnmount---> 8', 'color: #1890ff')
    // }
    render () {
        // console.log('%c Settings render--->', 'color: #1890ff')
        const { data } = this.state
        return (
            <div>
                <p>系统设置</p>
                <Todo data={data} />
            </div>
        )
    }
}

export default Settings