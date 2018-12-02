import { fetchEpisodes } from '@/api';

export default {
  namespaced: true,
  state: {
    isLoading: true,
    currentPage: 0,
    info: {},
    episodes: [],
    searchText: '',
    errorMessage: '',
  },

  getters: {
    isInitiallyLoading: ({ isLoading, currentPage }) => 
      isLoading && currentPage === 1,

    isLoadingMoreDisabled: ({ isLoading, currentPage, info }) =>
      isLoading || currentPage >= info.pages
  },

  mutations: {
    setAllEpisodes(state, episodes = []) {
      state.episodes = [...state.episodes, ...episodes];
    },

    removeAllEpisodes(state) {
      state.episodes = [];
    },

    setCurrentPage(state, currentPage = 0) {
      state.currentPage = currentPage;
    },

    setErrorMessage(state, errorMessage = '') {
      state.errorMessage = errorMessage;
    },

    setInfo(state, info = { pages: 0 }) {
      state.info = info;
    },

    setIsLoading(state, value) {
      state.isLoading = value;
    },

    setSearchText(state, searchText) {
      state.searchText = searchText;
    }
  },

  actions: {
    async loadEpisodes({ state, commit }) {
      const { currentPage, searchText } = state;
      const newPage = currentPage + 1;

      try {
        commit('setCurrentPage', newPage);
        const { info, results, error } = await fetchEpisodes({ page: newPage, name: searchText });

        commit('setInfo', info);
        commit('setIsLoading', false);
        commit('setAllEpisodes', results);
        commit('setErrorMessage', error);
      } catch (err) {
        commit('setIsLoading', false);
        throw new Error(err);
      }
    },

    doSearch({ commit, dispatch }, searchText) {
      commit('setSearchText', searchText);
      commit('setCurrentPage');
      commit('removeAllEpisodes');

      dispatch('loadEpisodes');
    }
  },
};
