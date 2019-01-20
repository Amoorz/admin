import React, { Component } from 'react'
import { Table, Button, notification, Popconfirm } from 'antd'
import { pageOption, dataFormat, checkType } from '../../utils/utils.js'
import filterChange from '../../utils/filterChange'
import EditLabelModal from "./editModal"
import './index.less'
/*
插件说明：
version：1.0

实例： <SubTable {...subTableItem} />
如提前增加 orderBy  需配合 在columns 增加sortOrder: 'descend'
参数：
    const columns = [{ // table 表头 和原ants table 类似
            title: '标签名称',
            dataIndex: 'name'
        }, {
            title: '描述',
            dataIndex: 'description'
        }, {
            title: '排序',
            sortOrder: 'descend',
            dataIndex: 'orderNumber',
            sorter: true // 排序 需 sorterKeys  配合使用
        }, {
            title: '处理状态',
            dataType: 'select', // 多选值
            dataIndex: 'conform',
            valIndex: 'conform', // 取值的key,会替代dataIndex
            selectData: AummerActivityStatusMap // 多选值数组
        }, {
            title: '创建时间',
            dataIndex: 'createTime',
            sorter: true,
            dataType: 'time',  // 时间类型
            fmt: 'yyyy-MM-dd hh:mm:ss' // 转换的时间类型
        }]
    // 修改和增加 弹出框类
    const editKeys = {
        name: {
            key: 'name',
            label: '标签名称',
            rules:{
                required: true
            },
            defaultValue:'',
            placeholder:'请输入'
        },
        orderNumber: {
            key: 'orderNumber',
            label: '排序',
            rules:{
                required: true
            },
            defaultValue:'',
            element:'number',
            placeholder:'请输入'
        },
        description: {
            key: 'description',
            label: '描述',
            defaultValue:'',
            element:'textarea',
            placeholder:'[可选]请输入描述'
        },
        id:{
            key: 'id',
            noVisible: true,
            defaultValue:''
        }
    }
    // 整个table 传参
    const subTableItem = {
        // 【必填】获取table数据接口
        getTableService: articleService.getArticlesLabelTable,
        // 【必填】table header
        columns: columns,
        // 【必填】设置ref 可以获取子组件function
        refsTab: function (ref) {
            _this.tableThis = ref
        },
        // table rowKey
        rowKey: "id",
        // 搜索条件
        searchFields: _state.searchFields,
        // 操作按钮
        operatBtn: [{
            label: 'button',
            size: "small",
            type: "primary",
            className: 'mr10',
            // 显示控制，选填
            visible: (record) => record.name,
            // 修改弹出框数据
            editKeys: {...editKeys,
                id:{
                    key: 'id',
                    noVisible: true,
                    defaultValue:''
                }},
            // Button 文本
            text: '编辑'
        }, {
            label: 'delete',
            size: "small",
            className: 'mr10',
            // 删除类型 删除fn
            onClick: (record) => articleService.deleteArticlesLabel(record.id),
            text: '删除'
        }],
        // 排序 配置
        sorterKeys: [{
            key: 'createTime',
            str: 'create_time'
        }, {
            key: 'orderNumber',
            str: 'order_number'
        }],
        // 修改按钮 fn
        editFNService: articleService.modifyArticlesLabel,
        // 修改额外参数
        editExtraKeys: {
            // key: 123
        },
        // 初始 排序 orderBy 字段
        orderBy: 'create_time desc',
        // 顶部标签Dom
        headerDom: {
            // 自定义其他dom元素，
            otherDom: null,
            // 添加按钮
            addButton:{
                name: '新增标签',
                // 增加弹窗keys
                addKeys: editKeys,
                // 增加额外参数
                extraKeys:{
                    // key: 123
                },
                // 增加fn
                addFN: articleService.addArticlesLabel
            }
        }
    }
*/

