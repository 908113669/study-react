import React from 'react'
import {Card,WhiteSpace,WingBlank} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types' //属性类型
@withRouter
//可以从redux 取 也可以父组件数据中心取了直接传进来
/* import {connect} from 'react-redux'
@connect(
    state=>state.chatuser
) */
class UserCard extends React.Component{
     //父组件传递进来的 props 类型
    static PropTypes = {
        selectAvatar:PropTypes.string.isRequired    //func：类型为方法  isRequired: 父组件prop必传
    }
    handleClick(v){
        this.props.history.push(`/chat/${v._id}`)
        console.log('to id:'+v._id)
    }
    render(){
        return(
            <div>
                <WingBlank>
                    <WhiteSpace />
                    {this.props.userList.map(v=>
                        v.avatar?(
                            <div key={v._id}
                                onClick={()=>this.handleClick(v)}
                            >
                                <WhiteSpace size="sm" />
                                <Card>
                                    <Card.Header
                                        title={v.user}
                                        thumb={
                                            (<div><img src={require(`../../img/avatar/${v.avatar}.png`)}  style={{width:40,height:40}}/></div>)
                                        
                                        }
                                        extra={`${v.type=='boss'?'招聘：':'求职：'}${v.title}`}
                                    >
                                    </Card.Header>
                                    <Card.Body>
                                        <div>
                                            {v.type=='boss'?(
                                                <div>
                                                    公司名称：{v.company}
                                                </div>):null
                                            }
                                        </div>
                                        <div>
                                            {v.type=='boss'?'岗位要求:':'个人简介:'}
                                           
                                            {v.desc.split('\n').map((t,index)=>(
                                                <div key={t+index} className="desc-list">{t}</div>
                                            ))}
                                        </div>
                                        <div>
                                            {v.type=='boss'?(
                                                <div>
                                                    岗位薪资：{v.money}
                                                </div>):null
                                            }
                                        </div>
                                    </Card.Body>
                                
                                {/*    <Card.Footer content="footer content" extra={<div>extra footer content</div>} /> */}
                                </Card>
                                
                            </div>
                        ):null
                    )}
                      <WhiteSpace />
                </WingBlank>
            </div>
        )
    }
}

export default UserCard