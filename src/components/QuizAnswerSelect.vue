<template>
  <div class="quiz__bottom-panel">
    <label
      v-for="answer in question.answers"
      :key="answer.id"
      class="quiz__button--primary quiz__button--answer"
    >
      <input
        v-model="selectedAnswer"
        type="radio"
        :name="question.value"
        :value="answer.value"
        @change="submitAnswer"
      >
      {{ answer.value }}
    </label>
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
      selectedAnswer: '',
    };
  },

  methods: {
    submitAnswer() {
      if (this.selectedAnswer) {
        this.goToNextStep({
          [this.question.id]: this.selectedAnswer,
        });
      }
    },
  },
};
</script>
