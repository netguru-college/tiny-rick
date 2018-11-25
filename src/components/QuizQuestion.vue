<template>
  <div class="quiz__container">
    <div class="quiz__image-box--form"></div>
    <div class="quiz__question-box">
      <div class="quiz__question-info">
        <h1 class="quiz__step">Question {{ step }}</h1>
        <div class="quiz__wizard">
          <span class="quiz__wizard-text">{{ questionsLeft }} left</span>
          <div class="quiz__wizard--inner" :style="innerWizardWidth" />
        </div>
        <span class="quiz__question">{{ question.value }}</span>
      </div>
      <div class="quiz__answers">
        <div v-if="question.type === 'text'">
          <input type="text" class="quiz__answer--text"/>
          <button class="quiz__button--primary quiz__button--action">Next</button>
        </div>
        <div
          else
          class="quiz__answer--select"
          v-for="answer in question.answers"
          :key="answer.id"
        >
          <label>
            <input
              else
              type="radio"
              :name="question.value"
              :value="answer.value"
            />
            {{ answer.value }}
          </label>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    question: {
      type: Object,
      required: true,
    },
    step: {
      type: Number,
      required: true,
    },
    questionsLength: {
      type: Number,
      required: true,
    },
  },

  computed: {
    innerWizardWidth() {
      const oneStepWidth = 100 / this.questionsLength;
      const width = oneStepWidth * this.step;
      return {
        width: `${width}%`
      };
    },

    questionsLeft() {
      const questionsLeftNumber = this.questionsLength - this.step;
      const questionsLeftPhrase = questionsLeftNumber === 1 ? 'question' : 'questions';
      return `${questionsLeftNumber} ${questionsLeftPhrase}`;
    },
  },
};
</script>
