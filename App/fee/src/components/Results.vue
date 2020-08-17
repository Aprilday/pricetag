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
            <van-col span="8">{{ normalPrice }}</van-col>
        </van-row>
        <van-row>
            <van-col span="8">早餐总价</van-col>
            <van-col span="8">{{ memBreakfastTotalPrice }}</van-col>
            <van-col span="8">{{ normalBreakfastTotalPrice }}</van-col>
        </van-row>
        <van-row>
            <van-col span="8">延退</van-col>
            <van-col span="8" class="tip">可享2小时免费延退</van-col>
            <van-col span="8">50/小时</van-col>
        </van-row>
        <van-row>
            <van-col span="8">会员卡</van-col>
            <van-col span="8">{{ MEMBERCARD_PRICE }}</van-col>
            <van-col span="8">0</van-col>
        </van-row>
        <van-row>
            <van-col span="8">优惠券</van-col>
            <van-col span="8">首次可减{{ FIRST_COUPON }}</van-col>
            <van-col span="8">0</van-col>
        </van-row>
        <van-row>
            <van-col span="8">合计</van-col>
            <van-col span="8" class="number-warning">{{ memberTotal }}</van-col>
            <van-col span="8">{{ normalTotal }}</van-col>
        </van-row>
        <van-row class="tip">新会员可获取一张30元优惠券，首次既可使用</van-row>
  </div>
</template>

<script>
import NP from 'number-precision';
import { BREAKFAST_PRICE, MEMBERCARD_PRICE, FIRST_COUPON } from '@/constants';
export default {
  props: {
    priceList: Array,
    breakfast: Number,
  },
  computed: {
      memPrice() {
          return this.priceList.reduce((pre, next) => {
              return NP.plus(pre, NP.times(next.price, 0.88))
          }, 0);
      },
      normalPrice() {
          return this.priceList.reduce((pre, next) => {
              return NP.plus(pre, next.price);
          }, 0);
      },
      memBreakfastTotalPrice() {
          return NP.times(BREAKFAST_PRICE, this.breakfast - 1, this.priceList.length);
      },
      normalBreakfastTotalPrice() {
          return NP.times(BREAKFAST_PRICE, this.breakfast, this.priceList.length);
      },
      memberTotal() {
          return NP.minus(NP.plus(this.memPrice, this.memBreakfastTotalPrice, MEMBERCARD_PRICE), FIRST_COUPON);
      },
      normalTotal() {
          return NP.plus(this.normalPrice, this.normalBreakfastTotalPrice);
      },
  },
  data() {
    return {
        MEMBERCARD_PRICE,
        FIRST_COUPON,
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
    .tip
        color #999
        font-size 13px
</style>
