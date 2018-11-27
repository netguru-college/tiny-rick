<template>
  <div class="quiz__container">
    <div
      class="quiz__image-box--result"
      :style="imageBoxStyle"
    />
    <div class="quiz__text-box">
      <header class="quiz__header">
        <h1 class="quiz__character-name">{{ result.name || 'You\'re one and only.' }}</h1>
        <h2>Find out which character from the series you are</h2>
      </header>
      <div class="quiz__bottom-panel">
        <button
          class=" quiz__button--primary quiz__button--action"
          @click="goToStart"
        >
          Start again
        </button>
        <router-link to="/">
          <button
            class="quiz__button--secondary quiz__button--action"
          >
            Back to home
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { DEFAULT_IMAGE_URL } from '@/constants';

export default {
  props: {
    result: {
      type: Object,
      required: true,
    },
    goToStart: {
      type: Function,
      required: true,
    },
  },

  computed: {
    imageBoxStyle() {
      return {
        backgroundImage: `url(${this.result.img || DEFAULT_IMAGE_URL})`
      };
    },
  },
};
</script>
