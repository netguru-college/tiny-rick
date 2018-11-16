import Vue from 'vue'
import VueContentPlaceholders from 'vue-content-placeholders'
import infiniteScroll from 'vue-infinite-scroll'

import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.use(VueContentPlaceholders)
Vue.use(infiniteScroll)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
