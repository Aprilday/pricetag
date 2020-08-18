<template>
  <div>
    <van-field label="入住间夜">
      <template #input>
        <van-stepper integer v-model="nights" @plus="addNight" @minus="minusNight" :min="1"/>
      </template>
    </van-field>
    <van-field
      v-for="(item, index) in priceList"
      :key="index"
      readonly
      clickable
      clearable
      :value="item.price"
      label="当日房价"
      placeholder="请点此输入"
      @touchstart.native.stop="showKeyboard(index)"
    />
    <van-number-keyboard
      :show="show"
      extra-key="."
      close-button-text="完成"
      @blur="show = false"
      @input="onInput"
      @delete="onDelete"
    />
  </div>
</template>

<script>
// import { html2Img } from '@/utils/utils';
export default {
  props: {
    label: String
  },
  computed: {
    
  },
  data() {
    return {
      show: false,
      curPriceIndex: 0,
      priceList: [
        {
          price: '',
        }
      ],
      nights: 1,
      loading: false,
    }
  },
  methods: {
    showKeyboard(index) {
      this.curPriceIndex = index;
      this.show = true;
    },
    addNight() {
      // this.$emit('hideResult');
      let initPrice = this.priceList[this.priceList.length - 1].price
      this.priceList.push(
        {
          price: initPrice,
        }
      );
      this.$emit('getData', {
        priceList: this.priceList,
      });
    },
    minusNight() {
      // this.$emit('hideResult');
      this.priceList.splice(this.priceList.length - 1, 1);
      this.$emit('getData', {
        priceList: this.priceList,
      });
    },
    onInput(val) {
      // this.$emit('hideResult');
      let price = this.priceList[this.curPriceIndex].price || '';
      this.priceList.splice(this.curPriceIndex, 1, {
        price: '' + price + val,
      })
      this.$emit('getData', {
        priceList: this.priceList,
      });
      // this.$nextTick(() => {
      //   html2Img();
      // })
    },
    onDelete() {
      // this.$emit('hideResult');
      let price = this.priceList[this.curPriceIndex].price;
      this.priceList.splice(this.curPriceIndex, 1, {
        price: price.substring(0, price.length - 1),
      })
      this.$emit('getData', {
        priceList: this.priceList,
      });
    }
  }
}
</script>
