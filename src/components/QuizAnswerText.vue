<template>
  <div class="quiz__bottom-panel">
    <input
      v-model="answer"
      type="text"
      class="quiz__answer quiz__answer--text"
      :class="{ 'quiz__answer--warning': showWarning }"
      :name="question.value"
    >
    <button
      class="quiz__button quiz__button--primary"
      @click.prevent="handleClick"
    >
      Next
    </button>
  </div>
</template>

<script>
export default {
  props: {
    question: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      answer: '',
      wasSubmitted: false,
    };
  },

  computed: {
    showWarning() {
      return !this.answer && this.wasSubmitted;
    },
  },

  methods: {
    handleClick() {
      if (this.answer) {
        return this.$emit('submitAnswer', this.answer);
      }
      return this.wasSubmitted = true;
    },
  },
};
</script>
