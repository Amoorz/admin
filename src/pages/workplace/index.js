import React, { Component } from 'react'
import { Avatar, Card, Row, Col, List, Progress } from 'antd'
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/radar'
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'

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
    width: '33.33%'
}

class Workplace extends Component {
    constructor (props) {
        super(props)
        this.state = {
            isMobile: window.innerWidth <= 768 ? true : false
        }
    }
    componentDidMount() {
        // 基于准备好的dom，初始化echarts实例
        var columnar = echarts.init(document.getElementById('main'))
        // 绘制图表
        columnar.setOption({
            color: ['#1890ff'],
            title: { text: '服务指标' },
            tooltip: {},
            xAxis: {
                data: ["产量", "热度", "订单量", "流量"]
            },
            yAxis: {},
            series: [{
                name: '指标',
                type: 'bar',
                data: [5, 20, 36, 10]
            }]
        })
        columnar.resize()

        var radar = echarts.init(document.getElementById('radar'))
        radar.setOption({
            color: ["#1890ff", "#2fc25b"],
            title: {
                text: '占比'
            },
            tooltip: {},
            legend: {
                data: ['预算分配', '实际开销']
            },
            radar: {
                // shape: 'circle',
                name: {
                    textStyle: {
                        color: '#fff',
                        backgroundColor: '#999',
                        borderRadius: 3,
                        padding: [3, 5]
                   }
                },
                indicator: [
                   { name: '销售', max: 6500},
                   { name: '管理', max: 16000},
                   { name: '信息技术', max: 30000},
                   { name: '客服', max: 38000},
                   { name: '研发', max: 52000},
                   { name: '市场', max: 25000}
                ]
            },
            series: [{
                name: '预算 vs 开销（Budget vs spending）',
                type: 'radar',
                // areaStyle: {normal: {}},
                data : [
                    {
                        value : [4300, 10000, 28000, 35000, 50000, 19000],
                        name : '预算分配'
                    },
                     {
                        value : [5000, 14000, 28000, 31000, 42000, 21000],
                        name : '实际开销'
                    }
                ]
            }]
        })
    }
    render () {
        let colL = {
            xs: 24,
            lg: 14
        }
        let colR = {
            xs: 24,
            lg: 10
        }
        const { isMobile } = this.state
        if (isMobile) {
            gridStyle = {
                width: '100%'
            }
        }
        return (
            <div className="workplace" id="workplace">
                    {isMobile ? 
                        <div className="progressBox mb20">
                            <div>运行天数</div>
                            <Progress className="" percent={75} width={80} format={percent => `${percent} 天`} />
                            <div>项目进度</div>
                            <Progress percent={67} width={80} />
                            <div>奖励</div>
                            <Progress percent={100} width={80} format={percent => `Done`} />
                        </div>
                    : <div className="progressBox mb20 beFlex">
                        <div className="progressBox_item">
                            <p>运行天数</p>
                            <Progress className="" type="circle" percent={75} width={80} format={percent => `${percent} 天`} />
                        </div>
                        <div className="progressBox_item">
                            <p>项目进度</p>
                            <Progress className="" type="circle" percent={67} width={80} />
                        </div>
                        <div className="">
                            <p>奖励</p>
                            <Progress className="" type="circle" percent={100} width={80} format={percent => `Done`} />
                        </div>
                    </div>
                    }
                <Row className="pt20" gutter={20}>
                    <Col {...colL}>
                        <Card
                            title="当前服务"
                            bordered={false}
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
                            className="listBox"
                            header={<div>消息</div>}
                            bordered
                            itemLayout="vertical"
                            dataSource={data}
                            renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                avatar={<Avatar style={{ backgroundColor: '#8057ba' }} icon="linkedin" />}
                                title={<a href="https://ant.design">{item.title}</a>}
                                description="富强，民主，文明，和谐，自由，平等，公正，法治，爱国，敬业，诚信，友善。"
                                />
                            </List.Item>
                            )}
                        />
                    </Col>
                    <Col {...colR} className="indicator">
                        <div>
                            <div id="main" style={{ width: '80%', height: 400 }}></div>
                        </div>
                    </Col>
                    <Col {...colR} className="contrast mt20">
                        <div>
                            <div id="radar" style={{ width: '80%', height: 400 }}></div>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Workplace