<template>
  <div class="quiz">
    <QuizStart
      v-if="step === 0"
      :startQuiz="startQuiz"
    />
    <form v-else-if="areQuestionsVisible">
      <QuizQuestion
        v-for="question in questions"
        :key="question.id"
      />
    </form>
    <QuizResult
      v-else
      :result="result"
      :goToStart="goToStart"
    />
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

  methods: {
    startQuiz() {
      this.step = 1;
    },
    goToStart() {
      this.step = 0;
      this.result = {
        name: '',
        img: '',
      };
    },
  },
};
</script>
