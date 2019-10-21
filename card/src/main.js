import Vue from 'vue'
import VueAgile from 'vue-agile'
import * as VueGoogleMaps from 'vue2-google-maps'
import Clipboard from 'v-clipboard'
import App from './App.vue'
import store from './store'

Vue.use(VueAgile);
Vue.use(Clipboard);
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyD1EUgIzLcg8vL_9acdI9G54M22kQ5YbXQ',
    libraries: 'places,drawing,visualization',
  },
});

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
