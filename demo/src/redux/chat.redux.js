import Axios from "axios";
import io from 'socket.io-client'
const socket = io('ws://localhost:1000')

//获取聊天列表
const MSG_LIST = 'MSG_LIST'
//读取消息
const MSG_RECV = 'MSG_RECV'
//已读状态
const MSG_READ = 'MSG_READ'

const initState = {
    chatmsg:[],
    users:{},
    unread:0
}

export function chat(state=initState,action){
    switch(action.type){
        case MSG_LIST:
            return {...state,users:action.playload.users,chatmsg:action.playload.msgs,unread:action.playload.msgs.filter(v=>!v.read&&v.to==action.playload.userid).length}
        case MSG_RECV:
            const n = action.playload.to == action.userid?1:0
            return {...state,chatmsg:[...state.chatmsg,action.playload],unread:state.unread+n}
        /* case MSG_READ:
            return */
            default:
            return state 
    }
}




//监听消息
function msgRecv(msg,userid){
    return {userid,type:MSG_RECV,playload:msg}
}

export function recvMsg(){
    return (dispatch,getState)=>{
        socket.on('recvmsg',function(data){
            //console.log('recvmsg',data)
            const userid = getState().user._id
            dispatch(msgRecv(data,userid))
        })
    }
}
//获取消息列表
function msgList(msgs,users,userid){
    return {type:MSG_LIST,playload:{msgs,users,userid}}
}

export function getMsgList(){
    return (dispatch,getState)=>{
        Axios.get('/user/getmsglist')
            .then(res=>{
                if(res.status == 200 && res.data.code == 0){
                    const userid = getState().user._id
                    dispatch(msgList(res.data.msgs,res.data.users,userid))
                }
            })
    }
}
//发送消息
export function sendMsg({from ,to ,msg}){
    return dispatch=>{
        socket.emit('sendmsg',{from ,to ,msg})
    }
}