//引入express中间件
var express = require('express');
var app = express();

//ip 的插件
// const ip = require('ip')
const opn = require('opn')
// const IP = ip.address();
const PORT = 8000
//要安装npm install express ip opn --save-dev

//指定启动服务器到哪个文件夹，我这边指的是dist文件夹
app.use(express.static('./'));

// 监听端口为3322
var server = app.listen(PORT, function () {
    // var port = server.address().port;
    console.info('打开浏览器', 'http://localhost'+':'+PORT)
    opn('http://localhost:' + PORT)
});
// node dev-node-server.js