<template>
    <div class="comments">
      <Comment
      v-if="openid"
        :type="'user'"
      :comments="comments"
      ></Comment>
    <div v-if="openid">
        <div class="page-title">
            我的图书
        </div>
        <bookcard
        v-for="(book,index) of books"
        :key="index"
        :book="book"
        ></bookcard>
        <div v-if="!books.length">
            暂时还没有添加图书，快去添加几本吧！
        </div>
    </div>



    </div>
</template>

<script>
import config from '../../utils/config.js'
import Comment from '@/components/comment/comment.vue'
import bookcard from '../../components/bookCard/bookcar.vue'
export default {
    data(){
      return {
           comments:[],
             openid:'',
             show:true,
             books:[]
      }
    },
    methods:{
        getComments(){
            this.$http.get(config.host+'/weapp/commentlist',{
                openid:this.openid
            }).then((result) => {
                this.comments=result.data.data.list
                console.log(this.comments)
            }).catch((err) => {
                console.warn(err)
            });
        },
        getBooks(){
            this.$http.get(config.host+'/weapp/booklist',{
                openid:this.openid
            }).then((result) => {
                 this.books=result.data.data.list;
                 console.log("我是书的数据")
                console.log(this.books)
            }).catch((err) => {
                console.log(err)
            });
        }

        ,
        init(){ 
            wx.showNavigationBarLoading()
            this.getComments();
            this.getBooks();
            wx.hideNavigationBarLoading();
        }
    },
    components:{
        Comment,
        bookcard
    },
    onShow() {
    //   如果没有的话 那么就读取本地缓存里面的
       if(!this.openid){
            const userinfo=wx.getStorageSync('userinfo');
            console.log(userinfo)
            if(userinfo){
                 this.openid=userinfo.openId;
                 this.show=true;
                 this.init()
            }
       }else{
           this.show=!this.show
       }
    },
    onPullDownRefresh(){
        this.init()
        console.log("下来刷新触发");
        // 停止下拉刷新
        wx.stopPullDownRefresh()
    }
}
</script>

<style lang="scss" scoped>
.page-title{
    width: 100%;
    text-align: center;
    color: red;
}
</style>
