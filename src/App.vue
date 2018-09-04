<script>
import {showText} from './utils/index.js'
import config from './utils/config.js'
import qcloud from 'wafer2-client-sdk'
export default {
  created () {
  console.log("小程序启动")
  }
}
</script>

<style lang='scss'>
 image{
            width: 33.333%;
            height:250rpx;
        }
// 定义全局样式
.btn{
  color: white;
  background: #EA5A49;
  margin-bottom: 10px;
  padding-left: 15px;
  padding-right: 15px;
  font-size: 16px;
  line-height: 40px;
  border-radius: 2px;
  width: 100%;
  height: 40px;
  &:active{
    background: black; 
  }
}
.text-footer{
  color: red;
  text-align: center;
  margin-bottom: 5px;
}

</style>
