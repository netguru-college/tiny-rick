<template>
  <div v-if="episode">
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
          <transition-group
            name="fade-up"
            appear
          >
            <CharacterItem
              v-for="character in visibleCharacters"
              :key="character.id"
              :character="character"
            />
          </transition-group>
        </div>

        <transition name="fade-up">
          <div
            v-if="visibleCharacters.length"
            class="link-container"
          >
            <button
              class="primary-link is-big"
              @click="toggleAllCharacters"
            >
              {{ showAllCharacters ? 'Show less' : 'Show more' }}
            </button>
          </div>
        </transition>
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
        const newComment = await postComment(this.id, comment);
        this.comments = [newComment, ...this.comments];
      } catch (error) {
        const [, comments] = this.comments;
        this.comments = comments;
        console.error(error);
      }
    }
  },
};
</script>
