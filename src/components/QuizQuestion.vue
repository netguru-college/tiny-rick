<template>
  <div class="quiz__container">
    <div class="quiz__image-box quiz__image-box--hideable" />
    <div class="quiz__question-box">
      <div class="quiz__question-info">
        <h1 class="quiz__step">Question {{ step }}</h1>
        <slot />
        <span class="quiz__question">{{ question.value }}</span>
      </div>
      <component
        :is="answerComponent"
        :question="question"
        @submitAnswer="submitAnswer"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import QuizAnswerSelect from './QuizAnswerSelect';
import QuizAnswerText from './QuizAnswerText';

export default {
  components: {
    QuizAnswerSelect,
    QuizAnswerText,
  },

  props: {
    question: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapState('quiz', [
      'step',
    ]),

    answerComponent() {
      return this.question.type === 'text' ? QuizAnswerText : QuizAnswerSelect;
    },
  },

  methods: {
    submitAnswer(answer) {
      if (answer) {
        this.$emit('submitAnswer', {
          [this.question.id]: answer,
        });
      }
    },
  },
};
</script>
