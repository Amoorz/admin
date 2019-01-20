import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Layout, Icon, Breadcrumb, Avatar, Menu, Dropdown, Drawer, Input } from 'antd'
import SiderMenu from './menu'
import { layoutTree } from 'routers/routesConfig'
// import { connect } from 'react-redux'
// import { saveCurrentMenu } from 'actions/siderMenu'
import './index.less'

// const { Item, SubMenu } = Menu

const { Header, Content, Footer } = Layout
const { Search } = Input


// const mapStateToProps = (state) => {
//     // console.log(state)
//     return {
//         list: state.saveCurrentMenu.list
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         saveCurrentMenu: (data) => dispatch(saveCurrentMenu(data))
//     }
// }

class LayoutComponent extends Component {
    constructor (props) {
        super(props)
        this.state = {
            collapsed: false,
            isMobile: window.innerWidth <= 768 ? true : false,
            currentPath: '',
            visible: true
        }
    }
    componentDidMount () {
        // console.log('layout Did-->', window.innerWidth)
        if (window.innerWidth <= 768) {
            this.setState({
                isMobile: true
            })
        } else {
            this.setState({
                isMobile: false
            })
        }
        this.getCurrentPath(this.props.location.pathname)
    }
    componentWillReceiveProps (nextProps) {
        // console.log('layout nextProps', nextProps.location.pathname)
        this.getCurrentPath(nextProps.location.pathname)
    }
    onStateChange = (obj, fn) => {
        this.setState(obj, fn)
    }
    // 面包屑初始化
    getCurrentPath (pathname) {
        let name = pathname.split('/'),
        bread
        name.splice(1, 1)
        name = name.join('/')
        for (let i = 0; i < layoutTree.length; i++) {
            if (name === layoutTree[i].path) {
                bread = layoutTree[i].name
            }
        }
        // console.log('getCurrentPath--->', bread)
        this.setState({
            currentPath: bread
        })
    }
    // 点击按钮收起侧边栏
    toggle = () => {
        const {
            collapsed,
            // visible,
            // isMobile
        } = this.state
        // if (isMobile) {
        //     this.setState({
        //         visible: !visible
        //       })
        // } else {
        // }
        this.setState({
            collapsed: !collapsed
        })
    }
    // 触发响应式布局断点时的回调
    onBreakpoint = (broken) => {
        // console.log('broken--->', broken)
        this.setState({
            collapsed: broken
        })
    }
    // 展开 - 收起时的回调函数，有点击 trigger 以及响应式反馈两种方式可以触发
    onCollapse = (collapsed, type) => {
        // console.log(collapsed, type)
        this.setState({
            collapsed
        })
    }
    userMenu = () => {
        return (
            <Menu>
                <Menu.Item><Link to="/">退出登录</Link></Menu.Item>
            </Menu>
        )
    }
    onClose = () => {
        this.setState({
            collapsed: false
        })
    }
    render () {
        const { collapsed, isMobile, currentPath,
            // visible
        } = this.state
        return (
            <Layout className="layoutComponent">
                {/* {!isMobile ?
                    <Sider
                        // breakpoint="lg"
                        trigger={null}
                        collapsible
                        // onBreakpoint={(broken) => { this.onBreakpoint(broken) }}
                        collapsed={collapsed}
                    >
                        <div className="logo" />
                        <SiderMenu shortTime={[]} />
                    </Sider> :
                    <Drawer
                        title=""
                        width={200}
                        placement={'left'}
                        closable={false}
                        onClose={this.onClose}
                        visible={collapsed}
                    >
                        <Sider>
                            <SiderMenu shortTime={[]} />
                        </Sider>
                    </Drawer>
                } */}
                {!isMobile ?
                    <SiderMenu
                        breakpoint="xl"
                        trigger={null}
                        collapsible
                        collapsed={collapsed}
                        onBreakpoint={this.onBreakpoint}
                    /> :
                    <Drawer
                        title=""
                        width={200}
                        placement={'left'}
                        closable={false}
                        onClose={this.onClose}
                        visible={collapsed}
                    >
                        <SiderMenu onChange={this.onStateChange} />
                    </Drawer>
                }
                <Layout>
                    <Header className="layoutComponent__header">
                        <Icon
                            className="trigger"
                            type={collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                        <Search
                            style={{'width': '240px'}}
                            // placeholder="input search text"
                            onSearch={value => console.log(value)}
                            enterButton
                        />
                        <span className="col-user">
                            <Dropdown overlay={this.userMenu()}>
                                <Avatar icon="user" />
                            </Dropdown>
                        </span>
                    </Header>
                    <Breadcrumb className="layoutComponent__bread">
                        {currentPath ? currentPath.split('-').map(v => <Breadcrumb.Item key={v}>{v}</Breadcrumb.Item>) : null}
                    </Breadcrumb>
                    <Content className="layoutComponent__content">
                        {this.props.children}
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        react ......  ©2018 ......｜京ICP备 ...... 号
                    </Footer>
                </Layout>
            </Layout>
        )
    }
}

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LayoutComponent))
export default withRouter(LayoutComponent)