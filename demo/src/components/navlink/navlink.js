import React from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import { TabBar } from 'antd-mobile';


@withRouter
//绑定路由信息到props
class NavLinkBar extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            selectedTab:''
        }
    }
    //props 的类型
    static propTypes ={
        data:PropTypes.array.isRequired
    }
    render(){
       /*  区分boss  和genius 隐藏对应权限 */
        const navList = this.props.data.filter(v=>!v.hide)
      
        const {pathname} = this.props.location
        return (
            <div>
                <TabBar
                    unselectedTintColor="#949494"
                    tintColor="#33A3F4"
                    barTintColor="white"
                    hidden={this.props.data.hidden}
                    > 
                    {navList.map(item=>(
                        <TabBar.Item
                            title={item.title}
                            key={item.title}

                            icon={{uri: require(`./img/${item.icon}.png`)}}
                            selectedIcon={{uri: require(`./img/${item.icon}-active.png`)}}
                          
                            selected={pathname === item.path}
                            badge={item.path=='/msg'?this.props.unread:''}
                            onPress={()=>{this.props.history.push(item.path)}}
                            data-seed="logId"
                        >
                          
                        </TabBar.Item>
                    ))}
                   
                </TabBar>
            </div>
        )
    }
}

NavLinkBar = connect(state=>state.chat)(NavLinkBar)
export default NavLinkBar