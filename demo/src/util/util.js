
//用户类型  判断是设置头像等信息 跳转对应路由完善信息
export function getRedirectPath({type,avatar}){
    let url = type==='boss'?'/boss':'/genius'
    if(!avatar){
        url+='info'
    }
    return url;
}

export function getChatId(userId,targetId){
    return [userId,targetId].sort().join('_')
}