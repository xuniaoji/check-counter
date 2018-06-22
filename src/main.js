import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import store from './store/store'
import './CSS reset.less'
import { router } from './routing'
import Axios from './util/util'

console.log(Axios)
Vue.prototype.$http = Axios
Vue.use(VueRouter)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
