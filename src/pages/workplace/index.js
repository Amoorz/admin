import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setUserList } from 'actions/user'

const mapStateToProps = (state) => {
    // console.log(state)
    return {
        list: state.setList.list
    }
}

const mapDispatchToProps = (dispatch) => {
    // console.log(dispatch)
    return {
        setUserList: (data) => dispatch(setUserList(data))
    }
}

@connect(mapStateToProps, mapDispatchToProps)
class Workplace extends Component {
    handleClick = () => {
        this.props.setUserList(['hello'])
        // this.props.dispatch(setUserList([0]))
        // console.log(this.props.dispatch)
    }
    render () {
        return (
            <div>
                <p>控制台</p>
                <button onClick={this.handleClick}>dispatch</button>
                <p>{this.props.list}</p>
            </div>
        )
    }
}

export default Workplace