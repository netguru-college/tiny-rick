import Vue from 'vue'
import Vuex from 'vuex'

import quiz from './store/quiz';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    quiz,
  },
})
