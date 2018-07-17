
const  express = require('express')
const utils = require('utility') //MD5加密工具
const Router =  express.Router()
const model = require('./model')
const User = model.getModel('user') //user 数据模块
const Chat = model.getModel('chat')//聊天数据模块
const _filter = {'pwd':0,'__v':0} //过滤隐藏密码 和版本号

Router.get('/list',(req,res)=>{
    const { type } = req.query
    //第一个参数{}为空则 查找所有用户
    User.find({type},(err,data)=>{
        return res.json({code:0,data:data})
    })
})
//移除用户 x 数据 user:'x'  | {} 则为所有
/* Chat.remove({},(err,data)=>{
    if(err){
        console.log(err)
    }else{
        console.log(data)
    }
})
 */
//在MD5 基础上 加盐包裹MD5 两层加密
function md5Pwd(pwd){
    const slot = 'keres_king@1220X5245*&'
    return utils.md5(utils.md5(pwd+slot))
}


//注册
Router.post('/register',(req,res)=>{
    //获取客户端传过来的字段
    const {user,pwd,type} = req.body
    
    //查找某个用户
    User.findOne({user:user},(err,data)=>{
        //存在
        if(data){
            return res.json({code:1,msg:'用户名重复'})
        }else{
            const userModel = new User({user,type,pwd:md5Pwd(pwd)})
            userModel.save(function(e,d){
                if(e){
                    return res.json({code:1,msg:'服务端错误'})
                }
                const {user,type,_id} = d
                res.cookie('userid',_id)
                return res.json({code:0,data:{user,type,_id}})
            })
            //创建用户 -- 密码加密处理
           /*  User.create({user,type,pwd:md5Pwd(pwd)},(e,d)=>{
                if(e){
                    return res.json({code:1,msg:'服务端错误'})
                }else{
                    return res.json({code:0})
                }
            }) */
        }
    })
})


//登录
Router.post('/login',(req,res)=>{
    //获取客户端传过来的字段
    const {user,pwd} = req.body
    //查找某个用户 param :1 查询信息 2 需要隐藏的
    User.findOne({user,pwd:md5Pwd(pwd)},_filter,(err,data)=>{
        //不存在
        if(!data){
            return res.json({code:1,msg:'用户名或密码错误'})
        }else{
            res.cookie('userid',data._id)
            //如何有该用户 返回登录状态 code=0  并返回查询到的data到客户端
           return res.json({code:0,data:data})
        }
    })
})


//用户信息
Router.get('/info',function(req,res){
    //获取cookie
    const {userid} = req.cookies
    if(!userid){
        return res.json({code:1})
    }else{
        //根据数据库id 查找用户
        User.findOne({_id:userid},_filter,(err,data)=>{
            if(err){
                return res.json({code:1,msg:"服务端错误"})
            }
            if(data){
                return res.json({code:0,data:data})
            }
        })
    }
    //用code 来判断 登录的状态 0 登录  1未登录
})

//更新用户数据 补全详细信息
Router.post('/update',(req,res)=>{
    //获取客户端传过来cookie  查找
    const userid = req.cookies.userid
    if(!userid){
        return json.dumps({code:1})
    }
    //用户输入的信息
    const body = req.body
    User.findByIdAndUpdate(userid,body,function(err,doc){
        //合并obj 用户字段
        const data=Object.assign(
            {},{
                user:doc.user,
                type:doc.type
            },body
        )
        return res.json({code:0,data})
    })
})

//聊天 chat 模块
Router.get('/getmsglist',(req,res)=>{
    const user = req.cookies.user

    User.find({},function(err,userdoc){
        let users = {}
        userdoc.forEach(item => {
            users[item._id] = {name:item.user,avatar:item.avatar}
        });
        //$or 查询所有的 '$or':[{from:user,to:user}]
        Chat.find({'$or':[{from:user,to:user}]},function(err,doc){
            if(!err){
                return res.json({code:0,msgs:doc,users:users})
            }
        })
    })
})


module.exports = Router;