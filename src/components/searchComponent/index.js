import React, { Component } from 'react'
import { Input, InputNumber , Select, DatePicker, Cascader, Form, Button, Col, Row, Spin } from 'antd'
import PropTypes from 'prop-types'
import './index.less'

const FormItem = Form.Item
const Option = Select.Option
// const { MonthPicker, RangePicker, WeekPicker } = DatePicker

/**
 * @param expand 是否展开
 * @param isShowExpand 展开按钮显示条件
 * @param isMobile 是否移动端
 * 响应式：
 * xs  <576px
 * sm  ≥576px
 * md  ≥768px
 * lg  ≥992px
 * xl  ≥1200px
 * xxl ≥1600px
 */

class SearchComponent extends Component {
    constructor (props) {
        super(props)
        this.state = {
            expand: true,
            isShowExpand: this.props.config.length,
            isMobile: window.innerWidth < 768 ? true : false
        }
    }
    componentDidMount () {
        // console.log('search---Did-->', this.props)
        const { addOpts } = this.props
        if (addOpts && addOpts.length > 0) {
            this.optsUpdata(addOpts)
        }
    }
    componentWillReceiveProps (nextProps) {
        // console.log('search--->', nextProps)
        const { addOpts } = nextProps
        if (addOpts) {
            this.optsUpdata(addOpts)
        }
    }
    componentWillUnmount () {
        // console.log('销毁search')
    }

    // 更新 select, selectInput, cascader opts 数据
    optsUpdata = (addOpts) => {
        // console.log(addOpts)
        let obj = {}
        if (addOpts.length > 0) {
            for (let i = 0; i < addOpts.length; i++) {
                obj[`${addOpts[i].key}Opts`] = addOpts[i].opts
            }
            this.setState(obj)
        }
    }

