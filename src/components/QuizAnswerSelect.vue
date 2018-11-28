<template>
  <div class="quiz__bottom-panel">
    <label
      v-for="option in question.options"
      :key="option.id"
      class="quiz__answer quiz__answer--select"
    >
      <input
        type="radio"
        :name="question.value"
        :value="option.value"
        @change="$emit('submitAnswer', $event.target.value)"
      >
      {{ option.value }}
    </label>
  </div>
</template>

<script>
export default {
  props: {
    question: {
      type: Object,
      required: true,
    },
  },
};
</script>
