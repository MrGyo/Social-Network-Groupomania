// Liste des imports
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueSweetalert2 from 'vue-sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/assets/css/main.css'
import 'sweetalert2/dist/sweetalert2.min.css';

// Utilisation des sweetalerts
Vue.use(VueSweetalert2);
// Configuration
Vue.config.productionTip = false

// constante permettant juste de modifier l'import dédié à axios si utilisation d'une autre dependancie
const API = {
  install(Vue) {
      Vue.prototype.$AJAX = axios;
  }
};
Vue.use(API);

// Import permettant d'accéder au fichier index.js du dossier mixin
import helper from './mixins';
Vue.mixin(helper);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
