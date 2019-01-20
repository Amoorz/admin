import React, { Component } from 'react'
// import { Tabel } from 'antd'
// import { permisPagedList } from 'services/authManage-service'

class authManage extends Component {
    constructor (props) {
        super(props)
        this.state = {

        }
    }
    componentDidMount () {
        // let params = {
        //     pageSize: 20,
        //     pageIndex: 1
        // }
        // permisPagedList(params).then(res => {
        //     console.log(res)
        // })
    }
    render () {
        return (
            <div className="authManage">
                {/* <Tabel

                /> */}
            </div>
        )
    }
}

export default authManage