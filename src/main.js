import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import store from './store/store'
import './CSS reset.less'
import './commonStyle.less'
import { router } from './routing'
import Axios from './util/httpService'
import Vuelidate from 'vuelidate'

Vue.prototype.$http = Axios
Vue.use(VueRouter)
Vue.use(Vuelidate)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
