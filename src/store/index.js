import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import formatParams from 'jquery-param';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    searchResults: {
      items: [],
      headers: [],
    },
    movieDetails: {},
    isLoading: false,
    isErrored: false,
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
    setIsErrored(state, value) {
      state.isErrored = value;
    },
    setSnackbarData(state, value) {
      state.snackbarData = value;
    },
  },
  actions: {
    fetchMovieData({ commit }, params) {
      commit('setIsLoading', true);
      commit('setIsErrored', false);

      return axios.get(`?${formatParams(params)}`)
        .then(({ data }) => {
          if (data.Search) {
            const searchResults = {
              items: data.Search,
              headers: Object.keys(data.Search[0]).filter((h) => h !== 'imdbID'),
            };

            commit('setSearchResults', searchResults);
          } else if (data.Error) {
            const snackbar = {
              isVisible: true,
              text: data.Error,
              type: 'error',
            };

            commit('setIsErrored', true);
            commit('setSearchResults', []);
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
