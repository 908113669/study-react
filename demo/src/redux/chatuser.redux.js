import Axios from 'axios'

const USER_LIST = 'USER_LIST'


//初始值
const initState = {
    userList:[]
}
//reduser 值 | 方法
export function chatuser(state=initState, action){
    switch (action.type){
        case USER_LIST:
            return {...state, userList:action.playload}
        default:
            return state
    }
}

//用户列表
function userList(data){
    return { type:USER_LIST,playload:data}
}


export function getUserList(type){
    return dispatch=>{
        Axios.get('/user/list?type='+type)
        .then(res=>{
            if(res.data.code==0) {
                dispatch(userList(res.data.data))
            }
        })
    }
}