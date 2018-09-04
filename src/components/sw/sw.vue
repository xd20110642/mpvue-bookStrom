<template>
    <div class="sw">
       <swiper :indicator-dots="indicatorDots"
        :autoplay="autoplay" :interval="interval" :duration="duration" :circular="circular">
        <!-- 这里解析出 3个数组里面的第一个   -->
            <block v-for="(item,index) of imgUrls" :key="index">                
                    <swiper-item>
                        <!-- 图片里面解析三个数组 -->
                    <image :src="img.image"
                    class="slide-image"
                    v-for="(img,INdex) in item"
                    :key="INdex"
                    @click="bookDetail(img)"
                    mod="aspectFill"
                    />
                    <!-- img是书籍的详情 -->
                    </swiper-item>
                    
            </block>
     </swiper>       
    </div>
</template>

<script>
export default {
    props:['tops'],
    data(){
        return{
              autoplay:true,
              interval:5000,
              indicatorDots:true,
              duration:500,
              circular:true
        }
    },
    computed:{
        // 分割数组  3*3  如果需要通用使用 chunk函数  比如lodash的chunk方法
        imgUrls(){
            let res=this.tops;
            console.log(res)
            return [res.slice(0,3),res.slice(3,6),res.slice(6)]
        }
    },
  mounted() {
      console.log(123)
      console.log(this.tops)
      console.log(this.imgUrls)
  },
  methods:{
      bookDetail(item){
          wx.navigateTo({
            url: '/pages/detail/main?id='+item.id,
            success(){
                console.log("跳转成功")
            }
        })
      }
  }
}
</script>

<style lang="scss" scoped>
 .swiper{
        margin-top: 5px;
       
    }
</style>
