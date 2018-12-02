import Vue from 'vue'
import Vuex from 'vuex'

import { fetchQuestions } from '@/api';
import { QUESTIONS } from '@/constants';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    quizStep: 0,
    questions: [],
    answers: [],
    result: {
      name: '',
      img: '',
    },
  },

  mutations: {
    setQuestions(state, questions) {
      state.questions = questions;
    },
    setStep(state, value) {
      state.quizStep = value;
    },
    addAnswer(state, answer) {
      state.answers = [...state.answers, answer]
    },
    setResult(state, result) {
      state.result = result;
    },
    resetForm(state) {
      state.quizStep = 0;
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
});
