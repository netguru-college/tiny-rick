<template>
  <div v-if="isLoading">
    Loading
  </div>
  <div v-else>
    <header class="episode__header">
      <h1>Episode</h1>

      <router-link
        class="go-back-link"
        to="/"
      >
        <ArrowLeftIcon />
        Search results
      </router-link>
    </header>

    <div class="episode__content">
      <div class="episode__left-col">
        <EpisodeDetails
          :episode="episode.episode"
          :name="episode.name"
          :air-date="episode.air_date"
        />

        <h2>Characters</h2>

        <div class="characters-list">
          <CharacterItem
            v-for="character in visibleCharacters"
            :key="character.id"
            :character="character"
          />
        </div>

        <div class="link-container">
          <button
            class="primary-link is-big"
            @click="toggleAllCharacters"
          >
            {{ showAllCharacters ? 'Show less' : 'Show more' }}
          </button>
        </div>
      </div>

      <div class="episode__right-col">
        <h2>Comments</h2>

        <EpisodeComments
          :comments="comments"
          @postComment="postComment"
        />
      </div>
    </div>
  </div>
</template>

<script>
import EpisodeDetails from '@/components/EpisodeDetails';
import EpisodeComments from '@/components/EpisodeComments';
import CharacterItem from '@/components/CharacterItem';
import ArrowLeftIcon from '@/assets/icon-arrow-left.svg';
import { fetchEpisode, fetchCharacter } from '@/api';

const comments = [
  {
    author: 'Jon Snow',
    date: 'Tue Nov 20 2018 12:45:24 GMT+0100 (Central European Standard Time)',
    content: 'Lorem ipsum dolor sit amet',
  },
  {
    author: 'Emma Watson',
    date: 'Tue Nov 20 2018 12:46:30 GMT+0100 (Central European Standard Time)',
    content: 'Lorem ipsum dolor sit amet',
  },
];

export default {
  components: {
    EpisodeDetails,
    EpisodeComments,
    CharacterItem,
    ArrowLeftIcon,
  },

  props: {
    id: {
      type: [Number, String],
      required: true,
    },
  },

  data() {
    return {
      isLoading: true,
      episode: null,
      characters: [],
      showAllCharacters: false,
      comments,
    };
  },

  computed: {
    visibleCharacters() {
      return this.showAllCharacters
        ? this.characters
        : this.characters.slice(0, 5);
    },
  },

  mounted() {
    this.loadEpisode(this.id);
  },

  methods: {
    async loadEpisode(id) {
      try {
        this.episode = await fetchEpisode(id);
        this.isLoading = false;

        const characters = this.episode.characters.map(link =>
          link.replace('https://rickandmortyapi.com/api/character/', '')
        );

        await this.loadCharacters(characters);
      } catch (error) {
        this.isLoading = false;
        console.error(error);
      }
    },

    async loadCharacters(characters) {
      try {
        const allIds = characters.join(',');
        this.characters = await fetchCharacter(allIds);
      } catch (error) {
        console.error(error);
      }
    },

    toggleAllCharacters() {
      this.showAllCharacters = !this.showAllCharacters;
    },

    postComment(comment) {
      console.log('post!', comment);
    }
  },
};
</script>

<style scoped lang="scss">
  .episode {
    &__content {
      @media #{$tablet-up} {
        display: flex;
      }
    }

    &__left-col {
      @media #{$tablet-up} {
        width: 340px;
        margin-right: 20px;
      }
    }

    &__right-col {
      @media #{$tablet-up} {
        flex: 1;
      }
    }
  }
</style>