    // 确定按钮回调
    handleSubmit = (e) => {
        e.preventDefault()
        const { config } = this.props
        let dateList = []
        this.props.form.validateFields((err, values) => {
            // console.log('查询--->', values)
            if (!err) {
                for (let i = 0; i < config.length; i++) {
                    const { key, type } = config[i]
                    if (type === 'datePicker') {
                        dateList.push(key)
                    }
                }
                // 处理datePicker 数据
                for (let i = 0; i < dateList.length; i++) {
                    if (values[dateList[i]]) {
                        values[dateList[i]] = values[dateList[i]].format('YYYY-MM-DD')
                    }
                }
                this.props.onSearch(values)
            }
        })
    }
    // 重置所有组件数据
    onReset = () => {
        const { config } = this.props
        for (let i = 0; i < config.length; i++) {
            const { key, type } = config[i]
            if (type === 'rangePicker') {
                this.setState({
                    [`${key}StartValue`]: null,
                    [`${key}EndValue`]: null
                })
            }
        }
        this.props.form.resetFields()
        this.props.onClear()
    }
    // 展开收起
    onChangeExpand = () => {
        const { expand } = this.state
        this.setState({
            expand: !expand
        })
    }
    // Modal 模式下取消按钮的回调
    onCancel = () => {
        const { onCancel } = this.props
        onCancel && onCancel()
    }
    buildSearch = () => {
        const { config } = this.props
        let count = this.state.expand ? config.length : 1
        const { getFieldDecorator } = this.props.form
        const { isShowExpand, expand } = this.state
        let { isModal, column } = this.props
        if (window.innerWidth <= 768) {
            column = 1
        }
        let html = [],
            reactive = isModal ? {
                xs: (24 % column === 0 ) ? (24 / column) : 24
            } : {
                xs: 24,
                sm: 12,
                md: 12,
                lg: 8
                // xxl: 6
            }
        if (isModal) {
            count = config.length
        }
        for (let i = 0; i < config.length; i++) {
            const { name, key, decoratorOpts } = config[i]
            html.push(
                <Col {...reactive} key={name} style={{ display: i <= count ? 'block' : 'none' }}>
                    <FormItem
                        label={name}
                    >
                        {getFieldDecorator(key, {
                            ...decoratorOpts
                        })(
                            this.buildSubitems(config[i])
                        )}
                    </FormItem>
                </Col>
            )
        }
        if (!isModal) {
            // console.log(this.props)
            if (config.length <= 2) {
                html.push(
                    <Col {...reactive} style={{ textAlign: 'left' }} key="submit">
                        <Button.Group>
                            <Button type="primary" htmlType="submit">查询</Button>
                            <Button onClick={this.onReset}>重置</Button>
                            {isShowExpand > 2 ? <Button onClick={this.onChangeExpand}>{expand ? '收起' : '展开'}</Button> : null}
                        </Button.Group>
                    </Col>
                )
            } else {
                html.push(
                    <Col {...reactive} style={{ textAlign: 'left' }} key="submit">
                        {!expand ?
                            <Button.Group>
                                <Button type="primary" htmlType="submit">查询</Button>
                                <Button onClick={this.onReset}>重置</Button>
                                {isShowExpand > 2 ? <Button onClick={this.onChangeExpand}>{expand ? '收起' : '展开'}</Button> : null}
                            </Button.Group>
                        : null
                    }
                    </Col>
                )
            }
        }
        return html
    }
    buildSubitems = (config) => {
        const { type, key, placeholder, opts, disabled } = config
        switch (type) {
            case 'input':
                return (<Input placeholder={placeholder} disabled={disabled} />)
            case 'inputPureNumber':
                return (
                    <Input
                        placeholder={placeholder}
                        onChange={(e) => this.onInputChange(e, key)}
                        disabled={disabled}
                    />
                )
            case 'inputNumber':
                return (
                    <InputNumber
                        placeholder={placeholder}
                        style={{ width: '100%' }}
                        disabled={disabled}
                    />)
            case 'select':
                return (
                    <Select
                        placeholder={placeholder}
                        notFoundContent={<Spin size="small" />}
                        disabled={disabled}
                    >
                        {this.state[`${key}Opts`] ? this.state[`${key}Opts`].map((v) => {
                            return (<Option value={v.value} key={v.value}>{v.text}</Option>)
                        }) : opts.map((v) => {
                            return (<Option value={v.value} key={v.value}>{v.text}</Option>)
                        })}
                    </Select>
                )
            case 'selectInput':
                let selectInputAttr = {
                    showSearch: true,
                    defaultActiveFirstOption: false,
                    showArrow: false,
                    filterOption: false,
                    notFoundContent: null
                }
                return (
                    <Select
                        {...selectInputAttr}
                        placeholder={placeholder}
                        onSearch={(value) => this.onSelectInputSearch(value, config)}
                        onChange={(value) => this.onSelectInputChange(value, key)}
                        disabled={disabled}
                    >
                        {this.state[`${key}Opts`] ? this.state[`${key}Opts`].map((v) => {
                            return (<Option value={v.value} key={v.value}>{v.text}</Option>)
                        }) : []}
                    </Select>
                )
            case 'datePicker':
                return (
                    <DatePicker
                        placeholder={placeholder}
                        style={{width: '100%'}}
                        disabled={disabled}
                    />)
            case 'rangePicker':
                let start, end
                if (placeholder) {
                    start = placeholder[0]
                    end = placeholder[1]
                }
                return (
                    <div className="RangePocker-box">
                        <FormItem style={{display: 'inline-block', width: '48%', paddingBottom: '0px'}}>
                            <DatePicker
                                disabled={disabled}
                                style={{width: '100%'}}
                                disabledDate={(startValue) => {
                                    const endValue = this.state[`${key}EndValue`]
                                    if (!startValue || !endValue) {
                                    return false;
                                    }
                                    return startValue.valueOf() > endValue.valueOf()
                                }}
                                placeholder={start}
                                format="YYYY-MM-DD"
                                value={this.state[`${key}StartValue`]}
                                onChange={(value) => this.onStartChange(value, key)}
                                onOpenChange={(open) => this.handleStartOpenChange(open, key)}
                            />
                        </FormItem>
                        <span style={{display: 'inline-block', width: '4%', textAlign: 'center'}}>-</span>
                        <FormItem style={{display: 'inline-block', width: '48%', paddingBottom: '0px'}}>
                            <DatePicker
                                disabled={disabled}
                                style={{width: '100%'}}
                                disabledDate={(endValue) => {
                                    const startValue = this.state[`${key}StartValue`]
                                    if (!endValue || !startValue) {
                                        return false
                                    }
                                    return endValue.valueOf() <= startValue.valueOf()
                                }}
                                placeholder={end}
                                format="YYYY-MM-DD"
                                value={this.state[`${key}EndValue`]}
                                onChange={(value) => this.onEndChange(value, key)}
                                open={this.state[`${key}EndOpen`]}
                                onOpenChange={(open) => this.handleEndOpenChange(open, key)}
                            />
                        </FormItem>
                    </div>
                )
            case 'cascader':
                return (
                    <Cascader
                        placeholder={placeholder}
                        options={this.state[`${key}Opts`] ?
                            this.state[`${key}Opts`] :
                            [{
                                value: '',
                                label: '',
                                loading: true
                            }]
                        }
                    />
                )
            default:
                return null
        }
    }

