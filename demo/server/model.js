const mongoose = require('mongoose')
//链接mongoDB  keres 集合
const DB_URL = 'mongodb://localhost:27017/keres'
mongoose.connect(DB_URL)


//定义数据模型
const models = {
    //用户模块 数据
    user:{
        'user':{'type':String,'require':true},
        'pwd':{'type':String,'require':true},
        //身份类型
        'type':{'type':String,'require':true},
        //图像
        'avatar':{'type':String,'require':true},
        //职位简介
        'desc':{'type':String,'require':true},
        //职位
        'title':{'type':String},
        //if user is Boss  公司名和薪资待遇
        'company':{'type':String},
        'money':{'type':String},
    },
    //聊天模块  数据
    chat:{
        'chatid':{'type':String,'require':true}, //id
        'from':{'type':String,'require':true}, //发送者
        'to':{'type':String,'require':true}, //接收者
        'read':{'type':Boolean,'default':false},    //是否已读
        'content':{'type':String,'require':true,default:''},//内容
        'create_time':{'type':Number,'default':new Date().getTime()} //发送时间
    }
}

//批量生成模块 导出
for(let m in models){
    mongoose.model(m,new mongoose.Schema(models[m]))
}
module.exports = {
    //通过key 获取对应的模块
    getModel:function(name){
        return mongoose.model(name)
    }
}
/* mongoose.connection.on('connected',function(){
    console.log('mongo connect success')
}) */