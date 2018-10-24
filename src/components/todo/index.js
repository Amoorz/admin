import React, { Component } from 'react'

class Todo extends Component {
    constructor (props) {
        super(props)
        this.state = {
            arr: [1]
        }
    }
    static getDerivedStateFromProps (nextProps, prevState) {
        console.log('todo getDerivedStateFromProps--->', nextProps, prevState)
        if (nextProps.data) {
            return {
                arr: [0, 0, 0, 0]
            }
        }
        return null
    }
    // componentWillMount () {
    //     console.log('todo componentWillMount--> 1')
    // }
    componentDidMount () {
        // setTimeout(() => {
        //     this.setState({
        //         arr: [1, 1, 3]
        //     })
        // }, 2000)
        console.log('todo componentDidMount--> 3')
    }
    // componentWillReceiveProps (nextProps) {
    //     console.log('todo componentWillReceiveProps---> 4')
    // }
    shouldComponentUpdate(nextProps, nextState) {
        console.log('todo shouldComponentUpdate---> 5', nextProps, nextState)
        return true
    }
    // componentWillUpdate (nextProps, nextState) {
    //     console.log('todo componentWillUpdate---> 6', nextProps, nextState)
    // }
    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('todo getSnapshotBeforeUpdate--->', prevProps, prevState)
        return '你好'
    }
    componentDidUpdate (prevProps, prevState, snapshot) {
        console.log('todo componentDidUpdate---> 7', prevProps, prevState, snapshot)
    }
    // componentWillUnmount () {
    //     console.log('todo componentWillUnmount---> 8')
    // }
    render () {
        const { data } = this.props
        const { arr } = this.state
        console.log('todo render--->')
        return (
            <div>
                <p>Todo......</p>
                <p>
                    {arr ? arr.map((v, i) => (<span key={i}>{v}</span>)) : null}
                </p>
                <p>
                    {data ? data.map((v, i) => (<span key={i}>{v}</span>)) : null}
                </p>
            </div>
        )
    }
}

export default Todo