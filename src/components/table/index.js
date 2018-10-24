import React, { Component } from 'react'

class Table extends Component {
    constructor (props) {
        super(props)
        this.state = {
            arr: [1]
        }
    }
    componentWillMount () {
        console.log('table componentWillMount--> 1')
    }
    componentDidMount () {
        console.log('table componentDidMount--> 3')
    }
    componentWillReceiveProps (nextProps) {
        console.log('table componentWillReceiveProps---> 4', nextProps)
    }
    shouldComponentUpdate(nextProps, nextState) {
        console.log('table shouldComponentUpdate---> 5', nextProps, nextState)
        return true
    }
    componentWillUpdate (nextProps, nextState) {
        console.log('table componentWillUpdate---> 6', nextProps, nextState)
    }
    componentDidUpdate (prevProps, prevState) {
        console.log('table componentDidUpdate---> 7', prevProps, prevState)
    }
    componentWillUnmount () {
        console.log('table componentWillUnmount---> 8')
    }
    handleClick = () => {
        this.setState({
            arr: [1, 1, 3]
        })
    }
    render () {
        const { data } = this.props
        const { arr } = this.state
        console.log('table render--->')
        return (
            <div>
                <p>Table......</p>
                <button onClick={this.handleClick}>修改state</button>
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

export default Table