import React, { Component } from 'react'
import { notification, Icon, Upload } from 'antd'
import XLSX from 'xlsx'


/**
 * 插件说明：
 * version：1.0
 * 实例：<ExcelUpload stateChange={_this.stateChange} changeKey="tableData" exportKey={exportKey}>
 *   1、<Icon type="cloud-upload-o" />上传Execl文件  // 子集Dom --选填
 * </ExcelUpload>
 * stateChange 上传完改变事件
 * changeKey 改动的状态
 * exportKey excel 取值head数组
 * exportKey = {
 *  'phone': {
 *      key: '手机',
 *      required: true,
 *      rules: /^[1][3,4,5,7,8][0-9]{9}$/
 *  },
 *  'trsamt': {
 *      key: '金额',
 *      required: true
 *  },
 *  'houseNo': {
 *      key: '项目编号',
 *      required: true
 *  },
 *  'payType': {
 *      key: '类型',
 *      required: false,
 *      pros: _state.payTypeNum
 *  },
 *  'payTypeName': {
 *      key: '类型',
 *      required: false
 *  },
 *  'remark': {
 *      key: '备注',
 *      required: false
 *  }
 *}
  extraKey={extraKey} [选填]额外参数
 */

class ExcelUpload extends Component {
    constructor () {
        super()
        this.state = {
        }
    }
    componentDidMount () {
    }
    uploadCustomRequest = ({file})=>{
        const isXls = (/\.(csv|xls|xlsx)$/).test(file.name)
        const _this = this
        if (!isXls) {
            notification.error({
                message: '请上传Excel!'
            })
            return
        }
        let wb
        var reader = new FileReader()
        reader.onload = function (e) {
            var data = e.target.result
            var customerList = []
            wb = XLSX.read(data, {type: 'binary'})
            const xlsxList = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
            //表格没有数据
            if (xlsxList.length === 0) {
                notification.error({message:'导入表格没有内容'})
                return
            }
            let {exportKey,extraKey} = _this.props
            extraKey = extraKey || {}
            if(!exportKey){
                // notification.error({message:'文档格式和参数不一致'})
                console.error('没有设置导出参数')
                return false
            }
            xlsxList.map((data) => {
                let params = {}
                let bol = false
                for (const i in exportKey){
                    const item = exportKey[i]
                    const ItemData = data[item.key]
                    // 判断 Excel 值判断格式
                    if( (!item.required) ||
                        (item.required && (
                            (item.rules && item.rules.test(ItemData)) || 
                            ((!item.rules) && ItemData))
                        )
                    ){
                        params[i] = item.pros ? item.pros[ItemData] : ItemData
                    }else{
                        bol = true
                    }
                }
                if (bol) {
                    notification.error({message:`第${data.__rowNum__}行，不符合参数规范，请检查`})
                }else{
                    customerList.push({...extraKey,...params})
                }
                return data
            })
            _this.props.stateChange({
                [_this.props.changeKey || 'tableData']: customerList
            })
        }
        reader.readAsBinaryString(file)
    }
    render () {
        const uploadProps = {
            customRequest: this.uploadCustomRequest,
            showUploadList: false
        }
        return (
            <div className="excel-upload">
                <Upload {...uploadProps}>
                    {
                        this.props.children ? this.props.children :
                            (<span><Icon type="cloud-upload-o" />上传Execl文件</span>)
                    }
                </Upload>
            </div>
        )
    }
}

export default ExcelUpload