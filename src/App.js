import React, { Component } from 'react'
import {
    HashRouter as Router,
    // BrowserRouter as Router,
    Route,
    Switch,
    Link
} from 'react-router-dom'
import Settings from 'pages/settings'
import User from 'pages/user'
import Workplace from 'pages/workplace'
import './style/normalize.css'
import './style/common.scss'

class App extends Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <div>
                        <Link className="mr10" to="/" replace>设置</Link>
                        <Link className="mr10" to="/user" replace>用户中心</Link>
                        <Link to="/workplace" replace>控制台</Link>
                        <Switch>
                            <Route path="/" exact component={Settings} />
                            <Route path="/user" component={User} />
                            <Route path="/workplace" component={Workplace} />
                        </Switch>
                    </div>
                </Router>
            </div>
        )
    }
}

export default App
