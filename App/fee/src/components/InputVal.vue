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
      :value="item.price"
      label="当日房价"
      placeholder="请点此输入"
      @touchstart.native.stop="showKeyboard(index)"
    />
    <van-field label="早餐份数">
      <template #input>
        <van-stepper v-model="breakfast" />
      </template>
    </van-field>
    <van-number-keyboard
      :show="show"
      extra-key="."
      close-button-text="完成"
      @blur="show = false"
      @input="onInput"
      @delete="onDelete"
    />
    <div class="btn-wrap">
      <van-button :loading="loading" type="primary" block @click="compare">查询</van-button>
    </div>
  </div>
</template>

<script>
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
      breakfast: 1,
      loading: false,
    }
  },
  methods: {
    showKeyboard(index) {
      this.curPriceIndex = index;
      this.show = true;
    },
    addNight() {
      let initPrice = this.priceList[this.priceList.length - 1].price
      this.priceList.push(
        {
          price: initPrice,
        }
      );
    },
    minusNight() {
      this.priceList.splice(this.priceList.length - 1, 1);
    },
    onInput(val) {
      let price = this.priceList[this.curPriceIndex].price || '';
      this.priceList.splice(this.curPriceIndex, 1, {
        price: '' + price + val,
      })
    },
    onDelete() {
      let price = this.priceList[this.curPriceIndex].price;
      this.priceList.splice(this.curPriceIndex, 1, {
        price: price.substring(0, price.length - 1),
      })
    },
    compare() {
      if (!this.priceList.every(item => item.price)) {
        this.$toast.fail('请输入价格');
      }
      this.$emit('compare', {
        priceList: this.priceList,
        breakfast: this.breakfast,
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
.btn-wrap
  width 80%
  margin 20px auto
</style>
