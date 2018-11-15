import Vue from 'vue'
import Router from 'vue-router'
import Episodes from './views/Episodes.vue'
import Characters from './views/Characters.vue'
import Locations from './views/Locations.vue'
import Quiz from './views/Quiz.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'episodes',
      component: Episodes,
    },
    {
      path: '/characters',
      name: 'characters',
      component: Characters,
    },
    {
      path: '/locations',
      name: 'locations',
      component: Locations,
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: Quiz,
    }
  ]
})
