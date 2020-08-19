<template>
  <div id="app">
      <van-field label="卡类型">
        <template #input>
          <van-radio-group v-model="cardType" direction="horizontal">
            <van-radio v-for="(item, index) in CARD_TYPE" :key="index" :name="item.val" checked-color="#07c160">{{ item.label }}</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <input-val @getData="getResult" @hideResult="hideResult"></input-val>
      <van-field label="早餐份数">
        <template #input>
          <van-stepper v-model="breakfast" :min="0"/>
        </template>
      </van-field>
      <van-field
        readonly
        clickable
        label="优惠券金额"
        :value="couponVal"
        placeholder="选择优惠券金额"
        @click="couponField = true"
      />
      <div class="btn-wrap">
        <van-button type="primary" block @click="compare">查询</van-button>
      </div>
      <results v-if="resultField" :cardType="cardType" :priceList="priceList" :breakfast="breakfast" :couponVal="couponVal"></results>
      <van-popup v-model="couponField" round position="bottom">
        <van-picker
          show-toolbar
          :columns="COUPONS"
          @cancel="couponField = false"
          @confirm="couponConfirm"
        />
      </van-popup>
  </div>
</template>

<script>
import InputVal from './components/InputVal';
import Results from './components/Results';
import { GOLD_CARD, SILVER_CARD, COUPONS } from '@/constants';
// import { html2Img } from '@/utils/utils';
export default {
  name: 'App',
  components: {
    InputVal,
    Results,
  },
  data() {
    return {
      CARD_TYPE: [
        {
          label: '金卡',
          val: GOLD_CARD,
        },
        {
          label: '银卡',
          val: SILVER_CARD,
        }
      ],
      COUPONS,
      cardType: GOLD_CARD,
      resultField: false,
      couponField: false,
      couponVal: '',
      priceList: [
        {
          price: '',
        }
      ],
      breakfast: 1,
    }
  },
  methods: {
    getResult(data) {
      // setTimeout(() => {
      //   html2Img();
      // })
      if (data) {
        this.priceList = data.priceList;
      }
    },
    couponConfirm(val) {
      this.couponVal = val;
      this.couponField = false;
    },
    compare() {
      if (!this.priceList.every(item => item.price)) {
        this.$toast.fail('请输入价格');
        return;
      }
      this.resultField = true;
    },
    hideResult() {
      if (this.resultField) {
        this.resultField = false;
      }
    }
  }
}
</script>

<style lang="stylus">
* {
  margin: 0;
  padding: 0;
}
html, body {
  height: 100%;
}
#app
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  img
    width 100%
.btn-wrap
  width 80%
  margin 20px auto
</style>
