import VueRouter from 'vue-router'
import BankCard from './components/BankCard.vue'
import AccountEdit from './components/AccountEdit.vue'
import ReceiveAccount from './components/receiveAccount.vue'

export const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    // Just use them normally in the route config
    { path: '', redirect: '/bankCard' },
    // { path: '', redirect: '/receiveAccount' },
    {
      path: '/bankCard',
      component: BankCard
    },
    {
      path: '/accountEdit',
      component: AccountEdit
    },
    {
      path: '/receiveAccount',
      component: ReceiveAccount
    }
  ]
})
