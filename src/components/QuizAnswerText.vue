<template>
  <div class="quiz__bottom-panel">
    <input
      v-model="answer"
      type="text"
      class="quiz__answer--text"
      :class="showWarning && 'quiz__answer--warning'"
      :name="question.value"
    >
    <button
      class="quiz__button--primary quiz__button--action"
      @click.prevent="submitAnswer"
    >
      Next
    </button>
  </div>
</template>

<script>
export default {
  props: {
    goToNextStep: {
      type: Function,
      required: true,
    },
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
    submitAnswer() {
      if (this.answer) {
        return this.goToNextStep({
          [this.question.id]: this.answer,
        });
      }
      return this.wasSubmitted = true;
    },
  },
};
</script>
