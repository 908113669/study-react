import React from 'react'
import {connect} from 'react-redux'
import {getMsgList,sendMsg,recvMsg} from '../../redux/chat.redux'
import {List,InputItem,NavBar, Icon} from 'antd-mobile'
import './chat.css'
import { getChatId } from '../../util/util';



//连接socket 后端server
/* import io from 'socket.io-client'
  const socket =  io('ws://localhost:1000') */


class Chat extends React.Component{
    constructor(props){
        super(props)
        this.state={
            text:'',
            msg:[]
        }
    }
    componentDidMount(){
        if(!this.props.chat.chatmsg.length){
            this.props.getMsgList()
            this.props.recvMsg()
        }
        //放入redux 处理
       /*  socket.on('recvmsg',(data)=>{
             this.setState({
                 msg:[...this.state.msg,data.text]
             })
         }) */
    }
    handleSubmit(){
      //  console.log(this.state.text)
       // socket.emit('sendmsg',{text:this.state.text})
       //发送方 接受方 消息
        const from = this.props.user._id;
        const to = this.props.match.params.user
        const msg = this.state.text

        this.props.sendMsg({from,to,msg})

        this.setState({text:''})
      
    }
    render(){
        const userid = this.props.match.params.user
        const users = this.props.chat.users
        if(!users[userid]){
            return null
        }
        const chatid = getChatId(userid,this.props.user._id)
        const chatmsgs = this.props.chat.chatmsg.filter(v=>v.chatid == chatid)
        return(
            <div>
                <NavBar mode="dark"
                    icon={<Icon type="left"/>}
                    onLeftClick={()=>{
                        this.props.history.goBack()
                    }}
                >
                    {users[userid].name}
                </NavBar>
                {
                    chatmsgs.map(v=>{
                        const avatar = require(`../../img/avatar/${users[v.from].avatar}.png`)
                        return  v.from == userid&&v.content!=null?(
                                <List>
                                    <List.Item className="you-msg"
                                        thumb={avatar}
                                    >
                                        <span >{v.content} </span>
                                    </List.Item>
                                </List>
                            ):(
                                <List>
                                    <List.Item  className="my-msg"
                                      
                                    >
                                        <span >{v.content} <img src={avatar}/></span>
                                    </List.Item>
                                </List>
                            )
                   
                    } )
                }
               
                <div className="stick-footer">
                    <List>
                        <InputItem
                            placeholder='请输入'
                            value={this.state.text}
                            onChange={v=>{
                                this.setState({text:v})
                            }}
                            extra = {(<span onClick={()=>this.handleSubmit()}>发送</span>)}
                        ></InputItem>
                    </List>    
                </div>
            </div>
        )
    }
}

Chat = connect(state=>state,{getMsgList,sendMsg,recvMsg})(Chat)
export default Chat