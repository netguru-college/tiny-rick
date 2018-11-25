<template>
  <div class="quiz">
    <QuizStart
      v-if="step === 0"
      :start-quiz="startQuiz"
    />
    <QuizForm
      v-else-if="areQuestionsVisible"
      :step="step"
      :questions="questions"
      :go-to-next-step="goToNextStep"
    />
    <QuizResult
      v-else
      :result="result"
      :go-to-start="goToStart"
    />
  </div>
</template>

<script>
import QuizStart from '@/components/QuizStart';
import QuizForm from '@/components/QuizmForm';
import QuizResult from '@/components/QuizResult';
import { fetchQuestions } from '@/api';
import { QUESTIONS } from '@/constants';

export default {
  components: {
    QuizStart,
    QuizForm,
    QuizResult,
  },

  data() {
    return {
      step: 0,
      questions: QUESTIONS,
      result: {
        name: '',
        img: '',
      },
    };
  },

  computed: {
    areQuestionsVisible() {
      return this.step <= this.questions.length;
    },
  },

  methods: {
    // async loadQuestions() {
    //   try {
    //     const { questions } = await fetchQuestions();
    //     this.questions = questions || [];
    //   } catch (error) {
    //     this.questions = [];
    //     console.error(error);
    //   }
    // },

    startQuiz() {
      this.step = 1;
    },

    goToNextStep() {
      if (this.step < this.questions.length) {
        this.step += 1;
      } else {
        this.submitForm();
      }
    },

    goToStart() {
      this.step = 0;
      this.result = {
        name: '',
        img: '',
      };
    },

    submitForm() {
      console.log('submitForm');
    }
  },
};
</script>
