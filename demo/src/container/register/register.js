import React from 'react'
import Logo from '../../components/logo/logo'
import {List, InputItem, WingBlank, WhiteSpace, Button,Radio } from 'antd-mobile'
import { connect } from 'react-redux';
import { register } from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'
import './register.css'

@connect(
    state=>state.user,
    {register}
)

class Register extends React.Component{
    constructor(props){
        super(props)
        this.state={
            user:'',
            pwd:'',
            repeatpwd:'',
            type:'boss'
        }
        this.handldeRegister = this.handldeRegister.bind(this)
    }
    handldeChange(key,val){
        this.setState({
            [key]:val
        })
    }
    handldeRegister(){
        this.props.register(this.state)
    }
    render(){
        const RadioItem = Radio.RadioItem
        return(
            <div>
                {this.props.redirectTo?<Redirect to={this.props.redirectTo} />:null}
                <Logo />
                <WingBlank>
                    <List>
                        <InputItem onChange={v=>this.handldeChange('user',v)} placeholder="请输入您的用户名">用户名</InputItem>
                        <WhiteSpace />
                        <InputItem type="password" onChange={v=>this.handldeChange('pwd',v)} placeholder="请输入您的密码">密码</InputItem>
                        <WhiteSpace />
                        <InputItem type="password" onChange={v=>this.handldeChange('repeatpwd',v)} placeholder="请再次输入您的密码">确认密码</InputItem>
                        <WhiteSpace />
                        <RadioItem checked={this.state.type =='genius'} onChange={()=>this.handldeChange('type','genius')}>牛人</RadioItem>
                        <RadioItem checked={this.state.type =='boss'} onChange={()=>this.handldeChange('type','boss')}>BOSS</RadioItem>
                        <WhiteSpace />
                    </List>
                        <WhiteSpace />
                        <p className="reg-tips">{this.props.msg?this.props.msg:null}</p>
                        <Button type="primary" onClick={this.handldeRegister}>注册</Button>
                    <WhiteSpace />
                </WingBlank>
            </div>
        )
    }
}
export default Register