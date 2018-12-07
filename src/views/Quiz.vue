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
        :step="step"
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
      v-else-if="result"
      :character-name="result.name"
      :character-image="result.image"
      @goToStart="goToStart"
    />
  </div>
</template>

<script>
import QuizStart from '@/components/QuizStart';
import QuizQuestion from '@/components/QuizQuestion';
import QuizResult from '@/components/QuizResult';
import { fetchQuestions, postQuizAnswers } from '@/api';

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
      answers: [],
      result: null,
    };
  },

  computed: {
    isQuestionStep() {
      return this.step <= this.questions.length;
    },

    questionsLeft() {
      const questionsLeftCount = this.questions.length - this.step + 1;
      const questionsLeftPhrase = questionsLeftCount === 1 ? 'question' : 'questions';
      return `${questionsLeftCount} ${questionsLeftPhrase}`;
    },

    innerWizardWidth() {
      const oneStepWidth = 100 / this.questions.length;
      const width = oneStepWidth * (this.step - 1);
      return {
        width: `${width}%`,
      };
    },
  },

  created() {
    this.loadQuestions();
  },

  methods: {
    async loadQuestions() {
      try {
        this.questions = await fetchQuestions() || [];
      } catch (error) {
        console.error(error);
      }
    },

    goToNextStep(answer) {
      this.step += 1;
      if (answer) {
        this.answers = [...this.answers, answer];
      }
      if (!this.isQuestionStep) {
        this.submitForm();
      }
    },

    goToStart() {
      this.step = 0;
      this.answers = [];
      this.result = null;
    },

    async submitForm() {
      try {
        this.result = await postQuizAnswers(this.answers)
      } catch (error) {
        console.error(error)
      }
    },
  },
};
</script>
