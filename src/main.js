import Vue from 'vue';
import axios from 'axios';
import apiKey from '@/config';
import store from './store';
import router from './router';
import App from './App.vue';
import 'fomantic-ui-css/semantic.min.css';

Vue.config.productionTip = false;
axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT;
axios.defaults.params = { apiKey: '' };
axios.defaults.params.apiKey = apiKey;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
