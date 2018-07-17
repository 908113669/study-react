import React from 'react';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom' //路由跳转
import {List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import Logo from '../../components/logo/logo.js'
import {login} from '../../redux/user.redux'
import './login.css'


@connect(
    state=>state.user,
    {login}
)
class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            user:'',
            pwd:'',
        }
        this.register = this.register.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
    }
    register(){
        this.props.history.push('/register')
    }
    handleChange(key,val){
        this.setState({
            [key]:val
        })
    }
    handleLogin(){
        this.props.login(this.state)
    }
    render(){
        return(
            <div>
                {this.props.redirectTo?<Redirect to={this.props.redirectTo} />:null}
                <Logo />
                <div className="login-wrap">
                    <WingBlank>
                        <List>
                            <InputItem  onChange={v=>this.handleChange('user',v)} placeholder="请输入您的用户名">用户</InputItem>
                            <InputItem type="password" onChange={v=>this.handleChange('pwd',v)} placeholder="请输入您的密码">密码</InputItem>
                        </List>
                        <WhiteSpace />
                        <p className="login-tips">{this.props.msg?this.props.msg:null}</p>
                        <Button type="primary" onClick={this.handleLogin}>登录</Button>
                        <WhiteSpace />
                        <Button type="primary" onClick={this.register}>注册</Button>
                    </WingBlank>
                </div>
            </div>
        )
    }
}
export default Login