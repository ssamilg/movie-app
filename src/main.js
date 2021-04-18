import Vue from 'vue';
import axios from 'axios';
import store from './store';
import router from './router';
import App from './App.vue';
import 'fomantic-ui-css/semantic.min.css';

Vue.config.productionTip = false;
axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
