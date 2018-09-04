<template>
    <div class="bookcar" @click="go">
        <!-- 这个是跳转到详情页 -->
      
        <div class="thumb" @click.stop="preview(book.image)">
            <img :src="book.image" class="imgage" mode="aspectFit">
        </div>
       <div class="detail">
           <div class="row">
               <div class="right">
                   <p class="title">{{book.title}}</p>
               </div>
                <div class="left">
                    {{book.rate}}
                    <start
                    :rate="book.rate"
                     ></start>
                </div>
           </div>

            <div class="row">
                 <div class="left">
                 {{book.author}}</p> 
                </div>
               <div class="right">
                    浏览量:{{book.count}}
               </div>
           </div>

            <div class="row">
                 <div class="left">
                   {{book.publisher}}
                </div> 
               <div class="right">
                   {{book.user_info.nickName}}
               </div>
           </div>
       </div>
    </div>
     
</template>

<script>
import start from '../start/start.vue'
export default {
    data(){
        return{
            url:'pages/detail/main?id='
        }
    },
    props:{
        book:{
            type:Object
        },
        tops:{

        }
    },
    methods:{
        go(){
            console.log(this.detaiUrl)
            wx.navigateTo({
                url:this.detaiUrl,
                  success(){
                   console.log('页面跳转成功')
               }
            })
       
        },
        preview(url){
            let arr=[url]
            wx.previewImage({
                urls:arr
            })
        }
    },
   components:{
       start
   },
   computed:{

       detaiUrl(){
            return '/pages/detail/main?id='+this.book.id
       }
   },
}
</script>

<style lang="scss" scoped>
    .bookcar{
        width: 100%;
        display: flex;
        // 主轴方向
    //    justify-content: space-between;
       padding: 5px;
       overflow: hidden;
       margin-bottom: 5px;
       margin-top: 5px;
       border-bottom: 1px solid #cccccc;

        .thumb{
            flex: 0 0 90px;
            height: 90px;   
            .imgage{
               width: 90px;
               height: 90px;
            }
        }
      .detail{
          flex: 0.95;
          
          .row{
              line-height: 20px;
              margin-bottom: 10px;
              display: flex;
              justify-content: space-between;
              font-size: 14px;
              &:last-child{
                  margin-bottom: 0;
              }
             
              .right{
                .title{
                    font-size: 16px;
                    line-height: 20px;
                    height: 20px;
                    color: red;
                }
              }
          }
      }  
    }
</style>

