(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{626:function(n,e,t){},642:function(n,e,t){"use strict";t.r(e);t(294);var o=t(297),r=t.n(o),p=t(29),s=t(30),i=t(33),a=t(31),c=t(32),l=t(1),u=t.n(l),m=(t(626),function(n){function e(){return Object(p.a)(this,e),Object(i.a)(this,Object(a.a)(e).apply(this,arguments))}return Object(c.a)(e,n),Object(s.a)(e,[{key:"render",value:function(){return u.a.createElement("div",{className:"communicate"},u.a.createElement(r.a,{title:"\u7236 \u2192 \u5b50"},u.a.createElement("p",null,"React\u6570\u636e\u6d41\u52a8\u662f\u5355\u5411\u7684,\u7236\u7ec4\u4ef6\u5411\u5b50\u7ec4\u4ef6\u901a\u4fe1\u4e5f\u662f\u6700\u5e38\u89c1\u7684;\u7236\u7ec4\u4ef6\u901a\u8fc7props\u5411\u5b50\u7ec4\u4ef6\u4f20\u9012\u9700\u8981\u7684\u4fe1\u606f"),u.a.createElement("pre",null,u.a.createElement("code",null,"\u5b50\u7ec4\u4ef6\uff1a\nimport React from 'react';\nimport PropTypes from 'prop-types';\n\nexport default function Child({ name }) {\n    return <h1>Hello, {name}</h1>;\n}\n\nChild.propTypes = {\n    name: PropTypes.string.isRequired,\n};\n\n\u7236\u7ec4\u4ef6\uff1a\nimport React from 'react';\nimport PropTypes from 'prop-types';\n\nexport default function Child({ name }) {\n    return <h1>Hello, {name}</h1>;\n}\n\nChild.propTypes = {\n    name: PropTypes.string.isRequired,\n};\n"))),u.a.createElement(r.a,{title:"\u5b50 \u2192 \u7236"},u.a.createElement("p",null,"\u5229\u7528\u56de\u8c03\u51fd\u6570"),u.a.createElement("pre",null,u.a.createElement("cord",null,"\n\u5b50\u7ec4\u4ef6\nimport React, { Component } from 'react';\nimport PropTypes from 'prop-types';\n\nclass List3 extends Component {\n    static propTypes = {\n        hideConponent: PropTypes.func.isRequired,\n    }\n    render() {\n        return (\n            <div>\n                \u54c8\u54c8,\u6211\u662fList3\n                <button onClick={this.props.hideConponent}>\u9690\u85cfList3\u7ec4\u4ef6</button>\n            </div>\n        );\n    }\n}\n\nexport default List3;\n\n\u7236\u7ec4\u4ef6\nimport React, { Component } from 'react';\n\nimport List3 from './components/List3';\nexport default class App extends Component {\n    constructor(...args) {\n        super(...args);\n        this.state = {\n            isShowList3: false,\n        };\n    }\n    showConponent = () => {\n        this.setState({\n            isShowList3: true,\n        });\n    }\n    hideConponent = () => {\n        this.setState({\n            isShowList3: false,\n        });\n    }\n    render() {\n        return (\n            <div>\n                <button onClick={this.showConponent}>\u663e\u793aLists\u7ec4\u4ef6</button>\n                {\n                    this.state.isShowList3 ?\n                        <List3 hideConponent={this.hideConponent} />\n                    :\n                    null\n                }\n\n            </div>\n        );\n    }\n}\n"))))}}]),e}(l.Component));e.default=m}}]);
//# sourceMappingURL=communicate.9c92a725.chunk.js.map