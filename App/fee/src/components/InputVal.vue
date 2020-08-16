<template>
  <div>
    <van-field label="入住间夜">
      <template #input>
        <van-stepper integer v-model="nights" @plus="addNight" @minus="minusNight" />
      </template>
    </van-field>
    <van-field
      v-for="(item, index) in priceList"
      :key="index"
      readonly
      clickable
      :value="item.price"
      label="今日房价"
      placeholder="请点此输入"
      @touchstart.native.stop="showKeyboard"
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
      <van-button :loading="loading" type="primary" block @click="compare">对比</van-button>
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
    showKeyboard() {
      this.show = true;
    },
    addNight() {
      this.priceList.push([
        {
          price: '',
        }
      ]);
    },
    minusNight() {
      console.log(this.nights);
      if (this.nights > 1) {
        this.priceList.splice(this.nights, 1);
      }
    },
    onInput(val) {
      this.price += '' + val;
    },
    onDelete() {
      this.price = this.price.substring(0, this.price.length - 1);
    },
    compare() {
      if (!this.price) {
        this.$toast.fail('请输入价格');
      }
      this.$emit('compare', {
        price: this.price,
        nights: this.nights,
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
