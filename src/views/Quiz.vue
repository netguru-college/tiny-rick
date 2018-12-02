<template>
  <div class="quiz">
    <QuizStart
      v-if="step === 0"
      @goToNextStep="goToNextStep"
    />
    <form
      v-else-if="isQuestionStep"
      class="quiz__form"
    >
      <QuizQuestion
        :question="questions[step-1]"
        @submitAnswer="goToNextStep"
      >
        <div class="quiz__wizard">
          <span class="quiz__wizard-text">{{ questionsLeft }} left</span>
          <div
            class="quiz__wizard--inner"
            :style="innerWizardStyle"
          />
        </div>
      </QuizQuestion>
    </form>
    <QuizResult
      v-else
    />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
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
    ...mapState('quiz', [
      'step',
      'questions',
      'answers',
    ]),

    ...mapGetters('quiz', [
      'isQuestionStep',
      'questionsLeftCount',
      'wizardWidth',
    ]),

    questionsLeft() {
      const questionsLeftPhrase = this.questionsLeftCount === 1 ? 'question' : 'questions';
      return `${this.questionsLeftCount} ${questionsLeftPhrase}`;
    },

    innerWizardStyle() {
      return {
        width: `${this.wizardWidth}%`,
      };
    },
  },

  mounted() {
    this.loadQuestions();
  },

  methods: {
    ...mapActions('quiz', [
      'loadQuestions',
      'submitForm',
    ]),

    ...mapMutations('quiz', [
      'setStep',
      'addAnswer',
    ]),

    goToNextStep(answer) {
      this.setStep(this.step + 1);
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
