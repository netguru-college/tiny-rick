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
import {
  fetchEpisode,
  fetchCharacter,
  fetchComments,
  postComment,
} from '@/api';

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
      comments: [],
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
          link.split('/').slice(-1)[0]
        );

        await this.loadCharacters(characters);
        await this.loadComments(id);
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

    async loadComments(episodeId) {
      try {
        const { results } = await fetchComments(episodeId);
        this.comments = results;
      } catch (error) {
        console.error(error);
      }
    },

    toggleAllCharacters() {
      this.showAllCharacters = !this.showAllCharacters;
    },

    async postComment(comment) {
      try {
        this.comments = [comment, ...this.comments];
        const newComment = await postComment(this.id, comment);
        this.$set(this.comments, 0, newComment); // lazy update
      } catch (error) {
        const [, comments] = this.comments;
        this.comments = comments;
        console.error(error);
      }
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
