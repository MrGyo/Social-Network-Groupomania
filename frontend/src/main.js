import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.min.css'
import '@/assets/css/main.css'

Vue.config.productionTip = false


// constante permettante de switcher d'axios à autre en utilisant dans le code $AJAX
const API = {
  install(Vue) {
      Vue.prototype.$AJAX = axios;
  }
};
Vue.use(API);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
