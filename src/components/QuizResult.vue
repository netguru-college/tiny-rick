<template>
  <div class="quiz__container">
    <img
      class="quiz__image-box quiz__image-box--fixed"
      :src="characterImage"
    >
    <div class="quiz__text-box">
      <header class="quiz__header">
        <h1 class="quiz__character-name">{{ characterName }}</h1>
        <h2>Find out which character from the series you are</h2>
      </header>
      <div class="quiz__bottom-panel">
        <button
          class="quiz__button quiz__button--primary"
          @click="$emit('goToStart')"
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
export default {
  props: {
    characterName: {
      type: String,
      required: true,
    },
    characterImage: {
      type: String,
      required: true,
    },
  },
};
</script>
