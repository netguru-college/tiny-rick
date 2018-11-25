<template>
  <form class="quiz__form">
    <QuizQuestion
      :question="questions[step]"
      :step="step"
      :questionsLength="questions.length"
      :go-to-next-step="goToNextStep"
    />
  </form>
</template>

<script>
import QuizQuestion from '@/components/QuizQuestion';

export default {
  components: {
    QuizQuestion,
  },

  props: {
    questions: {
      type: Array,
      default: () => [],
    },
    step: {
      type: Number,
      required: true,
    },
    goToNextStep: {
      type: Function,
      required: true,
    }
  },
}
</script>
