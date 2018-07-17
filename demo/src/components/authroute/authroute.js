import React from 'react'
import Axios from 'axios';
import {withRouter} from 'react-router-dom'
import {loadData} from '../../redux/user.redux'
import {connect} from 'react-redux'


@withRouter
@connect(
    null,
    {loadData}
)
class AuthRoute extends React.Component{
    constructor(props){
        super(props)
    }
    componentDidMount(){
        const publicList = ['/login','register']
        //获取当前路由地址
        const pathname = this.props.location.pathname
        
        if(publicList.indexOf(pathname)>-1){
            return null
        }
      
        //获取用户信息 检查登录状态 跳转路由
        Axios.get('/user/info')
            .then(res=>{
                if(res.status == 200){
                    if(res.data.code == 0){
                        //有登录情况下
                        this.props.loadData(res.data.data)
                    }else{
                        this.props.history.push('/login')
                    }
                    //console.log(res.data)
                }
            })
    }
    render(){
        return (
            <div></div>
        )
    }
}
export default AuthRoute