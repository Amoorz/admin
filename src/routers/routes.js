import {
    HashRouter as Router,
    // BrowserRouter as Router,
    Route,
    Switch,
    Link
} from 'react-router-dom'
import React, { Component } from 'react'
import routeConfig from './routeConfig'
// import { Settings, User, Workplace } from './configRoute'

// import Settings from 'pages/settings/loadable'
// import User from 'pages/user/loadable'
// import Workplace from 'pages/workplace/loadable'

class Rootroute extends Component {
    buildRoutes () {
        let route = []
        for (let i = 0; i < routeConfig.length; i++) {
            const { path, component, exact } = routeConfig[i]
            route.push(<Route path={path} component={component} exact={exact} key={path} />)
        }
        return route
    }
    render () {
        return (
            <Router>
                <div className="main">
                    <Link className="mr10" to="/" replace>设置</Link>
                    <Link className="mr10" to="/user" replace>用户中心</Link>
                    <Link to="/workplace" replace>控制台</Link>
                    <Switch>
                        {this.buildRoutes()}
                        {/* <Route path="/" component={Settings} exact />
                        <Route path="/User" component={User} />
                        <Route path="/Workplace" component={Workplace} /> */}
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default Rootroute