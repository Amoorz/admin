import React, { Component } from 'react'
import Rootroute from 'routers/routes'
import './style/normalize.css'
import './style/common.scss'

class App extends Component {
    render() {
        return (
            <div className="App">
                <Rootroute />
            </div>
        )
    }
}

export default App