    // inputNumberNormal 组件 onChange 回调
    onInputChange = (e, key) => {
        const { value } = e.target
        const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/
        if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
            this.props.form.setFieldsValue({
                [key]: value
            })
        } else {
            setTimeout(() => {
                this.props.form.setFieldsValue({
                    [key]: ''
                })
            }, 0)
        }
    }


    // rangePicker组件 开始 弹出日历和关闭日历的回调
    handleStartOpenChange = (open, key) => {
        if (!open) {
            if (!this.state[`${key}EndValue`]) {
                this.setState({
                    [`${key}EndOpen`]: true
                })
            }
        }
    }
    // rangePicker组件 结束 弹出日历和关闭日历的回调
    handleEndOpenChange = (open, key) => {
        // console.log(open)
        this.setState({
            [`${key}EndOpen`]: open
        }, () => {
            const endValue = this.state[`${key}EndValue`]
            if (!endValue) {
                this.setState({
                    [`${key}StartValue`]: null
                })
            }
        })
    }
    onChange = (field, value) => {
        this.setState({
            [field]: value
        })
    }
    // rangePicker组件 开始 时间发生变化的回调
    onStartChange = (value, key) => {
        if (!value) {
            this.setState({
                [`${key}EndValue`]: null
            }, () => {
                this.props.form.setFieldsValue({
                    [key]: []
                })
            })
        }
        this.onChange(`${key}StartValue`, value)
    }
    // rangePicker组件 结束 时间发生变化的回调
    onEndChange = (value, key) => {
        let startValue = this.state[`${key}StartValue`]
        if (value) {
            if (startValue) {
                this.props.form.setFieldsValue({
                    [key]: [startValue.format('YYYY-MM-DD'), value.format('YYYY-MM-DD')]
                })
                this.onChange(`${key}EndValue`, value)
            } else {
                this.setState({
                    [`${key}EndValue`]: null
                })
            }
        } else {
            this.setState({
                [`${key}StartValue`]: null
            })
            this.props.form.setFieldsValue({
                [key]: []
            })
            this.onChange(`${key}EndValue`, value)
        }
    }
    

    // selectInput组件 输入后请求数据 
    onSelectInputSearch = (value, config) => {
        // const { key, service, params, requestFields, responseFields } = config
        // let data = {
        //     ...params,
        //     [requestFields]: value
        // }
        // service(data).then(res => {
        //     // // console.log('--->', res)

        //     this.setState({
        //         // [`${key}Opts`]: selectInputData
        //     })
        // })
    }
    // selectInput组件 点击选项的回调
    onSelectInputChange = (value, key) => {
        this.props.form.setFieldsValue({[key]: value})
    }

    buildBtn = () => {
        const { expand, isShowExpand } = this.state
        const { okText, cancelText, isModal, footer, config } = this.props
        if (isModal && footer) {
            return (
                <Col span={24} style={{ textAlign: 'right', paddingTop: '10px'}}>
                    <Button style={{ marginRight: '8px' }} onClick={this.onCancel}>{cancelText}</Button>
                    <Button type="primary" htmlType="submit">{okText}</Button>
                </Col>
            )
        }
        if (config.length > 2) {
            return (
                <Col span={24} style={{ textAlign: 'right'}}>
                    {expand ?
                        <Button.Group>
                            <Button type="primary" htmlType="submit">查询</Button>
                            <Button onClick={this.onReset}>重置</Button>
                            {isShowExpand > 2 ? <Button onClick={this.onChangeExpand}>{expand ? '收起' : '展开'}</Button> : null}
                        </Button.Group>
                    : null}
                </Col>
            )
        }
    }

    render () {
        const { isMobile } = this.state
        const { isModal } = this.props
        let plight
        if (isMobile) {
            plight = 'isMobile'
            if (isModal) {
                plight = 'isModal'
            }
        }
        let gutter = { xs: 0, sm: 6, md: 10, lg: 12, xl: 14, xxl: 16}
        return (
            <div className="SearchComponent">
                <Form onSubmit={this.handleSubmit} className={plight}>
                    <Row gutter={gutter}>
                        {this.buildSearch()}
                    </Row>
                    <Row>
                        {this.buildBtn()}
                    </Row>
                </Form>
            </div>
        )
    }
}

SearchComponent.defaultProps = {
    okText: '确定',
    cancelText: '取消',
    config: [],
    column: 2,
    isModal: false
}

SearchComponent.propTypes = {
    config: PropTypes.array.isRequired,
    isModal: PropTypes.bool,
    footer: PropTypes.bool,
    addOpts: PropTypes.array,
    onSearch: PropTypes.func,
    onClear: PropTypes.func,
    onCancel: PropTypes.func,
    okText: PropTypes.string,
    cancelText: PropTypes.string
}

const CollectSearch = Form.create()(SearchComponent)
export default CollectSearch