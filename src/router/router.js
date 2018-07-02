import VueRouter from 'vue-router'
import BankCard from '../components/bankCard.vue'
import AccountEdit from '../components/accountEdit.vue'
import ReceiveAccount from '../components/receiveAccount.vue'
import Payment from '../components/payment.vue'

export const router = new VueRouter({
  mode: 'hash',
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
    },
    {
      path: '/payment',
      component: Payment
    }
  ]
})
