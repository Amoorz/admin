import React, { Component } from 'react'
import { Button } from 'antd'
import XLSX from 'xlsx'

class exportExcel extends Component {
    constructor (props) {
        super(props)
        this.state = {}
    }
    exprotFile = () => {
        let data = [['字段1', '字段2'], [1, 2, 2]]
        const wb = XLSX.utils.book_new()
        const ws = XLSX.utils.aoa_to_sheet(data)
        XLSX.utils.book_append_sheet(wb, ws, '测试')
        XLSX.writeFile(wb, "测试.xlsx")
    }
    render () {
        return (
            <Button onClick={this.exprotFile}>导出</Button>
        )
    }
}

export default exportExcel