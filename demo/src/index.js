//第三方依赖库
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore , applyMiddleware, compose } from 'redux';
import thunk  from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter,Route,Link , Redirect, Switch} from 'react-router-dom';


//
import reducers from './reducer'
import './axios-config'
import registerServiceWorker from './registerServiceWorker';

//路由组件
import Authroute from "./components/authroute/authroute"; // 路由拦截跳转
import Login from './container/login/login'             //登录
import Register from './container/register/register'    //注册
import BossInfo from './container/bossinfo/bossinfo'    //boss完善信息
import GeniusInfo from './container/geniusinfo/geniusinfo' //牛人完善信息
import Chat from './components/chat/chat' //聊天

import Dashboard from './components/dashboard/dashboard'

//数据中心 provider 包裹整体传入子组件  
const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension():f=>f
))




ReactDOM.render(
    (<Provider store={store}>
        <BrowserRouter>
            <div>
                <Authroute />
                {/*swith 匹配路由 匹配成功则不往下渲染*/}
                <Switch>
                    <Route path="/bossinfo" component={BossInfo}></Route>
                    <Route path="/geniusInfo" component={GeniusInfo}></Route>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/register" component={Register}></Route>
                    <Route path="/chat/:user" component={Chat}></Route>
                    <Route component={Dashboard}></Route>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
);

//本地缓存资源...  仅开发环境有用
registerServiceWorker();
