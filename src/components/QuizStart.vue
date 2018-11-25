<template>
  <div class="quiz__container">
    <div class="quiz__image-box--start" />
    <div class="quiz__text-box">
      <header class="quiz__header">
        <h1>Which character are you?</h1>
        <h2>Find out which character from the series you are</h2>
      </header>
      <div class="quiz__buttons">
        <button
          class="quiz__button--primary quiz__button--action"
          @click="startQuiz"
        >
          Start
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    startQuiz: {
      type: Function,
      required: true,
    },
  },
};
</script>
