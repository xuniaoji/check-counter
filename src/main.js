import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import store from './store/store'
import './style/CSSReset.less'
import './style/commonStyle.less'
import { router } from './router/router'
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
