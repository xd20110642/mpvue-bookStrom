import Vue from 'vue'
import App from './App'
import MpvueRouterPatch from 'mpvue-router-patch'

Vue.use(MpvueRouterPatch)
var Fly=require('flyio/dist/npm/wx');
var fly=new Fly;

//添加拦截器
fly.interceptors.request.use((config,promise)=>{
    //给所有请求添加自定义header
    config.headers["X-Tag"]="flyio";
    return config;
})


Vue.prototype.$http=fly;

Vue.config.productionTip = false;
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
