<template>
  <div class="quiz">
    <QuizStart v-if="step === 0" />
    <form v-else-if="areQuestionsVisible">
      <QuizQuestion
        v-for="question in questions"
        :key="question.id"
      />
    </form>
    <QuizResult v-else />
  </div>
</template>

<script>
import QuizStart from '../components/QuizStart';
import QuizQuestion from '../components/QuizQuestion';
import QuizResult from '../components/QuizResult';

export default {
  components: {
    QuizStart,
    QuizQuestion,
    QuizResult,
  },

  data() {
    return {
      step: 0,
      questions: [],
    };
  },

  computed: {
    areQuestionsVisible() {
      return this.step <= this.questions.length;
    },
  },

};
</script>
