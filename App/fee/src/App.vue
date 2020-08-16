<template>
  <div>
      <input-val @compare="getResult"></input-val>
      <results v-if="resultField" :price="price" :nights="nights" :breakfast="breakfast"></results>
  </div>
</template>

<script>
import InputVal from './components/InputVal';
import Results from './components/Results';
export default {
  name: 'App',
  components: {
    InputVal,
    Results,
  },
  data() {
    return {
      resultField: false,
      price: '',
      nights: 1,
      breakfast: 1,
    }
  },
  methods: {
    getResult(data) {
      if (data) {
        this.price = data.price;
        this.nights = data.nights;
        this.breakfast = data.breakfast;
      }
      this.resultField = true;
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
html, body {
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
