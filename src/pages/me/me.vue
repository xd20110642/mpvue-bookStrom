<template>
    <div class="me">
        <div class="userinfo">
            <img :src="userinfo.avatarUrl" alt="">
            <p>{{userinfo.nickName}}</p>
        </div>
    <div class="yearProgress">
         <yearProgress></yearProgress>
    </div>
       <!--判断是否存在id 如果存在那么久显示 允许用户操作 否者隐藏  -->
    <button v-if='userinfo.openId' @click='scanBook' class='btn'>添加图书</button>
    <button v-else open-type="getUserInfo" lang="zh_CN" class='btn' @getuserinfo="login">点击登录</button>
    </div>
</template>

<script>
import qcloud from 'wafer2-client-sdk'
import config from '../../utils/config.js'
import {showText,showModal} from '../../utils/index.js'
import yearProgress from '@/components/yearProgress/yearProgress.vue'
export default {
    data(){
        return {
            userinfo:{
                  avatarUrl: 'http://image.shengxinjing.cn/rate/unlogin.png',
                 nickName: '点击登陆'
            }
        }
    },
    methods:{
          addBook(isbn){//添加图书
            console.log(1)
            console.log(isbn)
            this.$http.post(config.host+'/weapp/addbook',{
                isbn,
                openid:this.userinfo.openId
            }).then((result) => {
               console.log(result);
               let code=result.data.code;
               if(code!=-1){
                    let title=result.data.data.title
               showModal('添加成功',title)
               }else{
                   let title=result.data.data.msg
                showModal('添加失败',title)
               }
              
            }).catch((err) => {
                console.log(err)
              
            });
        },
        scanBook(){ // 扫码
                wx.scanCode({
                    success: res =>{
                        if(res.result){
                          console.log(res.result);
                         this.addBook(res.result);
                        }
                    },
                    fail(res){
                        console.log(res)
                    }
                })
        },
        login(){//登陆
             qcloud.setLoginUrl(config.loginUrl);
            // 本地取值
            let user=wx.getStorageSync('userinfo');
            if(!user){
                qcloud.login({
              success: res => {
                console.log("登陆成功")
                showText("登陆成功")
                console.log(res);
                //  存入本地缓存
                 wx.setStorageSync('userinfo',res);
                 this.userinfo=res;
                             },
              fail: err => {
                  console.error(err);
                  showText(err)
                             }
                        })
                }      else{
                showText("欢迎回来")
                    }
            },
          
    },
    components:{
        yearProgress
    },
    onShow(){//页面加载的时候 可以多次调用  
   let userinfo=wx.getStorageSync('userinfo');
    if(userinfo){
        this.userinfo=userinfo;
    }
   
    }
}
</script>

<style lang="scss" scoped>
    .me{
        padding: 0 30rpx;
        .userinfo{
            margin-top: 100rpx;
            text-align: center;
            img{
                border: 1px solid #ccc;
                width: 150rpx;
                height: 150rpx;
                border-radius: 50%;
                margin: 20rpx;
            }
            
        }
        .yearProgress{
            margin: 50rpx auto;
        }
    }
</style>
