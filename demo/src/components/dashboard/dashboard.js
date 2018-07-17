import React from 'react';
import { connect } from 'react-redux'
import { Route, Switch} from 'react-router-dom';

//聊天  redux

import {getMsgList,sendMsg,recvMsg} from '../../redux/chat.redux'


import { NavBar, Icon } from 'antd-mobile';
import NavLinkBar from '../navlink/navlink'
import './dashboard.css'

//路由组件
import Boss from '../boss/boss'
import Genius from '../genius/genius'
import User from '../user/user'






class Msg extends React.Component{
    render(){
        return <div>Msg</div>
    }
}


class DashBoard extends React.Component{
   
    componentDidMount(){
        //已经获取到msg 则不重新请求
        if(!this.props.chat.chatmsg.length){
            this.props.getMsgList()
            this.props.recvMsg()
        }
    }

    render(){
        const user = this.props.user
       // console.log(this.props)
        const navList = [
            {path:'/boss',text:'牛人',icon:'genius',title:'牛人列表',component:Boss,hide:user.type=='genius'},
            {path:'/genius',text:'公司',icon:'boss',title:'公司列表',component:Genius,hide:user.type=='boss'},
            {path:'/msg',text:'消息',icon:'msg',title:'消息列表',component:Msg,},
            {path:'/me',text:'我',icon:'me',title:'个人中心',component:User,},
        ]
 
        const {pathname} = this.props.location
        return(
            <div>
                <header className="header">
                    <NavBar mode="dark" 
                         icon={<Icon type="left" />}
                         onLeftClick={() => console.log('onLeftClick')}
                    >
                        {navList.find(v=>v.path==pathname).title}
                    </NavBar>
                </header>
                <div className="stone-45"></div>
                <div className="container">
                    <Switch>
                        {navList.map(v=>(
                            <Route key={v.path} path={v.path} component={v.component}></Route>
                        ))}
                    </Switch>
                </div>
                <div className="stone-50"></div>
                <footer className="footer">
                    <NavLinkBar data={navList}></NavLinkBar>    
                </footer> 
            </div>
        )
    }
}

// @修饰器报错。 所以直接用 connect 函数 


DashBoard = connect(state=>state,{getMsgList,recvMsg})(DashBoard)
export default DashBoard