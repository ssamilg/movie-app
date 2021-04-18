import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import formatParams from 'jquery-param';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    search(_, params) {
      return axios.get(`${formatParams(params)}`);
    },
  },
  modules: {
  },
});
