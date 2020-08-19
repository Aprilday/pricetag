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
        <van-row v-if="couponVal > 0 || couponVal === 0">
            <van-col span="8">优惠券</van-col>
            <van-col span="8">{{ couponVal }}</van-col>
            <van-col span="8">0</van-col>
        </van-row>
        <van-row>
            <van-col span="8">会员卡</van-col>
            <van-col span="8">{{ curMemberCardPrice }}</van-col>
            <van-col span="8">0</van-col>
        </van-row>
        <van-row>
            <van-col span="8">合计</van-col>
            <van-col span="8" class="number-important">{{ memberTotal }}</van-col>
            <van-col span="8">{{ normalTotal }}</van-col>
        </van-row>
        <van-row>
            <van-col span="8">差价</van-col>
            <van-col span="16" class="number-warning">{{ pricedifference }}</van-col>
        </van-row>
        <van-row class="tip">入住享受华住会会员积分</van-row>
  </div>
</template>

<script>
import NP from 'number-precision';
// GOLD_CARD, SILVER_CARD,
import { BREAKFAST_PRICE, MEMBER_CARD_PRICE, MEMBER_CARD_DISCOUNT, MEMBER_CARD_BREAKFAST_NUM } from '@/constants';
export default {
  props: [
    'priceList',
    'breakfast',
    'cardType',
    'couponVal',
  ],
  computed: {
      // 会员总房价
      memPrice() {
          return this.priceList.reduce((pre, next) => {
              return NP.plus(pre, NP.times(next.price, MEMBER_CARD_DISCOUNT[this.cardType]));
          }, 0);
      },
      // 非会员总房价
      normalPrice() {
          return this.priceList.reduce((pre, next) => {
              return NP.plus(pre, next.price);
          }, 0);
      },
      // 会员早餐总价
      memBreakfastTotalPrice() {
          if (this.breakfast === 0) {
              return 0;
          }
          return NP.times(BREAKFAST_PRICE, this.breakfast - MEMBER_CARD_BREAKFAST_NUM[this.cardType], this.priceList.length);
      },
      // 非会员早餐总价
      normalBreakfastTotalPrice() {
          return NP.times(BREAKFAST_PRICE, this.breakfast, this.priceList.length);
      },
      // 会员总价
      memberTotal() {
          return NP.minus(NP.plus(this.memPrice, this.memBreakfastTotalPrice, this.curMemberCardPrice), this.couponVal);
      },
      // 非会员总价
      normalTotal() {
          return NP.plus(this.normalPrice, this.normalBreakfastTotalPrice);
      },
      // 当前选择的会员卡的价格
      curMemberCardPrice() {
          return MEMBER_CARD_PRICE[this.cardType];
      },
      // 会员和非会员的差价
      pricedifference() {
          return NP.minus(this.memberTotal, this.normalTotal);
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
    padding 0 15px 30px
    .van-col
        height 50px
        &:last-child
            font-size 16px
            color #999
        &.number-important
            font-size 18px
            color #000
        &.number-warning
            font-size 24px
            color #ff976a
    .tip
        color #999
        font-size 13px
</style>
