<template>
  <div class="quiz__container">
    <div class="quiz__image-box--form" />
    <div class="quiz__question-box">
      <div class="quiz__question-info">
        <h1 class="quiz__step">Question {{ step }}</h1>
        <slot name="wizard" />
        <span class="quiz__question">{{ question.value }}</span>
      </div>
      <component
        :is="answerType"
        :question="question"
        :go-to-next-step="goToNextStep"
      />
    </div>
  </div>
</template>

<script>
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
    step: {
      type: Number,
      required: true,
    },
    goToNextStep: {
      type: Function,
      required: true,
    },
  },

  computed: {
    answerType() {
      return this.question.type === 'text' ? QuizAnswerText : QuizAnswerSelect;
    },
  },
};
</script>
