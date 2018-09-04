<template>
 <!-- 评论组件 -->
    <div class="comment-list">
        <!-- 如果数据才显示  -->
       <div class="page-title" v-if="comments.length">
           我的评论
       </div>
        <div class="comment" v-for="(comment,index) of comments" :key="index" 
        @click="handleClick(comment)">
            <div class="user">
                <div class="inline">
                    <img :src="comment.image" alt="" class="avatar" mode="aspectFit">
                   <span class="title"> {{comment.title}}</span>
                </div>
                <div class="right">
                    {{comment.location||'未知地理位置'}}
                    <span style="color:red">-------</span>
                    {{comment.phone||'未知型号'}}
                </div>
                <div class="content">
                    {{comment.comment}}
                </div>
            </div>
        </div> 
    </div>
</template>

<script>
export default {
    props:['comments','type'],
    methods:{
        handleClick(item){
            if(this.type === 'user'){
                 wx.navigateTo({
                    url:'/pages/detail/main?id='+item.bookid,
                  success(){
                   console.log('页面跳转成功')
                    }
                })
            }
        }
    }
  
}
</script>

<style lang="scss" scoped>
    .comment-list{
        background-color: #eee;
        font-size: 14px;
        margin-bottom: 10px;
        .page-title{
            width: 100%;
            line-height: 20px;
            text-align: center;
            font-size: 16px;
        }
        .comment{
            background-color: white;
            margin-bottom: 10px;
            padding: 5px;
            .content{
                margin: 10px 0;
            }
         .user{
             .inline{
                 display: inline;
                  .avatar{
               width: 30px;
                height: 30px;
                border-radius: 50%;
                
            }
            .title{
                vertical-align: top;
                color: red;
            }
           
             }
            .right{
                float: right;
                }
        
            }
        }
       
    }
</style>

