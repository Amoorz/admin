import React, { Component } from 'react'
import { Card, Tabs, Row, Col, List, Icon } from 'antd'

const { TabPane } = Tabs
const { Meta } = Card

class Mission extends Component {
    buildCard = () => {
        let project = [{
            url: 'https://www.tslang.cn/assets/images/examples/react.png',
            title: 'React',
            description: ''
        }, {
            url: 'https://www.tslang.cn/assets/images/examples/node.png',
            title: 'Node',
            description: ''
        }, {
            url: 'https://www.tslang.cn/assets/images/examples/angular.png',
            title: 'Angular',
            description: ''
        }, {
            url: 'https://www.tslang.cn/assets/images/examples/vue.png',
            title: 'Vue',
            description: ''
        }, {
            url: 'https://www.tslang.cn/assets/images/examples/wechat.png',
            title: 'Wechat',
            description: ''
        }, {
            url: 'https://www.tslang.cn/assets/images/examples/react-native.png',
            title: 'React Native',
            description: ''
        }]
        const col = {
            lg: 12,
            xl: 6
        }
        return (
            <Row gutter={22}>
                {project.map((v, i) => {
                    const { url, title, description } = v
                    return (
                        <Col {...col}>
                            <Card
                                hoverable
                                style={{ marginBottom: '20px', width: '100%' }}
                                cover={<img alt="example" src={url} />}
                            >
                                <Meta
                                    title={title}
                                    description={description}
                                />
                            </Card>
                        </Col>
                    )
                })}
            </Row>
        )
    }
    buildList = () => {
        const listData = [];
        for (let i = 0; i < 23; i++) {
        listData.push({
            href: 'http://ant.design',
            title: `Hello ${i}`,
            avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            description: '您有一天新动态：今天的风儿好喧嚣啊！',
            content: '我唔可以俾到你幸福，但绝对可以俾到你舒服。其实不喜欢可以有一百个原因，而那些原因是我不能改变的，故我只能就自己的缺点而改进，然后做些成绩出来，让他们明白我也曾努力过，如果成功的话，也是我应得的',
        });
        }

        const IconText = ({ type, text }) => (
        <span>
            <Icon type={type} style={{ marginRight: 8 }} />
            {text}
        </span>
        );
        return (
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                onChange: (page) => {
                    console.log(page);
                },
                pageSize: 3,
                }}
                dataSource={listData}
                footer={<div>This is footer</div>}
                renderItem={item => (
                <List.Item
                    key={item.title}
                    actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
                    extra={<img width={272} alt="logo" src="http://5b0988e595225.cdn.sohucs.com/images/20181109/5cc9e8e6db264485bd6370f981b92c27.jpeg" />}
                >
                    <List.Item.Meta
                        // avatar={<Avatar src={item.avatar} />}
                        title={<a href={item.href}>{item.title}</a>}
                        description={item.description}
                    />
                    {item.content}
                </List.Item>
                )}
            />
        )
    }
    render () {
        return (
            <div className="mission">
                <Card bordered={false}>
                    <Tabs defaultActiveKey="1" animated={false}>
                        <TabPane tab="项目" key="1">
                            {this.buildCard()}
                        </TabPane>
                        <TabPane tab="动态" key="2">
                            {this.buildList()}
                        </TabPane>
                        <TabPane tab="消息" key="3">暂无最新消息</TabPane>
                    </Tabs>
                </Card>
            </div>
        )
    }
}

export default Mission