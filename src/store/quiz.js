import { fetchQuestions } from '@/api';
import { QUESTIONS } from '@/constants';

export default {
  namespaced: true,
  state: {
    step: 0,
    questions: [],
    answers: [],
    result: {
      name: '',
      img: '',
    },
  },

  getters: {
    isQuestionStep: ({ step, questions }) =>
      step <= questions.length,

    questionsLeftCount: ({ step, questions }) =>
      questions.length - step,

    wizardWidth: ({ step, questions }) =>
      100 / questions.length * step,
  },

  mutations: {
    setQuestions(state, questions) {
      state.questions = questions;
    },

    setStep(state, value) {
      state.step = value;
    },

    addAnswer(state, answer) {
      state.answers = [...state.answers, answer]
    },

    setResult(state, result) {
      state.result = result;
    },

    resetForm(state) {
      state.step = 0;
      state.answers = [];
      state.result = {
        name: '',
        img: '',
      };
    },
  },

  actions: {
    async loadQuestions({ commit }) {
      try {
        const { questions = QUESTIONS } = await fetchQuestions(); // to do
        commit('setQuestions', questions);
      } catch (error) {
        console.error(error);
      }
    },

    async submitForm({ commit }) {
      try {
        // const { result } = await submitForm(state.answers);  // to do
        const result = { name: '', image: ''}
        commit('setResult', result)
      } catch (error) {
        console.log(error);
      }
    },
  }
}
