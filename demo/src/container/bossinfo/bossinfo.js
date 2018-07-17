import React from 'react';
import { NavBar, Icon ,InputItem,WhiteSpace ,WingBlank,TextareaItem ,Button} from 'antd-mobile';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom' //路由跳转

import {update} from '../../redux/user.redux'

import AvatarSelector from '../../components/avatar-selector/avatar-selector'

@connect(
    state=>state.user,
    {update}
)

class BossInfo extends React.Component{
    constructor(props){
        super(props)
        this.state={
            title:'',
            company:'',
            money:'',
            desc:'',
            avatar:'',
        }
    }
    handleChange(key,val){
        this.setState({
            [key]:val
        })
    }
    render(){
        const path =  this.props.location.pathname;
        const redirect = this.props.redirectTo;
        return(
            <div>
                  { redirect && redirect!==path?<Redirect to={this.props.redirectTo} />:null }
                <NavBar mode="dark">完善BOSS信息</NavBar>
                <WingBlank>
                    <AvatarSelector selectAvatar={(v)=>{this.setState({avatar:v})}}></AvatarSelector>
                    <WhiteSpace></WhiteSpace>
                    <InputItem onChange={(v)=>this.handleChange('title',v)}>
                        招聘职位
                    </InputItem>
                    <InputItem onChange={(v)=>this.handleChange('company',v)}>
                        公司名称
                    </InputItem>
                    <InputItem onChange={(v)=>this.handleChange('money',v)}>
                        职位薪资
                    </InputItem>
                    <TextareaItem 
                    onChange={(v)=>this.handleChange('desc',v)}
                    autoHeight
                    title="职位要求">

                    </TextareaItem>
                    <WhiteSpace></WhiteSpace>
                    <Button 
                    onClick={()=>{this.props.update(this.state)}}
                        type="primary">
                        保存
                    </Button>
                </WingBlank>
            </div>
        )
    }
}
export default BossInfo;