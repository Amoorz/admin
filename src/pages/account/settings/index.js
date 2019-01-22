import React, { Component } from 'react'
import { Menu, Layout, Form, Input, Button, DatePicker } from 'antd'
import './index.less'

const {
    Sider, Content, Header
} = Layout
const { Item } = Menu
const FormItem = Form.Item

class Settings extends Component {
    constructor (props) {
        super(props)
        this.state = {
            isMobile: window.innerWidth < 768 ? true : false 
        }
    }
    render () {
        const { isMobile } = this.state
        const mode = isMobile ? 'horizontal' : 'inline'
        const menuStyle = isMobile ? {} : { width: '200px', height: '100%' }
        const formStyle = isMobile ? { width: '100%' } : { width: '400px' }
        return (
            <div className="settings">
                <Layout>
                    {isMobile ?
                        <Header>
                            <Menu
                                theme="light"
                                mode={mode}
                                defaultSelectedKeys={['1']}
                                style={menuStyle}
                            >
                                <Item key={1}>我的信息</Item>
                                <Item key={2}>账号安全</Item>
                                <Item key={3}>隐私设置</Item>
                            </Menu>
                        </Header>
                    : <Sider>
                        <Menu
                            theme="light"
                            mode={mode}
                            defaultSelectedKeys={['1']}
                            style={menuStyle}
                        >
                            <Item key={1}>我的信息</Item>
                            <Item key={2}>账号安全</Item>
                            <Item key={3}>隐私设置</Item>
                        </Menu>
                    </Sider>
                    }
                    <Content
                        style={{
                            padding: 24,
                            margin: 0
                        }}
                    >
                        <Form style={formStyle}>
                            <FormItem
                                label="昵称"
                            >
                                <Input placeholder="请输入昵称" />
                            </FormItem>
                            <FormItem
                                label="生日"
                            >
                                <DatePicker placeholder="选择生日日期" />
                            </FormItem>
                            <FormItem
                                label="邮箱"
                            >
                                <Input placeholder="请输入邮箱" />
                            </FormItem>
                            <FormItem
                                label="手机"
                            >
                                <Input placeholder="请输入手机" />
                            </FormItem>
                            <FormItem
                                label="地址"
                            >
                                <Input placeholder="请输入地址" />
                            </FormItem>
                            <FormItem>
                                <Button type="primary">更新信息</Button>
                            </FormItem>
                        </Form>
                    </Content>
                </Layout>
            </div>
        )
    }
}

export default Settings