class TableForm extends Component {
    constructor (props){
        super(props)
        this.state = {
            loading:true,
            dataSource: [],
            pageNum: pageOption.pageNum,
            pageSize: pageOption.pageSize,
            totalCount: 0,
            pageSizeOptions: pageOption.pageSizeOpts,
            orderBy: '',
            editType: 'add',
            modalEditForm: {},
            columns: {},
            operatBtn: {},
            headerDom: {}
        }
    }
    componentWillMount () {
        const orderBy = this.props.orderBy
        if(orderBy){
            this.setState({
                orderBy
            })
        }
        this.headerDom = null
        this.tableItemEdit(this.props)
        this.props.refsTab(this)
    }
    componentWillReceiveProps (nextProps) {
        // console.log('nextProps',nextProps)
        this.tableItemEdit(nextProps)
    }
    stateChange = (obj, fn) => {
        this.setState(obj, ()=> fn && fn())
    }
    tableItemEdit = (props) => {
        const {
            columns,
            rowKey,
            searchFields,
            operatBtn,
            headerDom,
            operatBtnWidth
        } = props
        const {
            columns : columns2,
            rowKey : rowKey2,
            searchFields : searchFields2,
            operatBtn : operatBtn2
            // headerDom : headerDom2
            // columnsMerge: columnsMerge2
        } = this.state
        if (
            JSON.stringify(columns) !== JSON.stringify(columns2) ||
            JSON.stringify(searchFields) !== JSON.stringify(searchFields2) ||
            JSON.stringify(operatBtn) !== JSON.stringify(operatBtn2) ||
            rowKey !== rowKey2
        ) {
            let columnsMerge = columns
            columnsMerge = this.columnsMerge(columnsMerge, operatBtn, operatBtnWidth)
            // console.log('columnsMerge',columnsMerge)
            this.setState({
                columns,
                rowKey,
                searchFields,
                operatBtn,
                headerDom,
                columnsMerge
            },this.renderTable)
        }
        headerDom && this.renderHeaderDom(headerDom)
    }
    renderHeaderDom = (headerDom) => {
        const _this = this
        const {addButton: addButtonToH,otherDom} = headerDom
        let addButton = addButtonToH && (
            <Button type="primary" onClick={function (){
                _this.setState({
                    editModalVisible:true,
                    editType: 'add',
                    modalEditForm: {...addButtonToH.addKeys}
                })
            }}
            >{addButtonToH.name}</Button>
        )
        let dom = (
            <div className="pt10 mb10 text-right">
                {otherDom && otherDom}
                {addButton}
            </div>
        )
        this.headerDom = dom
    }
    columnsMerge = (columnsMerge,operatBtn,operatBtnWidth) => {
        // table columns 遍历
        const _this = this
        const columns = [...columnsMerge.map(item => {
            if(!item.render) {
                switch (item.dataType) {
                case 'time':
                    item.render = (v,o,i) => {
                        const val = o[item.valIndex || item.dataIndex]
                        const value = dataFormat(val, item.fmt)
                        return <span key={`table-render-time-${o.dataIndex}-${i}`} title={value}>{value}</span>
                    }
                    break;
                case 'datePicker':
                    item.render = (v,o,i) => {
                        const start = o[item.startIndex || item.dataIndex]
                        const end = o[item.endIndex || item.dataIndex]
                        const startVal = dataFormat(start, item.fmt)
                        const endVal = dataFormat(end, item.fmt)
                        return <span key={`table-render-datePicker-${o.dataIndex}-${i}`} title={startVal + ' - ' + endVal}>{startVal + ' - ' + endVal}</span>
                    }
                    break;
                case 'select':
                    item.render = (v,o,i) => {
                        const val = o[item.valIndex || item.dataIndex]
                        const value = item.selectData[val]
                        return <span key={`table-render-select-${o.dataIndex}-${i}`} title={value}>{value}</span>
                    }
                    break;
                default:
                    item.render = (v,o,i) =>{
                        const val = o[item.valIndex || item.dataIndex]
                        const value = typeof val === "string" ? val.substr(0,50) : val
                        return <div title={val} key={`table-render-button-${o.dataIndex}-${i}`}>{value}</div>
                    }
                    break;
                }
            }
            return item
        })]
        if(operatBtn && checkType.isArray(operatBtn)){
            columns.push({
                title: "操作",
                width: operatBtnWidth || null,
                render: (text, record, index) => (<div key={`operatBtn-${index}`}>
                    {_this.renderButton(text, record, index,operatBtn)}
                </div>)
            })
        }
        return columns
    }
    renderButton = (text, record, index,operatBtn) => {
        const recordData = record
        const _this = this
        // console.log('operatBtn',operatBtn)
        let buttonDom = operatBtn.map((item,i) => {
            const items = {...item}
            if(items.visible && (!items.visible(recordData))){
                return null
            }else{
                // 删除items 属性，避免加入Button
                delete items.visible
            }
            switch (items.label) {
            case 'button':
                let editKeys = items.editKeys
                delete items.editKeys
                return (
                    <Button {...items} onClick={function (){
                        if(items.onClick){
                            items.onClick(record)
                        }else{
                            const modalEditForm = {}
                            for (const key in editKeys) {
                                if (editKeys.hasOwnProperty(key)) {
                                    modalEditForm[key] = {...editKeys[key]}
                                    modalEditForm[key].defaultValue = record[key]
                                }
                            }
                            _this.setState({
                                editType: "edit",
                                editModalVisible: true,
                                editFrom: recordData,
                                modalEditForm
                            })
                        }
                    }} key={`tab-button-${index}-${i}`}
                    >{item.text}</Button>
                )
            case 'delete':
                const onClick = () =>{
                    item.onClick(recordData).then(data => {
                        notification.success({
                            message: '删除成功！'
                        })
                        _this.renderTable()
                    })
                }
                const buttonItem = {...item,onClick:null}
                return (
                    <Popconfirm title="确定删除?" key={`tab-popconfirm-${index}`} onConfirm={onClick} okText="确认" cancelText="取消">
                        <Button {...buttonItem} type="danger" key={`tab-delect-${index}`}>删除</Button>
                    </Popconfirm>
                )
            default:
                return item.label
            }
        })
        return buttonDom
    }
    renderTable = () => {
        const {pageNum, pageSize, orderBy, searchFields} = this.state
        const {getTableService, getTableServiceData, getServiceData} = this.props
        if(getTableService){
            let params
            if(getTableServiceData){
                params = getTableServiceData
            }else{
                params = {
                    pageNum: pageNum,
                    pageSize: pageSize
                }
                if(searchFields){
                    params = {
                        ...params,
                        ...searchFields,
                        urlData:getServiceData
                    }
                }
            }
            orderBy && (params.orderBy = orderBy)
            getTableService(params).then(data=>{
                if(data){
                    if(checkType.isArray(data)){
                        this.setState({
                            dataSource: data,
                            totalCount: Number(data.total) || 0,
                            loading: false
                        })
                    }else if(data.list){
                        this.setState({
                            dataSource: data.list,
                            totalCount: Number(data.total) || 0,
                            loading: false
                        })
                    }else{
                        this.setState({
                            dataSource: [],
                            totalCount: 0,
                            loading: false
                        })
                    }
                }
            }).catch((data)=>{
                this.setState({
                    loading: false
                })
            })
        }else{
            this.setState({
                loading: false
            })
        }
    }
    modalEditSave = (value) => {
        // console.log('modalEditSave', value)
        alert(JSON.stringify(value))
        debugger
        const {editFNService, extraKeys} = this.props
        if(editFNService){
            editFNService({...value, ...extraKeys}).then(data=>{
                notification.success({
                    message: '修改成功'
                })
                this.renderTable()
            }).catch((e) => {
                notification.error({
                    message: '修改失败'
                })
            })
        }
    }
    modalAddSave = (value) => {
        // console.log('modalAddSave', value)
        const {addFN, extraKeys} = this.props.headerDom.addButton
        if(addFN){
            addFN({...value, ...extraKeys}).then(data=>{
                notification.success({
                    message: '增加成功'
                })
                this.renderTable()
            }).catch((e) => {
                notification.error({
                    message: '增加失败'
                })
            })
        }
    }
    sorterChange = (p, f, sorter) =>{
        const keys = this.props.sorterKeys
        const filter = filterChange(this.state.orderBy,sorter, keys)
        if(filter !== false){
            this.setState({
                orderBy: filter,
                pageNum: 1
            },this.renderTable)
        }
    }
    render () {
        const _this = this
        const _state = _this.state
        const {
            dataSource,
            columnsMerge,
            loading,
            rowKey,
            totalCount,
            pageSize,
            pageSizeOptions,
            pageNum
        } = _state
        const { scroll, dataSource: dataSourceProd } = this.props
        const pageObj = {
            total: totalCount,
            pageSize: pageSize,
            showSizeChanger: true,
            pageSizeOptions: pageSizeOptions,
            current: pageNum,
            showQuickJumper: true,
            showTotal: (total) => `共 ${total} 条`,
            onShowSizeChange: (current, pageSize) => {
                this.setState({ 'pageNum': 1, pageSize }, this.renderTable)
            },
            onChange: (value, pageSize) => {
                this.setState({ pageNum: value, pageSize }, this.renderTable)
            }
        }
        // const scroll =  { x: true, y: false }
        const tableItem = {
            dataSource: dataSourceProd || dataSource,
            columns: columnsMerge,
            loading,
            rowKey,
            scroll: scroll || {},
            pagination: pageObj,
            onChange: this.sorterChange
        }
        // console.log('render',tableItem)
        // console.log('_data',_state.modalEditForm)
        return (
            <div className="subTable-prod">
                {this.headerDom}
                <Table
                    {...tableItem}
                />
                {_state.editModalVisible ?
                    <EditLabelModal
                        _data={_state.modalEditForm}
                        editType={_state.editType}
                        stateChange={_this.stateChange}
                        renderTable={_this.renderTable}
                        modalEditSave={_this.modalEditSave}
                        modalAddSave={_this.modalAddSave}
                    />
                    : null}
            </div>
        )
    }
}
export default TableForm