import React, { Component } from 'react'
import { Card, Icon, Divider, Tag,  Input } from 'antd'

class Info extends Component {
    constructor (props) {
        super(props)
        this.state = {
            tags: ['花好约猿', '自猿其说', '开猿节流', '破竞难猿', '功成猿满', '心火燎猿', '左右逢猿', '三朝猿老'],
            inputVisible: false,
            inputValue: ''
        }
    }
    handleClose = (removedTag) => {
        const tags = this.state.tags.filter(tag => tag !== removedTag)
        // console.log(tags);
        this.setState({ tags })
    }

    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus())
    }

    handleInputChange = (e) => {
        this.setState({ inputValue: e.target.value })
    }

    handleInputConfirm = () => {
        const state = this.state;
        const inputValue = state.inputValue;
        let tags = state.tags;
        if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue];
        }
        console.log(tags);
        this.setState({
            tags,
            inputVisible: false,
            inputValue: ''
        })
    }
    saveInputRef = input => this.input = input
    render () {
        const { tags, inputVisible, inputValue } = this.state
        return (
            <div className="info">
                <Card bordered={false}>
                    <div className="accountInfo">
                        <div className="accountInfo__header">
                            <Icon type="smile" theme="twoTone" style={{fontSize: '80px'}} />
                            <p>Chan</p>
                            <p>专注，努力，健康</p>
                        </div>
                        <Divider
                            style={{
                                background: 'none',
                                borderTop: '1px dashed #e8e8e8'
                            }}
                        />
                        <div className="accountInfo__tag">
                            <p>标签</p>
                            {tags.map((tag, index) => {
                                return (
                                    <Tag key={tag}>{tag}</Tag>
                                )
                            })}
                            {inputVisible && (
                                <Input
                                    ref={this.saveInputRef}
                                    type="text"
                                    size="small"
                                    style={{ width: 78 }}
                                    value={inputValue}
                                    onChange={this.handleInputChange}
                                    onBlur={this.handleInputConfirm}
                                    onPressEnter={this.handleInputConfirm}
                                />
                            )}
                            {!inputVisible && (
                            <Tag
                                onClick={this.showInput}
                                style={{ background: '#fff', borderStyle: 'dashed' }}
                            >
                                <Icon type="plus" />
                            </Tag>
                            )}
                        </div>
                        <Divider
                            style={{
                                background: 'none',
                                borderTop: '1px dashed #e8e8e8'
                            }}
                        />
                        <div className="accountInfo__team">
                            <p>团队</p>
                            <p>......</p>
                        </div>
                    </div>
                </Card>
            </div>
        )
    }
}

export default Info