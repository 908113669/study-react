import axios from 'axios';
import { Toast } from 'antd-mobile'

//拦截器 用来统一请求响应操作 例如 loding
axios.interceptors.request.use(function(config){
    Toast.loading('loading....',0)
    return config
})

axios.interceptors.response.use(function(config){
    Toast.hide()
    return config
})