import VueRouter from 'vue-router'
import BankCard from './components/BankCard.vue'

export const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    // Just use them normally in the route config
    { path: '', redirect: '/bankCard' },
    { path: '/bankCard', component: BankCard }
  ]
})
