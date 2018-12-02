<template>
  <div class="quiz">
    <QuizStart
      v-if="quizStep === 0"
      @goToNextStep="goToNextStep"
    />
    <form
      v-else-if="isQuestionStep"
      class="quiz__form"
    >
      <QuizQuestion
        :question="questions[quizStep-1]"
        @submitAnswer="goToNextStep"
      >
        <div class="quiz__wizard">
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
      @goToStart="resetForm"
    />
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import QuizStart from '@/components/QuizStart';
import QuizQuestion from '@/components/QuizQuestion';
import QuizResult from '@/components/QuizResult';

export default {
  components: {
    QuizStart,
    QuizQuestion,
    QuizResult,
  },

  computed: {
    ...mapState([
      'quizStep',
      'questions',
      'answers',
      'result',
    ]),

    isQuestionStep() {
      return this.quizStep <= this.questions.length;
    },

    questionsLeft() {
      const questionsLeftCount = this.questions.length - this.quizStep;
      const questionsLeftPhrase = questionsLeftCount === 1 ? 'question' : 'questions';
      return `${questionsLeftCount} ${questionsLeftPhrase}`;
    },

    innerWizardWidth() {
      const oneStepWidth = 100 / this.questions.length;
      const width = oneStepWidth * this.quizStep;
      return {
        width: `${width}%`,
      };
    },
  },

  mounted() {
    this.loadQuestions();
  },

  methods: {
    ...mapActions([
      'loadQuestions',
      'submitForm',
      'resetForm',
    ]),

    ...mapMutations([
      'setStep',
      'addAnswer',
    ]),

    goToNextStep(answer) {
      this.setStep(this.quizStep + 1);
      if (answer) {
        this.addAnswer(answer);
      }
      if (!this.isQuestionStep) {
        this.submitForm();
      }
    },
  },
};
</script>
