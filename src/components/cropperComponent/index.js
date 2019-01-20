import React, { Component } from 'react'
import { Button } from 'antd'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'

class CropperComponent extends Component {
    constructor (props) {
        super(props)
        this.state = {
            imageUrl: ''
        }
    }
    handleCrop = () => {
        let data = this.cropper.getCroppedCanvas().toDataURL('image/png')
        console.log('cropper--->', data)
        this.setState({
            imageUrl: data
        })
    }
    handleRotate = () => {
        this.cropper.rotate(90)
    }
    changeCropBox = () => {
        this.cropper.setCropBoxData({
            left: 295,
            top: 295,
            width: 10,
            height: 10
        })
    }
    cropperReady = () => {
        // console.log('ready', event)
        this.cropper.setCropBoxData({
            left: 295,
            top: 295,
            width: 10,
            height: 10
        })
    }
    render () {
        const { imageUrl } = this.state
        return (
            <div className="CropperComponent">
                <Cropper
                    ref={cropper => this.cropper = cropper}
                    src="http://img.mp.itc.cn/upload/20170613/120863d31ba940348cce58d87cfd5ea4_th.jpg"
                    style={{width: 600, height: 600}}
                    zoomable={false}
                    viewMode={1}
                    // dragMode={'move'}
                    // aspectRatio={16/9}
                    // autoCrop={false}
                    movable={false}
                    dragMode={'move'}
                    toggleDragModeOnDblclick={false}
                    ready={this.cropperReady}
                />
                <img src={imageUrl} alt="none" />
                <Button onClick={this.handleCrop}>截取</Button>
                <Button onClick={this.handleRotate}>旋转</Button>
                <Button onClick={this.changeCropBox}>修改截图框</Button>
            </div>
        )
    }
}

export default CropperComponent