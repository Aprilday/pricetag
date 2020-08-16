<template>
  <div class="res-wrap">
        <van-row>
            <van-col span="8"></van-col>
            <van-col span="8">会员</van-col>
            <van-col span="8">非会员</van-col>
        </van-row>
        <van-row>
            <van-col span="8">总房价</van-col>
            <van-col span="8">{{ memPrice }}</van-col>
            <van-col span="8">400</van-col>
        </van-row>
        <van-row>
            <van-col span="8">早餐总价</van-col>
            <van-col span="8">116</van-col>
            <van-col span="8">232</van-col>
        </van-row>
        <van-row>
            <van-col span="8">延退</van-col>
            <van-col span="8">-</van-col>
            <van-col span="8">0</van-col>
        </van-row>
        <van-row>
            <van-col span="8">会员卡</van-col>
            <van-col span="8">219</van-col>
            <van-col span="8">0</van-col>
        </van-row>
        <van-row>
            <van-col span="8">合计</van-col>
            <van-col span="8" class="number-warning">657</van-col>
            <van-col span="8">632</van-col>
        </van-row>
        <!-- 
        <van-cell-group>
            <van-cell title="会员" value="非会员" />
            <van-nav-bar title="总房价" />
            <van-cell title="322" value="400" />
            <van-nav-bar title="早餐总价" />
            <van-cell title="116" value="232" />
            <van-nav-bar title="延退" />
            <van-cell title="-" value="0" />
            <van-nav-bar title="会员卡" />
            <van-cell title="219" value="0" />
            <van-nav-bar title="合计" />
            <van-cell title="657" value="632">
                <template #title>
                    <div style="color:#ff976a;font-size: 17px;">657</div>
                </template>
                <template #default>
                    <div style="color:#aaa;font-size: 15px;">632</div>
                </template>
            </van-cell>
        </van-cell-group> -->
  </div>
</template>

<script>
import NP from 'number-precision';
export default {
  props: {
    price: String,
    nights: Number,
    breakfast: Number,
  },
  computed: {
      memPrice() {
          return NP.times(this.price, 0.88);
      }
  },
  data() {
    return {
      
    }
  },
  methods: {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.res-wrap
    padding 0 15px
    .van-col
        height 50px
        &:last-child
            font-size 16px
            color #999
        &.number-warning
            font-size 18px
            color #ff976a
</style>
