import React, { Component } from 'react'
import { Card } from 'antd'
import "./index.less"

let downCom = () => (
<pre>
<code>
{`子组件：
import React from 'react';
import PropTypes from 'prop-types';

export default function Child({ name }) {
    return <h1>Hello, {name}</h1>;
}

Child.propTypes = {
    name: PropTypes.string.isRequired,
};

父组件：
import React from 'react';
import PropTypes from 'prop-types';

export default function Child({ name }) {
    return <h1>Hello, {name}</h1>;
}

Child.propTypes = {
    name: PropTypes.string.isRequired,
};
`}
</code>
</pre>
)

let upCom = () => (
<pre>
<code>
{`
子组件
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class List3 extends Component {
    static propTypes = {
        hideConponent: PropTypes.func.isRequired,
    }
    render() {
        return (
            <div>
                哈哈,我是List3
                <button onClick={this.props.hideConponent}>隐藏List3组件</button>
            </div>
        );
    }
}

export default List3;

父组件
import React, { Component } from 'react';

import List3 from './components/List3';
export default class App extends Component {
    constructor(...args) {
        super(...args);
        this.state = {
            isShowList3: false,
        };
    }
    showConponent = () => {
        this.setState({
            isShowList3: true,
        });
    }
    hideConponent = () => {
        this.setState({
            isShowList3: false,
        });
    }
    render() {
        return (
            <div>
                <button onClick={this.showConponent}>显示Lists组件</button>
                {
                    this.state.isShowList3 ?
                        <List3 hideConponent={this.hideConponent} />
                    :
                    null
                }

            </div>
        );
    }
}
`}
</code>
</pre>
)

class Communicate extends Component {
    render () {
        return (
            <div className="communicate">
                <Card
                    title="父 → 子"
                >
                    <p>React数据流动是单向的,父组件向子组件通信也是最常见的;父组件通过props向子组件传递需要的信息</p>
                    {downCom()}
                </Card>
                <Card
                    title="子 → 父"
                >
                    <p>利用回调函数</p>
                    {upCom()}
                </Card>
            </div>
        )
    }
}

export default Communicate