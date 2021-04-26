import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import formatParams from 'jquery-param';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    searchResults: [],
    movieDetails: {},
    isLoading: false,
    snackbarData: {
      isVisible: false,
      text: 'An error occured...',
      type: 'error',
    },
  },
  mutations: {
    setSearchResults(state, value) {
      state.searchResults = value;
    },
    setMovieDetails(state, value) {
      state.movieDetails = value;
    },
    setIsLoading(state, value) {
      state.isLoading = value;
    },
    setSnackbarData(state, value) {
      state.snackbarData = value;
    },
  },
  actions: {
    fetchMovieData({ commit }, params) {
      commit('setIsLoading', true);

      return axios.get(`?${formatParams(params)}`)
        .then(({ data }) => {
          if (data.Search) {
            commit('setSearchResults', data);
          } else if (data.Error) {
            const snackbar = {
              isVisible: true,
              text: data.Error,
              type: 'error',
            };

            commit('setSnackbarData', snackbar);
          } else {
            commit('setMovieDetails', data);
          }
        })
        .finally(() => {
          commit('setIsLoading', false);
        });
    },
    showSnackbar({ commit }, text, type) {
      const params = {
        isVisible: true,
        text,
        type,
      };

      commit('setSnackbarData', params);
    },
  },
  modules: {
  },
});
