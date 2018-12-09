import { fetchEpisodes } from '@/api';

export default {
  namespaced: true,

  state: {
    isLoading: true,
    currentPage: 0,
    info: {},
    searchText: '',
    isDone: false,
    episodes: [],
  },

  getters: {
    isInitiallyLoading(state) {
      return state.isLoading && state.currentPage === 1;
    },

    isLoadingMoreDisabled(state) {
      return state.isLoading || state.isDone;
    },
  },

  mutations: {
    incrementPage(state) {
      state.currentPage += 1;
    },

    setIsLoading(state, value) {
      state.isLoading = value;
    },

    setIsDone(state, value) {
      state.isDone = value;
    },

    pushEpisodes(state, episodes) {
      state.episodes = [...state.episodes, ...episodes]
    },

    setSearchText(state, text) {
      state.searchText = text;
    },

    setCurrentPage(state, page) {
      state.currentPage = page;
    },

    setEpisodes(state, episodes) {
      state.episodes = episodes;
    }
  },

  actions: {
    async loadEpisodes({ commit, state }) {
      commit('incrementPage');

      try {
        const { info, results } = await fetchEpisodes({
          page: state.currentPage,
          name: state.searchText,
        });

        commit('setIsLoading', false)

        if (info.pages === state.currentPage) {
          commit('setIsDone', true);
        }

        commit('pushEpisodes', results)
      } catch (error) {
        commit('setIsLoading', false)
        console.error(error);
      }
    },

    async searchEpisode({ commit, dispatch }, text) {
      commit('setSearchText', text);
      commit('setCurrentPage', 0);
      commit('setEpisodes', []);

      await dispatch('loadEpisodes');
    }
  },
};
