import Vue from 'vue'
import App from './App.vue'
import { NumberKeyboard, Field, Button, Toast, Cell, CellGroup, Stepper, Col, Row } from 'vant';

Vue.use(NumberKeyboard);
Vue.use(Field);
Vue.use(Button);
Vue.use(Toast);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Stepper);
Vue.use(Col);
Vue.use(Row);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
