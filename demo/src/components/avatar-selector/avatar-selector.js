import React from 'react'
import PropTypes from 'prop-types' //属性类型


import { Grid ,List} from 'antd-mobile';

class AvatarSelector extends React.Component{

    //父组件传递进来的 props 类型
    static PropTypes = {
        selectAvatar:PropTypes.func.isRequired    //func：类型为方法  isRequired: 父组件prop必传
    }

    constructor(props){
        super(props)
        this.state={}
    }
    render(){
        const avatars = ['boy-1','boy-2','boy-3','girl-1','girl-2','girl-3'].map(
            v=>({icon:require(`../../img/avatar/${v}.png`),text:v})
        )
        const gridHead = this.state.icon
                           ? (<div>
                               <span>已选择头像</span>
                               <img src={this.state.icon} alt="avatar" style={{width:50,height:50}}/>
                           </div>)
                            : (<div>请选择头像</div>)
        return( 
            <div>
                <List renderHeader={()=>gridHead}></List>
                <Grid data={avatars} columnNum={3}
                    onClick={
                        el=>{
                            this.setState(el);
                            this.props.selectAvatar(el.text)
                        }
                    }
                />
            </div>
        )
    }
}
export default AvatarSelector;