import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Layout, Icon, Breadcrumb, Avatar, Menu, Dropdown, Drawer, Input, Row, Col } from 'antd'
import SiderMenu from './menu'
import { layoutTree } from 'routers/routesConfig'
import './index.less'

// const { Item, SubMenu } = Menu

const { Header, Content, Footer } = Layout
const { Search } = Input

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
        } = this.state
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
            <Menu className="userMenu" style={{width: '180px'}}>
                <Menu.Item>
                    <Link to="/library/account/center">
                        <Icon type="user" />
                        <span className="">个人中心</span>
                    </Link>
                </Menu.Item>
                <Menu.Item className="mb5">
                    <Link to="/library/account/settings">
                        <Icon type="tool" />
                        <span className="">个人设置</span>
                    </Link>
                </Menu.Item>
                <Menu.Item className="bt">
                    <Link to="/">
                        <Icon type="logout" />
                        <span className="">退出登录</span>
                    </Link>
                </Menu.Item>
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
                        <Row>
                            <Col span={4}>
                                <Icon
                                    className="trigger"
                                    type={collapsed ? 'menu-unfold' : 'menu-fold'}
                                    onClick={this.toggle}
                                />
                            </Col>
                            <Col span={16}>
                                <Search
                                    style={{width: '280px', marginTop: '16px'}}
                                    placeholder="快速搜索"
                                    onSearch={value => console.log(value)}
                                    enterButton
                                />
                            </Col>
                            <Col span={4}>
                                <span className="col-user">
                                    <Dropdown overlay={this.userMenu()}>
                                        <Avatar icon="user" />
                                    </Dropdown>
                                </span>
                            </Col>
                        </Row>
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