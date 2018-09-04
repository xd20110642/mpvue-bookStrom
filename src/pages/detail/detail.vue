<template>
    <div class="detail">
        <!-- 图书详情组件 -->
        <bookinfo
        :info='info'
        ></bookinfo>
        <!-- 评论组件 -->
        <Comment
        :comments="comments"
        ></Comment>
        <!-- 评论原生组件 -->
        <div class="comment" v-if="showAdd">
              <textarea placeholder="请输入图书短评" v-model="comment"
              :maxlength="100" class="textarea"
              />
                <div class="location">
            地理位置：
            <!-- 触发改变事件 如果有就选中 没有就不选中-->
           <switch color="#EA5A49" @change="getGeo" :checked="location"></switch>
           <span style="color:red;">{{location}}</span>
        </div>
        <div class="phone">
            手机型号：
            <switch color="#EA5A49" @change="getPhone" :checked="phone"></switch>
            <span class="color:red">{{phone}}</span>
        </div>
        <!-- 添加提交评论按钮 -->
        <button class="btn" @click="addComment">评论</button>
        </div>
        <div  v-else class="text-footer">
            未登陆或者已经评论过了
        </div>
        <button class="btn" open-type="share">点击转发给好友</button>
   
    </div>
</template>

<script>
import config from '../../utils/config.js'
import {showText,showModal} from "../../utils/index.js"
import bookinfo from '@/components/bookinfo/bookinfo.vue' 
import Comment from '@/components/comment/comment.vue'
export default {
    data(){
        return{
            id:'',
            book:null,
            info:{},
            maxlength:100,
            comment:'',
            location:'',
            phone:'',
            openid:'',
            comments:[]
        }
    },
    methods:{
        getDetail(){//获取数据详情
        this.$http.get(config.host+'/weapp/bookdetail',{
            id:this.id
        }).then((result) => {
                this.book=result.data.data;
                this.info=result.data.data;
                let title=this.book.title;
                  wx.setNavigationBarTitle({
                      title:`${title}`,
                         success(){
                                    }
                 })
        }).catch((err) => {
            console.warn("调用失败")
        });
        },
        getGeo(e){//获取地理位置
            const ak='UOUOtEy3oXNzZk6FijczHgOwsnGEOqGN';
            let url="http://api.map.baidu.com/geocoder/v2/";
            if(e.target.value){
                 wx.getLocation({
                  type: 'wgs84',
                  success:res =>{//必须用箭头函数来完成 否则会照成 this指向问题
                  let latitude = res.latitude;
                 let  longitude = res.longitude;
                this.$http.get(url,{
                    location:`${latitude},${longitude}`,
                    output:'json',
                    ak:ak
                }).then((result) => {
                    if(result.data.status===0){
                         let dili=result.data.result.addressComponent.city; 
                         this.location=dili
                    }else{
                        this.location="定位失败"
                    }
                   
                }).catch((err) => {
                    console.warn(err)
                });
                  }
                })
            }else{
                this.location=''
            }
           
        },
        getPhone(e){//获取手机信息
        if(e.target.value){ //判断是否选中
            console.log("我被选中了"+e.target.value)
             const res=wx.getSystemInfoSync();
            let type=res.model;
            this.phone=type;
            console.log(res)
        }else{
            this.phone=''
        }  
        },
        addComment(){//提交评论
            // 评论  手机信号 地理位置 图书id 用户id 
            // 判断评论内容不为空
            
            if(!this.comment){
               showModal('提示','内容不能为空');
               return;
            }
            const data={
                openid:this.openid,
                bookid:this.id,
                comment:this.comment,
                phone:this.phone||'未知设备',
                location:this.location||'未知地理位置',
            }
            this.$http.post(config.host+'/weapp/addcomment',data).then((result) => {
                console.log(result);
                this.comment='';
                // 提交表单
                this.getComments()
            }).catch((err) => {
                console.warn(err);
                showModal('失败',err.msg)
            });
            console.log(data)
        },
        getComments(){//获取评论
            this.$http.get(config.host+'/weapp/commentlist',{
                bookid:this.id
            }).then((result) => {
                this.comments=result.data.data.list;
                console.log(this.comments)
            }).catch((err) => {
                console.log(err)
            });
        }
    },
   mounted() {  
       this.id=this.$root.$mp.query.id;
       this.getDetail();
       this.getComments();
       console.log(this.showAdd)
      //获取用于id 从缓存里面读取
      const userinfo=wx.getStorageSync('userinfo');
      if(userinfo){
          this.openid=userinfo.openId;
      }
        
   },
   components:{
       bookinfo,
       Comment
   },
      computed:{
        showAdd(){//计算属性 判断是否显示框  没有登陆和评论过一次就不能评论了
        // 判断没有登陆
        if(!this.openid){
            return false;
        }
        // 判断是否发表过评论  js过滤方法  v就是我们的数组里面的第一个元素 然后读取数组里面的内容
        let a=this.comments.filter(v => v.openid==this.openid).length;
        console.warn(this.comments)
        if(a){
            return false;
        }
        return true;
        }
    },
    // 微信分享
    onShareAppMessage:res => {
        return {
      title: '自定义转发标题',
    }
    }
}
</script>

<style lang="scss" scoped>
.comment{
    margin-top: 10px;
   .textarea{
       width: 730rpx;
       height: 220rpx;
      background-color: #eeeeee;
      padding: 10px; 
   }
}
 .location{
       margin-top: 10px;
       padding: 5px 10px;

   }
   .phone{
       margin-top: 10px;
       padding: 5px 10px;

   }
   .text-footer{
       color: red;
   }
</style>

