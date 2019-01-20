import React, { Component } from 'react'
import { Avatar, Card, Row, Col, List } from 'antd'
import "./index.less"

const { Grid } = Card 

const data = [
    {
      title: '回家吃饭',
    },
    {
      title: '回家洗衣服',
    },
    {
      title: '回家浇花',
    },
    {
      title: '回家交电费',
    },
]

let gridStyle = {
    width: '33.33%',
    textAlign: 'center'
}

class Workplace extends Component {
    // constructor (props) {
    //     super(props)
    // }
    render () {
        let colL = {
            xs: 24,
            lg: 14
        }
        let colR = {
            xs: 24,
            lg: 10
        }
        if (window.innerWidth <= 768) {
            gridStyle = {
                width: '100%',
                textAlign: 'left'
            }
        }
        return (
            <div className="workplace">
                <Row gutter={16}>
                    <Col {...colL}>
                        <Card
                            title="当前服务"
                        >
                            <Grid style={gridStyle}>
                                <Card bordered={false}>
                                    <Card.Meta                                        
                                        // avatar={<Avatar icon={'smile'} />}
                                        title="订单"
                                        description="心情就像衣服，脏了就拿去洗洗，晒晒，阳光自然就会蔓延开来。"
                                    />
                                </Card>
                            </Grid>
                            <Grid style={gridStyle}>
                                <Card bordered={false}>
                                    <Card.Meta                                        
                                        // avatar={<Avatar icon={'smile'} />}
                                        title="审核"
                                        description="心情就像衣服，脏了就拿去洗洗，晒晒，阳光自然就会蔓延开来。"
                                    />
                                </Card>
                            </Grid>
                            <Grid style={gridStyle}>
                                <Card bordered={false}>
                                    <Card.Meta                                        
                                        // avatar={<Avatar icon={'smile'} />}
                                        title="海外"
                                        description="眼看前面，活在当下。生活从未变得容易，只不过是我们变得比。"
                                    />
                                </Card>
                            </Grid>
                            <Grid style={gridStyle}>
                                <Card bordered={false}>
                                    <Card.Meta                                        
                                        // avatar={<Avatar icon={'smile'} />}
                                        title="助理"
                                        description="眼看前面，活在当下。生活从未变得容易，只不过是我们变得更。"
                                    />
                                </Card>
                            </Grid>
                            <Grid style={gridStyle}>
                                <Card bordered={false}>
                                    <Card.Meta                                        
                                        // avatar={<Avatar icon={'smile'} />}
                                        title="购物车"
                                        description="自身有价值了，才会像吸铁石，朋友甚至以前的陌生人都愿意去。"
                                    />
                                </Card>
                            </Grid>
                            <Grid style={gridStyle}>
                                <Card bordered={false}>
                                    <Card.Meta                                        
                                        // avatar={<Avatar icon={'smile'} />}
                                        title="订单"
                                        description="自身有价值了，才会像吸铁石，朋友甚至以前的陌生人都愿意转。"
                                    />
                                </Card>
                            </Grid>
                        </Card>
                        <List
                            header={<div>消息</div>}
                            bordered
                            itemLayout="vertical"
                            dataSource={data}
                            renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                avatar={<Avatar style={{ backgroundColor: '#87d068' }} icon="linkedin" />}
                                title={<a href="https://ant.design">{item.title}</a>}
                                description="富强，民主，文明，和谐，自由，平等，公正，法治，爱国，敬业，诚信，友善。"
                                />
                            </List.Item>
                            )}
                        />
                    </Col>
                    <Col {...colR}>
                        <Card
                            size="small"
                            title="维度"
                        >
                            <Grid>引用：40%</Grid>
                            <Grid>口碑：11%</Grid>
                            <Grid>指标：22%</Grid>
                            <Grid>质量：51%</Grid>
                            <Grid>生产：19%</Grid>
                            <Grid>热度：39%</Grid>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Workplace