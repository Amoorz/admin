import React, {Component} from 'react'
import { Menu, Icon, Layout } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { layoutMap, layoutTree, menuTree } from 'routers/routesConfig'
// import logoSrc from 'images/locals.png'
import logoSrc from './pic.js'

const { Sider } = Layout
const { Item, SubMenu } = Menu

const mapStateToProps = (state) => {
    return {
        // menuList: state.saveCurrentMenu.list
    }
}

class MenuList extends Component {
    constructor (props) {
        super(props)
        this.state = {
            itemKeys: [],
            openKeys: [],
            authList: JSON.parse(localStorage.getItem('one')) || []
        }
    }
    componentWillMount () {
        // console.log('menuTree--->', JSON.parse(localStorage.getItem('one')))
        this.getBread(this.props.location.pathname)
    }
    componentDidMount () {
        // console.log('menu Did', layoutTree)
    }
    componentWillReceiveProps (nextProps) {
        // console.log('menu props', nextProps )
        if (nextProps.collapsed) {
            this.setState({
                openKeys: []
            })
        }
    }
    // menu 初始化
    getBread = (path) => {
        let bread, menuList = path.split('/library')[1]
        for (let i = 0; i < layoutTree.length; i++) {
            if (menuList === layoutTree[i].path) {
                bread = layoutTree[i].name
            }
        }
        // console.log(bread)
        if (bread) {
            bread = bread.split('-')
        } else {
            return
        }
        let lastBread = JSON.parse(JSON.stringify(bread))
        bread.pop()
        this.setState({
            itemKeys: lastBread.splice(bread.length, 1),
            openKeys: bread
        })
    }
    // menu 初始化
    menuTree = (menuObj) => {
        let html = []
        // let authList = []
        for (var item of menuObj) {
            const { name, icon,
                // auth,
            children } = item
            if (children) {
                // if (authList.indexOf(auth) !== -1) {
                    html.push(
                        <SubMenu
                            key={name}
                            title={
                                <span>
                                    {icon ? <Icon type={icon} /> : null}
                                    <span>{name}</span>
                                </span>
                            }
                        >
                            {this.menuTree(children)}
                        </SubMenu>
                    )
                // }
            } else {
                // if (authList.indexOf(auth) !== -1) {
                    html.push(
                        <Item key={name}>
                            <Link to={`/library${this.getPath(name)}`} onClick={this.linkClick} replace>
                                {icon ? <Icon type={icon} /> : null}
                                <span>{name}</span>
                            </Link>
                        </Item>
                    )
                }
            // }
        }
        return html
    }
    getPath = (name) => {
        let link
        for (let item of layoutTree) {
            const { routeName, path } = item
            if (routeName === name) {
                link = path
            }
        }
        return link
    }
    linkClick = () => {
        // console.log(this.props)
        const { onChange } = this.props
        if (onChange) {
            onChange({
                collapsed: false
            })
        }
    }
    // 点击含子级菜单才有返回
    onOpenChange = (keys) => {
        // console.log('onOpenChange--->', keys)
        const latestOpenKey = keys[keys.length - 1]
        const findId = menuTree.find(key => key.name === latestOpenKey)
        let openKeys
        if (latestOpenKey) {
            if (findId.id) {
                openKeys = findId.id.split('-')
            } else {
                openKeys = [findId.name]
            }
        } else {
            openKeys = keys
        }
        this.setState({
            openKeys
        })
    }
    // 触发响应式布局断点时的回调
    onBreakpoint = (broken) => {
        // console.log(this.props)
        this.props.onBreakpoint(broken)
    }
    render () {
        let {
            itemKeys,
            openKeys
        } = this.state
        const { trigger, collapsible, collapsed, breakpoint } = this.props
        // console.log(isClose, collapsed)
        return (
            <Sider
                breakpoint={breakpoint}
                onBreakpoint={this.onBreakpoint}
                style={{width: '300px'}}
                trigger={trigger}
                collapsible={collapsible}
                collapsed={collapsed}
            >
                <div className="logo">
                    <img src={logoSrc} alt="logo" />
                    <span>React 后台</span>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={itemKeys}
                    openKeys={openKeys}
                    onOpenChange={this.onOpenChange}
                >
                    {this.menuTree(layoutMap)}
                </Menu>
            </Sider>
        )
    }
}

export default withRouter(connect(mapStateToProps)(MenuList))