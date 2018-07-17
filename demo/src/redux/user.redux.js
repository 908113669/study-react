import Axios from "axios";
import {getRedirectPath} from '../util/util'


const AUTH_SUCCESS = 'AUTH_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'
const LOGOUT = 'LOGOUT'

const initState={
    redirectTo:'',
    msg:"",
    user:"",
    type:"",
}
//reducer
export function user(state=initState,action){
    switch(action.type){
        case AUTH_SUCCESS:
            return {...state,msg:'',redirectTo:getRedirectPath(action.payload),...action.payload} 
        case LOAD_DATA:
            return {...state,...action.payload}
        case ERROR_MSG:
            return {...state,isAuth:false,msg:action.msg}
        case LOGOUT:
            return {...initState,redirectTo:'/login'}
        default:
            return state
    }
}


//成功&失败
function authSuccess(obj){
    //过滤掉密码 不返回给客户端
    const {pwd,...data} = obj
    return {type:AUTH_SUCCESS,payload:data}
}

function errorMsg(msg){
    return {msg,type:ERROR_MSG}
}



//用户注册
export function register({user,pwd,repeatpwd,type}){
    if(!user||!pwd||!type){
        return errorMsg('请填写完整信息')
    }
    if(pwd!==repeatpwd){
        return errorMsg('两次密码不一致')
    }
    return dispatch=>{
        Axios.post('/user/register',{user,pwd,type})
            .then(res=>{
                if(res.status == 200&& res.data.code==0){
                    dispatch(authSuccess({user,pwd,type}))
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
   
};



//用户登录
export function login({user,pwd}){
    if(!user||!pwd){
        return errorMsg('请输入用户名和密码')
    }
   
    return dispatch=>{
        Axios.post('/user/login',{user,pwd})
            .then(res=>{
                if(res.status == 200 &&res.data.code===0 ){
                    dispatch(authSuccess(res.data.data))
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}

//用户信息
export function loadData(userinfo){
    return {type:LOAD_DATA,payload:userinfo}
}

//补全用户信息
export function update(data){
    return dispatch=>{
        Axios.post('/user/update',data)
            .then(res=>{
                if(res.status == 200 &&res.data.code===0 ){
                    dispatch(authSuccess(res.data.data))
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }
}

//退出登录

export function logoutSubmit(){
    return { type:LOGOUT}
}