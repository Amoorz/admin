import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Button, Form, Row, Col, Input, InputNumber, DatePicker, Select } from 'antd'
import SearchUser from '../searchUserModal'
import {dataFormat,checkType} from '../../utils/utils.js'
import moment from 'moment'
import './index.less'
import XLSX from 'xlsx'

import 'antd-mobile/dist/antd-mobile.css';

const FormItem = Form.Item
const ButtonGroup = Button.Group
const { TextArea } = Input
const { MonthPicker, RangePicker } = DatePicker
const Option = Select.Option

/*
插件说明：
version：2.1

实例： <Search onSubmit={this.onSearch} config={searchConfig} dataSource={checkKey(this.props.authrotyList.list)} onRef={} />

onSubmit: 为业务逻辑事件，调用这方法返回一个搜索对象是form表单值。
config: 配置列表。
dataSource: 需要导出的这里传值,导出按钮数据
onRef: 获取search实例，

配置说明：const searchConfig = {
        items: [                                                                //数组形式传入多个input配置对象
            {
                // [必填] 输入框类型
                // text|textarea|number|datepicker|rangepicker|monthpicker|searchuser弹出搜索用户Modal
                type: "text",
                // [必填] 标题名称
                name: '名称',
                // [必填] 接口key名
                key: 'name',
                // [可选] 字符类型, 针对input框的输入限制 string|select|number
                searchFilterType: "string",
                // [可选] 初始化值
                defaultValue: "",
                // [可选] 提示文字 rangepicker:使用数组形式，例：['开始', '结束']
                placeholder: "请输入名称",
                // [可选] form.getFieldDecorator第二参数中的rules属性
                rules: [{ required: true, message: 'Please input your name!' }]
            },
            {
                type: "textarea",
                name: '地址',
                key: "address",
                searchFilterType: "string",
                extendAttr: () => { { rows = 1 } }                              //额外attr参数
            },
            {
                type: "number",
                name: '年龄',
                key: "age",
                searchFilterType: "number",
                defaultValue: "",
                extendAttr: () => { { min = 1, max = 10 } },
                fun: () => { console.log("number") },                           //选择后调用方法
            },
            {
                type: 'select',                                                 // 选择框
                name: '交易状态',
                key: 'respStatus',
                renderSelectData : {                                            // 小按钮渲染出来的值
                    APP: 'APP',
                    MP: '公众号',
                    H5: '移动官网',
                    WEB: 'PC官网',
                    TUJIA: '途家',
                    TUJIAAPI: '途家API',
                    AIRBNB: '爱彼迎',
                    BOOKING: 'BOOKING'
                },
                selectData: [
                    {value: '', text: '全部'},
                    {value: '0', text: '未来交易'},
                    {value: '1', text: '已完成交易'},
                    {value: '-1', text: '失败交易'}
                ],
                searchFilterType: 'select',
                defaultValue: '',
                placeholder: ''
            }
        ],
        export: {
            name: '活动数据'                                                      //显示导出按钮
        },
        exportFBtn: {
            name: '前端导出'
        },
        columns：[{                                                              //导出表格配置
            title: '权限编码',
            dataIndex: 'authCode',
            key: 'authCode',
            exportType: 'text'
        }, {
            title: '权限名称',
            dataIndex: 'authName',
            key: 'authName',
            exportType: 'text'
        }, {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            exportType: 'date',                                                 //显示输出类型 text | date | none
            render: val => <span>{dataFormat(val, 'yyyy-MM-dd hh:mm:ss')}</span>
        }]
    }
*/

