import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import './CSS reset.less'
import { router } from './routing'

Vue.use(VueRouter)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
