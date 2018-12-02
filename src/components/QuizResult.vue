<template>
  <div class="quiz__container">
    <img
      class="quiz__image-box quiz__image-box--fixed"
      :src="imageUrl"
    >
    <div class="quiz__text-box">
      <header class="quiz__header">
        <h1 class="quiz__character-name">{{ result.name || 'You\'re one and only.' }}</h1>
        <h2>Find out which character from the series you are</h2>
      </header>
      <div class="quiz__bottom-panel">
        <button
          class="quiz__button quiz__button--primary"
          @click="resetForm"
        >
          Start again
        </button>
        <router-link to="/">
          <button
            class="quiz__button quiz__button--secondary"
          >
            Back to home
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { DEFAULT_IMAGE_URL } from '@/constants';

export default {
  computed: {
    ...mapState([
      'result',
    ]),

    imageUrl() {
      return this.result.img || DEFAULT_IMAGE_URL;
    },
  },

  methods: {
    ...mapMutations([
      'resetForm',
    ]),
  },
};
</script>
