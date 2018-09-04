<template>
    <div class="start">
        <span> ☆☆☆☆☆</span>
        <div class="hollow" :style="style">
             ★★★★★
        </div>
        
    </div>
</template>

<script>
export default {
    props:{
        rate:{
            type:Number,
            default:'0'
        }
    },
    computed:{
        style(){
            let a=parseInt(this.rate);
            let b=Math.floor(a/2)-0.5;
            console.log(b)
            return `width:${b}em`
        }
    }

}
</script>

<style lang="scss" scoped>
    .start{
        position: relative;
        display: inline-block;
        .hollow{
            position: absolute;
            display: inline-block;
            top: 0;
            left: 0;
            width:0;
            overflow: hidden;
        }
    }
</style>

