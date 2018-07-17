const express = require('express')
const bodyParser = require('body-parser') //express 中间件 ，请求进行拦截和解析body类容类型。
const cookieParser = require('cookie-parser') //处理cookie
const userRouter = require('./user')
const http = require('http');
const model = require('./model')
const Chat = model.getModel('chat')//聊天数据模块

//定义express 启动http server  建立socket
const app  = express()
const server = http.createServer(app)
const io = require('socket.io').listen(server)


//监听
io.on('connection',function(socket){
    
    console.log('user login-----')
    // 监听当前socket 前端 emit 的 sendmsg  
    socket.on('sendmsg',function(data){
        console.log('user login-----')
        //获取消息详情 
        const {from,to,msg} = data
        //排序
        const chatid = [from,to].sort().join('_')
        //创建数据 然后广播全局
        Chat.create({chatid,from,to,content:msg},function(err,doc){
            io.emit('recvmsg',Object.assign({},doc._doc))
        })
        console.log(data)
        //io 广播全局 
        io.emit('recvmsg',data)
    })
})

app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user',userRouter)

server.listen(1000,()=>{
    console.log('app is listening 1000')
})