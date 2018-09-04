<template>
    <div class="yearProgress">
      <progress :percent="percent" :activeColor="activeColor" />
      <p>{{year}}已经过去了{{days}}天，{{percent}}%</p>
    </div>
</template>

<script>
export default {
    data(){
        return {
            activeColor:'#EA5A49'
        }
    },
    methods:{
        isLeapYear(){
            let year=new Date().getFullYear();
            if(year%400 ===0){
                return true;
            }else if(year%4===0&&year%100!=0){
                return true;
            }else{
                return false;
            }
        },
        getDayOfYead(){
            return this.isLeapYear()?366:365
        }
    },
    computed:{
        year(){
            return new Date().getFullYear()
        },
        days(){
            // 创建时间对象 然后往 里面添加内容
            let start=new Date();
            // 设置月 
            start.setMonth(0);
            // 设置天
            start.setDate(1);
            //  今天的时间搓  减去今年第一天的时间锉
          let offset=new Date().getTime()-start.getTime();
          return parseInt((offset/1000/60/60/24))+1;
        },
        percent(){
            return (this.days*100/this.getDayOfYead()).toFixed(1)
        }
    }
}
</script>

<style lang="scss" scoped>
    .yearProgress{
        width: 100%;
        text-align: center;
    }
</style>
