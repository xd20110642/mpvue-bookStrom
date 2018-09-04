<template>
    <div class="book">
        <!-- 轮播组件 -->
        <div class="sw">
             <sw
            :tops="tops"
        ></sw>
        </div>
       
        <!-- 图片卡片组件 -->
        <bookcard  v-for="(item,index) of books" :key="index"
            :book="item"
        ></bookcard>
        <p class="text-footer" v-show="!more">
            没有更多数据了
        </p>
    </div>
</template>

<script>
/**
 * 分页原理
 * 35条数据
 * 每次加载10条
 * 1页 0-10
 * 2页 11-20
 * 
 * page 当前第几页 x10 比如是第1页 那么久获取到10条数据
 * 
 * 没有更多的
 * 1.page=0;   不能显示这条提示
 * 2.page>0;    数据长度小于 10,停止触底
 * 
 */



import config from '../../utils/config.js';
import bookcard from '@/components/bookCard/bookcar.vue'
import sw from '@/components/sw/sw.vue'
export default {
    data(){
        return{
            books:[],
            page:0,
            more:true,
            tops:[]
        }
    },
    methods:{
        getList(init){//请求图书列表  init初始化状态  判断是不是第一页 是不是第一次加载
        // 初始状态
        if(init){
            this.page=0;
            this.more=true; 
        }
        // 请求状态
            wx.showNavigationBarLoading();
            this.$http.get(config.host+'/weapp/booklist',{page:this.page}).then((result) => {
                // 如果是初始状态 没有变量就默认false
                if(init){
                 this.books=result.data.data.list;
                }else{
                    // 下拉刷新，不能直接覆盖books，而是累加  拼接数组
                    this.books=this.books.concat(result.data.data.list)
                }
            //   这里是判断不需要分页  因为一页展示5个数据  你的数据都小于了
            // 5个 那么肯定就不需要分页啊   然后就显示 没有更多数据了
              if(result.data.data.list.length<5 && this.page>0){
                  this.more=false
              }
                // 关闭请求状态
                wx.hideNavigationBarLoading()
            }).catch((err) => {
                console.warn(err);
            });
        },
        getTop(){
            this.$http.get(config.host+'/weapp/top').then((result) => {
                console.log(result)
                this.tops=result.data.data.list
            }).catch((err) => {
                
            });
        }
    },
    created() {
         this.getTop()
    },
    
   onShow() {
        this.getList(true);
        this.getTop()
    },
    // 小程序 下拉触发事件
    onPullDownRefresh(){
        console.log("下拉事件触发成功");
        this.getList(true);
        this.getTop()
    },
    // 上拉触底事件
    onReachBottom(){
        // 如果没有更多了 就不触发改事件了
        if(!this.more){
        
            return false;
        }
        // 下一页
        this.page=this.page+1;
        // 没有传入参数默认 没有
        this.getList()
        console.log("上拉事件触发成功")
    }
    ,
    components:{
        bookcard,
        sw
    },
 
}
</script>

<style lang="scss" scoped>

    .book-item{
        background: #ffffff;
    }
    .sw{
        margin-top: 5px;
    }
</style>
