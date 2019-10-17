import Vue from 'vue'
import VueAgile from 'vue-agile'
import App from './App.vue'
import store from './store'

Vue.use(VueAgile);

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
