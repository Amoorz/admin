import React, { Component } from 'react'
import { Route,
    // Redirect,
    Switch, withRouter } from 'react-router-dom'
import { constantMap, layoutTree } from './routesConfig'

class RootRoute extends Component {
    buildLayoutRoutes (Dom, fatherPath) {
        // console.log('layoutTree------>', layoutTree)
        return (
            <Dom>
                {layoutTree.map((v) => {
                    const { path, component } = v
                    return (<Route path={`${fatherPath}${path}`} render={() => this.isRedirect(component)} key={path} />)
                })}
            </Dom>
        )
    }
    // 权限验证
    isRedirect (Dom) {
        // console.log(localStorage.getItem('token'))
        // if (!localStorage.getItem('token')) {
        //     return (<Redirect to="/" />)
        // } else {
        //     return (<Dom />)
        // }
        return (<Dom />)
    }
    buildConstantRoutes () {
        let html = []
        for (let i = 0; i < constantMap.length; i++) {
            const { path, component, exact, isLayout } = constantMap[i]
            if (isLayout) {
                html.push(
                    <Route path={path} render={() => this.buildLayoutRoutes(component, path)} key={path} exact={exact} />
                )
            } else {
                html.push(
                    <Route path={path} component={component} key={path} exact={exact} />
                )
            }
        }
        return html
    }
    render () {
        return (
            <Switch>
                {this.buildConstantRoutes()}
                {/* <Route path="/library" render={() => this.buildLayoutRoutes()} /> */}
                {/* <Route path="/library" render={function () {
                    return (
                        <Switch>
                            <Route path="/library" component={planOrProject} exact />
                            <Route path="/library/projectCompany" component={projectCompany} />
                            <Route path="*" component={login404} />
                        </Switch>
                    )}}
                />
                <Route path="/" component={login} exact />
                <Route path="*" component={login404} /> */}
            </Switch>
        )
    }
}

export default withRouter(RootRoute)