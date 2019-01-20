# Search 组件：

组件内引用的 antd 组件如下：

Form,  
Button,  
Col,  
Row,  
Spin,  
Input,  
Select,  
DatePicker,  
Cascader


## 使用
``` html
<SearchComponent
  isModal
  footer
  confg={}
  addOpts={}
  onSearch={}
  onClear={}
  onCancel={}
/>
```
| 参数 | 说明  | 必填 | 类型 |
| :------: | ------ | :------: | :------: |
| isModal | 在modal框中使用时添加 | N | boolean |
| config | 组件配置 | Y | array |
| addOpts | 选择框异步更新的数据 | N | array |
| onSearch | 点击查询的回调 | Y | function |
| onClear | 点击重置的回调 | N | function |
| onCancel | 点击取消的回调 | N | function |
| okText | 确定按钮文字（isModal下有效） | N | string |
| cancelText | 取消按钮文字（isModal下有效） | N | string |
| footer | isModal下是否显示按钮 | N | boolean |
| column | 一行排列个数，isModal为true时有效，尽量是2的整数倍 | N | number |

建议：  
如果在modal框中使用该组件，请添加 isModal ，  
开启 isModal后 search 提供 “确定”，“取消” 按钮 ，需要用footer开启  
还需隐藏Modal的按钮，设置 footer={ null } ，  
可使用 okText ，cancelText 来配置确定取消按钮文字，  
添加 onCancel 方法实现取消modal的效果。

## config
``` javascript
const config = [{
  name: '',
  key: '',
  type: 'input',
  placeholder: '请输入内容'
}, {
  name: '',
  key: '',
  type: 'inputPureNumber',
  placeholder: '只能输入纯数字'
}, {
  name: '',
  key: '',
  type: 'inputNumber',
  placeholder: '请输入数量或价格'
}, {
  name: '',
  key: '',
  type: 'select',
  placeholder: '请选择内容',
  opts: [{
    text: '广州',
    value: '001'
  }]
}, {
  name: '',
  key: '',
  type: 'selectInput',
  placeholder: '输入内容后异步返回结果，结果可选择',
  opts: []  // 数据需要异步可先设为空
}, {
  name: '',
  key: '',
  type: 'cascader',
  placeholder: '请选择内容',
  opts: [{
    value: '1',
    label: 'Zhejiang',
    children: [{
      value: '2',
      label: 'Hangzhou',
      children: [{
        value: '3',
        label: 'West Lake'
      }]
    }]
  }]
}, {
  name: '',
  key: '',
  type: 'datePicker',
  placeholder: '请选择日期'
}, {
  name: '',
  key: '',
  type: 'rangePicker',
  placeholder: ['开始', '结束']
}]
```

| 参数 | 说明 | 必填 | 类型 |
| :------: | ------ | :------: | :------: |
| name | FormItem的label值 | Y | string |
| key | 组件的key值 | Y | string |
| type | 组件的类型 | Y | string |
| placeholder | 组件提示占位符（rangePicker传array） | N | string / array |
| opts | 选择框的选项 | N | array |
| decoratorOpts | getFieldDecorator的options | N | obj |
| disabled | 禁用 | N | bool |


### type
| 参数 | 说明 |
| :------: | ------ |
| 'input' | 输入框 |
| 'inputPureNumber' | 数字输入框（只能输数字） |
| 'inputNumber' | 数字输入框（适用于输入数量 / 价格） |
| 'select' | 选择框 |
| 'selectInput' | 输入 + 选择 + 远程数据 |
| 'cascader' | 联立选框 |
| 'datePicker' | 时间选框 |
| 'rangePicker' | 时间选框，可选开始结束 |

注意：  
1. 当type为 select 或 cascader 时，opts 为必填。  
2. 如果 选择框 或 级联选择框 的数据需异步添加可使用addOpts方法。  
3. rules 在 modal 框使用时添加，在非modal框中添加样式排版会出问题。

## addOpts
``` javascript
let addOpts = [
  {
    key: 'city',
    opts: [{
      text: '广州',
      value: '001'
    }, {
      text: '北京',
      value: '002'
    }]
  }, {
    key: 'address',
    opts: [{
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [{
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [{
          value: 'xihu',
          label: 'West Lake'
        }]
      }]
    }]
  }
]
```
| 参数 | 说明 | 类型 |
| :------: | ------ | :------: |
| key | 组件的key值 | string |
| opts | 选择框option数据 | array |