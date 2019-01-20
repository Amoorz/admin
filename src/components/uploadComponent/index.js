import React, { Component } from 'react'
import {
    Upload,
    // Modal
} from 'antd'
import XLSX from 'xlsx'

class UploadComponent extends Component {
    constructor (props) {
        super(props)
        this.state = {
            fileList: []
        }
    }
    onRemove = (file) => {
        this.setState(({ fileList }) => {
            const index = fileList.indexOf(file)
            const newFileList = fileList.slice()
            newFileList.splice(index, 1)
            return {
                fileList: newFileList
            }
        })
    }
    // file.name 通过文件后缀名，判断文件类型
    beforeUpload = (file) => {
        console.log('上传--->', file)
        this.setState(({ fileList }) => ({
            fileList: [...fileList, file]
        }))
        let reader = new FileReader()
        reader.onload = function (e) {
            var data = e.target.result
            // console.log('onload--->', data)
            var workbook = XLSX.read(data, {
                type: 'array'
            })
            // workbook.SheetNames 标签名列表
            var first_worksheet = workbook.Sheets[workbook.SheetNames[0]]
            // var jsonArr = XLSX.utils.sheet_to_json(first_worksheet)
            console.log(first_worksheet)
        }
        reader.readAsArrayBuffer(file)
        return false
    }
    render () {
        const { fileList } = this.state
        // console.log(fileList)
        return (
            <Upload
                action={'//jsonplaceholder.typicode.com/posts/'}
                onRemove={this.onRemove}
                beforeUpload={this.beforeUpload}
                fileList={fileList}
            >
                {this.props.children}
            </Upload>
        )
    }
}

export default UploadComponent