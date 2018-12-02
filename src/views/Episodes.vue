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

    <div
      v-if="errorMessage"
      class="episodes__error"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import EpisodesList from '@/components/EpisodesList';
import EpisodeItem from '@/components/EpisodeItem';
import SearchIcon from '@/assets/icon-search.svg';
import debounce from 'lodash.debounce';

export default {
  components: {
    EpisodesList,
    EpisodeItem,
    SearchIcon,
  },

  computed: {
    ...mapState('episodes', [
      'episodes',
      'errorMessage',
    ]),

    ...mapGetters('episodes', [
      'isInitiallyLoading',
      'isLoadingMoreDisabled'
    ])
  },

  mounted() {
    this.loadEpisodes();
  },

  methods: {
    ...mapActions('episodes', [
      'loadEpisodes',
      'doSearch'
    ]),

    search: debounce(async function(text) {
      this.doSearch(text)
    }, 300)
  }
};
</script>
