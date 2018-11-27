<template>
  <div class="quiz">
    <QuizStart
      v-if="step === 0"
      :go-to-next-step="goToNextStep"
    />
    <form
      v-else-if="isQuestionStep"
      class="quiz__form"
    >
      <QuizQuestion
        :question="questions[step-1]"
        :step="step"
        :go-to-next-step="goToNextStep"
      >
        <div
          slot="wizard"
          class="quiz__wizard"
        >
          <span class="quiz__wizard-text">{{ questionsLeft }} left</span>
          <div
            class="quiz__wizard--inner"
            :style="innerWizardWidth"
          />
        </div>
      </QuizQuestion>
    </form>
    <QuizResult
      v-else
      :result="result"
      :go-to-start="goToStart"
    />
  </div>
</template>

<script>
import QuizStart from '@/components/QuizStart';
import QuizQuestion from '@/components/QuizQuestion';
import QuizResult from '@/components/QuizResult';
import { QUESTIONS } from '@/constants';
// import { fetchQuestions } from '@/api';

export default {
  components: {
    QuizStart,
    QuizQuestion,
    QuizResult,
  },

  data() {
    return {
      step: 0,
      questions: QUESTIONS,
      answers: [],
      result: {
        name: '',
        img: '',
      },
    };
  },

  computed: {
    isQuestionStep() {
      return this.step <= this.questions.length;
    },

    questionsLeft() {
      const questionsLeftCount = this.questions.length - this.step;
      const questionsLeftPhrase = questionsLeftCount === 1 ? 'question' : 'questions';
      return `${questionsLeftCount} ${questionsLeftPhrase}`;
    },

    innerWizardWidth() {
      const oneStepWidth = 100 / this.questions.length;
      const width = oneStepWidth * this.step;
      return {
        width: `${width}%`,
      };
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

    goToNextStep(answer) {
      if (this.step === 0) {
        this.step += 1;
      } else if (this.step < this.questions.length) {
        this.answers = [...this.answers, answer];
        this.step += 1;
      } else if (this.step !== 0) {
        this.answers = [...this.answers, answer];
        this.submitForm();
        this.step += 1;
      }
    },

    goToStart() {
      this.step = 0;
      this.answers = [];
      this.result = {
        name: '',
        img: '',
      };
    },

    submitForm() {
      // to do some things with answers and get result
      console.log(this.answers);
    },
  },
};
</script>
