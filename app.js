var express=require('express')
var router=require('./router')
var bodyParser=require('body-parser')
var app=express()
app.use('/node_modules/',express.static('./node_modules/'))
app.use('/public/',express.static('./public/'))
app.engine('html', require('express-art-template'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}))
// parse application/json

app.use(bodyParser.json())

app.use(router)

app.listen(3000,function () {
  console.log('3000端口的服务器启动了！！！');
})