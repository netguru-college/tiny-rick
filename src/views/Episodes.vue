<template>
  <div
    v-infinite-scroll="loadEpisodes"
    infinite-scroll-disabled="isLoadingMoreDisabled"
    infinite-scroll-distance="100"
  >
    <h1 class="episodes-title">Episodes</h1>

    <div class="search">
      <SearchIcon class="search-icon" />
      <input
        class="search-input"
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
      class="infinite-loader"
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

<style scoped lang="scss">
.episodes-title {
  @media #{$tablet-up} {
    text-align: center;
  }
}

.search {
  display: flex;
  margin: 0 auto 30px;
  padding: 10px 0;
  align-items: center;
  border-bottom: 1px solid #fff;

  @media #{$tablet-up} {
    max-width: 340px;
  }
}

.search-icon {
  width: 24px;
  height: 24px;
}

.search-input {
  flex: 1;
  background: none;
  padding: 5px 15px;
  border: 0;
  color: #fff;
  outline: none;
  font-size: 16px;

  &::placeholder {
    color: currentColor;
    opacity: 0.7;
  }
}

.infinite-loader {
  text-align: center;
  margin: 30px 0;
}
</style>
