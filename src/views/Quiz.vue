<template>
  <div class="quiz">
    <QuizStart v-if="step === 0" />
    <form v-else-if="areQuestionsVisible">
      <QuizQuestion
        v-for="question in questions"
        :key="question.id"
      />
    </form>
    <QuizResult v-else :result="result" />
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
      step: 1,
      questions: [],
      result: { // for test
        name: 'Morty',
        img: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg',
      },
    };
  },

  computed: {
    areQuestionsVisible() {
      return this.step <= this.questions.length;
    },
  },

};
</script>