class SearchForm extends Component {
    constructor (props){
        super(props)
        this.state = {
            searchData : {},
            showKey : '',
            uploadModal : false,
            selectDir: [],
            obj: {}
        }
        this.exportCSV = this.exportCSV.bind(this)
        this.exportFCSV = this.exportFCSV.bind(this)
        this.optsRender = this.optsRender.bind(this)
        this.selectInit = this.selectInit.bind(this)
    }
    componentWillMount () {
        this.selectInit()
    }
    componentDidMount () {
        this.props.onRef && (this.props.onRef(this))
        let setData = {}
        for(let i in this.props.config.items){
            setData[i.key] = i.defaultValue
        }
        this.props.form.setFieldsValue(setData)
        this.changeBig = this.changeBig.bind(this)
    }
    selectInit () {
        let items = this.props.config.items
        let arr = []
        let searchData = {}
        for (let i = 0; i < items.length; i++) {
            if (items[i].type === 'select') {
                arr.push({
                    key: items[i].key,
                    data: items[i].selectData
                })
            }
            if(items[i].defaultValue){
                searchData[items[i].key] = {
                    value: items[i].defaultValue,
                    type: items[i].type
                }
            }
        }
        this.setState({
            selectDir: arr,
            searchData
        })
    }
    getData = (fun) => {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const data = {}
                for(var i in values){
                    data[i] = {
                        value : this.getSearchValue(this.getType(i),values[i]),
                        type : this.getType(i)
                    }
                }
                this.setState({searchData:data})
                fun && fun(data)
                return data
            }else{
                return false
            }
        })
    }
    handleSearch = (e) => {
        e.preventDefault()
        this.getData((data)=>{
            if(data){
                this.props.onSubmit(data)
            }
        })
    }
    getSearchValue (type,value){
        switch (type) {
        case "datepicker":
            if(value){
                return moment(value).format("YYYY-MM-DD")
            }else{
                return undefined
            }
        case "monthpicker":
            if (value) {
                return moment(value).format('YYYY-MM')
            } else {
                return undefined
            }
        case "rangepicker":
            if (value) {
                // return [moment(value[0]).format('YYYY-MM-DD hh:mm:ss'), moment(value[1]).format('YYYY-MM-DD hh:mm:ss')]
                return [new Date(value[0]) / 1 , new Date(value[1]) / 1 ]
            } else {
                return undefined
            }
        default:
            if (value) {
                return value
            } else {
                return undefined
            }
        }
    }
    getType = (item) => {
        for (let n = 0 ; n < this.props.config.items.length ; n++) {
            if(this.props.config.items[n].key === item){
                return this.props.config.items[n].type
            }
        }
    }
    handleReset = () => {
        this.props.form.resetFields()
        this.setState({searchData:{}})
    }
    getInitalValue (item) {
        switch (item.type) {
        case "datepicker":
        case "monthpicker":
        case "rangepicker":
            return {}
        default:
            return {initialValue: item.defaultValue || ''}
        }
    }
    getChildren () {
        const { getFieldDecorator } = this.props.form
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 0 }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span:18 }
            }
        }
        const children = []
        for (let i = 0; i < this.props.config.items.length; i++) {
            let item = this.props.config.items[i]
            let isShow = this.isShow(item.key,i)
            children.push(
            // <Col span={8} key={i}>
                <FormItem key={i} {...formItemLayout} style={{display:isShow}}>
                    {getFieldDecorator(item.key, {
                        rules : item.rules ? item.rules : '',
                        ...this.getInitalValue(item)
                    })(
                        this.getInputType(item)
                    )}
                </FormItem>
            // </Col>
            )
        }
        return children
    }
    isShow (key,index){
        if(this.state.showKey === ''){
            if(index === 0){
                return ''
            }else{
                return 'none'
            }
        }else{
            if(this.state.showKey !== key + 'Button'){
                return 'none'
            }else{
                return ''
            }
        }
    }
    getPlaceHolder (item) {
        // switch (item.type) {
        // case 'rangepicker':
        //     return {}
        // default:
        return item.placeholder || ''
        // }
    }
    getInputType (item){
        let self = this
        // let isMobile = this.props.responsive.isMobile
        let _attr = {
            ...item.extendAttr,
            type : item.searchFilterType,
            placeholder : this.getPlaceHolder(item),
            onChange : function () {
                setTimeout(() => {
                    self.getData()
                    item.fun && item.fun(self)
                }, 300)

            }
        }
        switch (item.type) {
        case "text":
            return <Input {..._attr} />
        case "number":
            return <InputNumber {..._attr} />
        case "textarea":
            return <TextArea {..._attr} />
        case "datepicker":
            // if(isMobile){
            //     return (
            //         <DatePickerMobile 
            //             mode="date"
            //             title="Select Date"
            //             extra="Optional"
            //         >
            //             <span>请选择</span>
            //         </DatePickerMobile>
            //     )
            // }
            return <DatePicker {..._attr} />
        case "monthpicker":
            return <MonthPicker {..._attr} />
        case "rangepicker":
            return <RangePicker allowClear={false} showTime={{hideDisabledOptions: true, defaultValue: [moment('00:00:01', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')]}} format="YYYY-MM-DD HH:mm:ss"{..._attr} />
        case "select":
            let opts
            let dir = this.state.selectDir
            for(let i = 0; i < dir.length; i++) {
                if (item.key === dir[i].key) {
                    opts = dir[i].data.map((v, i) => (<Option value={v.value} key={i}>{v.text}</Option>))
                    return <Select {..._attr}>{opts}</Select>
                }
            }
            break;
        case 'searchuser':
            return <SearchUser {..._attr} getData={this.getData} field={item.key} form={this.props.form} />
        default:
            break
        }
    }
    optsRender (val) {
        let dir = JSON.parse(JSON.stringify(this.state.selectDir))
        for (let i = 0; i < dir.length; i++) {
            if (dir[i].key === val.key) {
                dir[i].data = val.data
            }
        }
        this.setState({
            selectDir: dir
        })
    }
    exportCSV (header){
        let params = this.formatTable(this.props.config.columns,this.props.dataSource)
        const ws = XLSX.utils.json_to_sheet(params.data,params.header)
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
        XLSX.writeFile(wb, `${this.props.config.export.name}.xlsx`)
    }
    exportFCSV (header){
        let params = this.formatTable(this.props.config.columns,this.props.dataSource)
        const ws = XLSX.utils.json_to_sheet(params.data,params.header)
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
        XLSX.writeFile(wb, `${this.props.config.exportFBtn.name}.xlsx`)
    }
    formatTable (header,table){
        /* 返回数据模板
        [
            { A:"S", B:"h", C:"e", D:"e", E:"t", F:"J", G:"S" },
            { A: 1,  B: 2,  C: 3,  D: 4,  E: 5,  F: 6,  G: 7  },
            { A: 2,  B: 3,  C: 4,  D: 5,  E: 6,  F: 7,  G: 8  }
        ], {header:["A","B","C","D","E","F","G"], skipHeader:true}
        */
        let returnHeader = []
        let returnTable = []
        let title = {}
        for(let index in header){//获取header
            if(header[index].exportType !== "none"){
                returnHeader.push(header[index].key)
                title[header[index].key] = header[index].title
            }
        }
        returnTable.push(title)

        if(table){
            for(let index in table){//获取table
                let dataItem = {}
                header.forEach((o) => {
                    switch (o.exportType){
                    case 'text':
                        dataItem[o.key] = table[index][o.key]
                        break
                    case 'date':
                        dataItem[o.key] = dataFormat(table[index][o.key],'yyyy-MM-dd hh:mm:ss')
                        break
                    default :
                        dataItem[o.key] = table[index][o.key]
                    }
                })
                returnTable.push(dataItem)
            }
        }
        return {
            data: returnTable,
            header:{header:returnHeader, skipHeader:true}
        }
    }
    renderBtn (i){
        let content = ''
        let item = this.props.config.items[i]
        let key = this.props.config.items[i].key
        if(this.state.searchData[key]){
            let value = this.state.searchData[key].value
            if(!checkType.isEmpty(value)){
                content = `【${this.getSmallValue(value,item)}】`
            }
        }
        return (<Button size={'small'} type="dashed" className={'mr10'} key={key} id={key + "Button"} onClick={this.changeBig}>{item.name}{content}</Button>)
    }
    getSmallValue (value,item){
        switch (item.type){
        case 'select':
            if(item.renderSelectData){
                return item.renderSelectData[value]
            }else{
                return value
            }
        case 'rangepicker':
            if(checkType.isArray(value)){
                return this.getRangepicker(value[0],value[1])
            }else{
                let timeArr = value.splice(',')
                return this.getRangepicker(timeArr[0],timeArr[1])
            }
        default :
            return value
        }
    }
    getRangepicker (startDate,endDate){
        return `${moment(startDate).format("YYYY-MM-DD HH:MM:SS")} - ${moment(endDate).format("YYYY-MM-DD HH:MM:SS")}`
    }
    getLittleBtn () {
        const children = []
        for (let i = 0; i < this.props.config.items.length; i++) {
            children.push(this.renderBtn(i))
        }
        return children
    }
    getExportBtn () {
        if(this.props.config.export){
            // return <Button type="primary" style={{ marginLeft: 8 }} onClick={this.exportCSV} >导出</Button>
            return ''
        }else if(this.props.config.exportFBtn){
            return <Button type="primary" onClick={this.exportFCSV} >导出</Button>
        }else{
            return ''
        }
    }
    changeBig (e) {
        let key = e.target.id
        this.setState({showKey:key})
    }
    render () {
        return (
            <Form
                className="ant-advanced-search-form "
                onSubmit={this.handleSearch}
            >
                <Row gutter={24}>
                    <Col span={16} className="searchInputItem" >
                        {this.getChildren()}
                    </Col>
                    <Col span={8} className="searchSubmitItem" style={{textAlign:'left',paddingLeft:0}}>
                        <ButtonGroup>
                            <Button type="primary" icon="search" htmlType="submit" />
                            <Button type="primary" icon="close" onClick={this.handleReset} />
                        </ButtonGroup>
                        <ButtonGroup className="ml10">
                            {this.getExportBtn()}
                        </ButtonGroup>
                    </Col>
                </Row>
                <Row gutter={24} className="mb10">
                    {this.getLittleBtn()}
                </Row>
            </Form>
        )
    }
}

const mapStateToProps = state => {
    return { responsive: state.responsiveData };
};

export default connect(mapStateToProps)(Form.create({})(SearchForm))