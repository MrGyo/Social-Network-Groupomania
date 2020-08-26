import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueSweetalert2 from 'vue-sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/assets/css/main.css'
import 'sweetalert2/dist/sweetalert2.min.css';
 
Vue.use(VueSweetalert2);

Vue.config.productionTip = false

// constante permettante de switcher d'axios à autre en utilisant dans le code $AJAX
const API = {
  install(Vue) {
      Vue.prototype.$AJAX = axios;
  }
};
Vue.use(API);

import helper from './mixins';
Vue.mixin(helper);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
