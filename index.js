// 小肥牛扫码点餐项目API子系统
const PORT = 8090;
const express = require('express');
const categroyRouter = require('./routes/admin/category');
const adminRouter = require('./routes/admin/admin');
const cors = require('cors')
const bodyParser = require('body-parser');


//创建HTTP应用服务器
var app = express();
app.listen(PORT,()=>{
    console.log('Server Listening....'+PORT);
})
//跨域 
app.use(cors({
    origin:["http://127.0.0.1:5500","http://localhost:5500"],
    credentials:true
}))
//app.use(bodyParser.urlencoded())//把application/格式的请求主体数据解析出来放入req.body 属性
app.use(bodyParser.json())//把json格式的请求主体数据解析出来放入req.body 属性
//挂载路由器
app.use('/admin/category',categroyRouter);
app.use('/admin',adminRouter)
