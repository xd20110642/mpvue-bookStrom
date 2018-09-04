<template>
    <div class="bookinfo">
        <div class="thumb">
             <img :src="info.image" 
             class="back"
             mode="aspectFill"
             alt="">
             <img :src="info.image" alt="" class="img"
             mode="aspectFit">
             <div class="info">
                 <div class="title">
                     {{info.title}}
                 </div>
                 <div class="author">
                     {{info.author}}
                 </div>
             </div>
        </div>
        <div class="detail">
            <img :src="userinfo.image" alt="" class="avatar" mode="aspectFit">
           {{userinfo.name}}
            <div class="right text-price">
                {{info.rate}}分
                <!-- 评分组件 -->
                <start
                :rate="info.rate"
                >

                </start>
            </div>
        </div>
        <div class="detail">
            {{info.publisher}}
            <div class="right">
                {{info.price}}
            </div>
        </div>
        <div class="tags">
            <div class="badge" v-for="(tag,index) of info.tags" :key="index">
                {{tag}}
            </div>  
        </div>
        <div class="summary">
            <p v-for="(sum,numBer) in info.summary" :key="numBer">{{sum}}</p>
        </div>
    </div>
</template>
 
<script>
import start from "../start/start.vue"
export default {
    props:['info'],

    computed:{
        userinfo(){
            return this.info.user_info||{}
        }
    },
    components:{
        start
    },
    onShareAppMessage(res){
        if(res.from==="menu"){
             return {
         title: '123',
        path: '/page/user?id=123'
        }
        }
   
    }

}
</script>

<style lang="scss" scoped>
    .bookinfo{
        font-size: 14px;
        .right{
            float:right;
        }
        .text-price{
            color: red;
        }
        .badge{
            display: inline-block;
            margin: 5px;
            border-radius: 10px;
            border: 1px solid #EA5A49;
            padding: 5px;
            color: red;
        }
        .summary{
            margin-top: 10px;
            padding: 0 15px;
            p{
                text-indent: 2em;
                font-size: 14px;
            }
        }
        .detail{
            padding: 5px 10px;
            .avatar{
                width: 20px;
                height: 20px;
                border-radius: 50%;
                vertical-align: middle;
            }
        }
        .thumb{
            widows: 750rpx;
            height: 500rpx;
            overflow: hidden;
            position: relative;
           .back{
               filter: blur(15px);
               width: 100%;
               height: 100%;
           }
           .img{
                height: 300rpx;
               width: 100%;
               position: absolute;
               left: 0;
               top: 30rpx;
           }
           .info{
               color: white;
               position: absolute;
               width: 100%;
               left: 0;
               top: 350rpx;
               text-align: center;
               .title{
                   font-size: 14px;
               }
               .author{
                   font-size: 12px;
               }
           }
        }
        
    }
</style>
