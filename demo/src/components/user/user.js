import React from 'react'
import {connect} from 'react-redux'
import browserCookie from 'browser-cookies' //浏览器cookie

import { Result, WingBlank , WhiteSpace, List , Button ,Modal,Toast } from 'antd-mobile';
import {logoutSubmit} from '../../redux/user.redux'
import Redirect from 'react-router-dom/Redirect';

class User extends React.Component{
    constructor(props){
        super(props)
    }
    loginOut(){
        //browserCookie set()设置 get()获取 erase()清除
    
       const alert = Modal.alert
        
        alert('退出', '您确认退出登录吗???', [
          { text: '取消', onPress: () => console.log('cancel') },
          { text: '确定', onPress: () => {
                    browserCookie.erase('userid')
                    this.props.logoutSubmit()
                } 
            },
        ])
      
       
    }
    render(){
        const props = this.props
        return props.user?( 
            <WingBlank>
                <WhiteSpace />
                <Result
                    img={(<img src={require(`../../img/avatar/${props.avatar}.png`)} style={{width:60,height:60}} />)}
                    title={props.user}
                    message={
                        props.type=='boss'?
                            (<div>公司名称：{props.company}</div>)
                            :(<div>求职岗位：{props.title}</div>)
                        
                    }
                />
                <List renderHeader={() => '简介'} className="my-list">
                    <List.Item arrow="horizontal" multipleLine onClick={() => {}}>
                        {props.type==='boss'?'招聘：':'求职：'}{props.title}
                        {props.desc.split('\n').map(v=>(
                            <List.Item.Brief key={v}>{v}</List.Item.Brief>
                        ))}

                         <List.Item.Brief >{props.money?`薪资：${props.money}`:null}</List.Item.Brief>
                    </List.Item>
                </List>
                <WhiteSpace />
                <Button type='primary' onClick={()=>{this.loginOut()}}>退出登录</Button>
            </WingBlank>
        ):<Redirect to={props.redirectTo} />
    }
}
// @修饰器报错。 所以直接用 connect 函数 

User = connect(state=>state.user,{logoutSubmit})(User)
export default User