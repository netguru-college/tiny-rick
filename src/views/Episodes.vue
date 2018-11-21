<template>
  <div
    v-infinite-scroll="loadEpisodes"
    infinite-scroll-disabled="isLoadingMoreDisabled"
    infinite-scroll-distance="100"
    class="episodes"
  >
    <h1 class="episodes__title">Episodes</h1>

    <div class="episodes__search">
      <SearchIcon />
      <input
        type="text"
        placeholder="Search"
        @input="search($event.target.value)"
      >
    </div>

    <EpisodesList
      :episodes="episodes"
      :is-loading="isInitiallyLoading"
    >
      <EpisodeItem
        slot-scope="{ episode }"
        :episode="episode.episode"
        :name="episode.name"
      />
    </EpisodesList>

    <div
      v-if="!isLoadingMoreDisabled"
      class="episodes__loader"
    >
      Loading more
    </div>
  </div>
</template>

<script>
import EpisodesList from '@/components/EpisodesList';
import EpisodeItem from '@/components/EpisodeItem';
import SearchIcon from '@/assets/icon-search.svg';
import { fetchEpisodes } from '@/api';
import debounce from 'lodash.debounce';

export default {
  components: {
    EpisodesList,
    EpisodeItem,
    SearchIcon,
  },

  data() {
    return {
      isLoading: true,
      currentPage: 0,
      info: {},
      episodes: [],
      searchText: '',
    };
  },

  computed: {
    isInitiallyLoading() {
      return this.isLoading && this.currentPage === 1;
    },

    isLoadingMoreDisabled() {
      return this.isLoading || this.currentPage >= this.info.pages;
    },
  },

  mounted() {
    this.loadEpisodes();
  },

  methods: {
    async loadEpisodes() {
      this.currentPage += 1;

      try {
        const { info, results } = await fetchEpisodes({ page: this.currentPage, name: this.searchText });
        this.isLoading = false;
        this.info = info;
        this.episodes = [...this.episodes, ...results];
      } catch (error) {
        this.isLoading = false;
        console.error(error);
      }
    },

    search: debounce(async function(text) {
      this.searchText = text;
      this.currentPage = 0;
      this.episodes = [];

      this.loadEpisodes();
    }, 300),
  }
};
</script>
