<template>
  <div>
    <h3 class="title">收款人信息</h3>
    <van-cell-group>
      <!-- <van-field v-model.trim="moneyPay" label="支付金额：" icon="clear" placeholder="请输入支付金额" required @click-icon="moneyPay = ''" autofocus /> -->
      <van-field v-model.trim="receiveCardNum" type="text" icon="clear" required @click-icon="receiveCardNum = ''" @change="getBankName" label="收款人卡号：" placeholder="请输入卡号" />
      <van-field v-model.trim="accountName" type="text" icon="clear" required @click-icon="accountName=''" label="账户名：" placeholder="请输入账户名" />
      <van-field v-model="bankName" type="text" label="开卡行行名：" placeholder="请输入卡号" readonly />
      <van-field v-model="cardType" type="text" label="卡类型：" placeholder="请输入卡号" readonly />
    </van-cell-group>
    <van-button size="large" @click="goNext()">确认签约</van-button>
  </div>
</template>

<script>
import { Toast } from 'vant'

export default {
  data: function() {
    return {
      // moneyPay: '',
      receiveCardNum: '',
      accountName: '',
      bankName: '',
      cardType: ''
      // show: false
    }
  },
  methods: {
    async getBankName() {
      if (/^([1-9]{1})(\d{12,19})$/.test(this.receiveCardNum)) {
        const response = await this.$http.post('QueryCardPartyInfo', {
          cardCode: this.receiveCardNum
        })
        console.log(response)
        if ('cardPartyName' in response) {
          this.bankName = response.cardPartyName
          this.cardType = response.cardType
        } else {
          Toast.fail('未查到数据,请确认银行卡号')
          this.bankName = ''
          this.cardType = ''
        }
      } else {
        Toast.fail('请输入13-20位数字')
      }
    },
    async goNext() {
      const response = await this.$http.post('ProcessBilateralPayment', {
        ProductId: 'GC0000002',
        BusinessType: 'X106',
        AgreementType: '8',
        AgreementContent: '111111111111',
        Amount: '1',
        CurrencyUomId: '156',
        PayerPaymentInfo: {
          PaymentMethodType: 'GOLD_PAY_KJ',
          AccountNumber: '6229124904140335',
          AccountName: '送达'
        },
        PayeePaymentInfo: {
          PaymentMethodType: 'DEBIT_CARD',
          AccountNumber: '623667490414033560',
          AccountName: '送达'
        }
      })
      console.log(response)
      if (response.ResultList.length !== 0) {
      } else {
        this.$dialog
          .confirm({
            message: '您未进行签约，请先签约',
            confirmButtonText: '签约'
          })
          .then(() => {
            // on confirm
            this.$router.push({
              path: 'accountEdit',
              query: {
                cardNumber: this.cardNumber,
                bankName: this.bankName,
                cardType: this.cardType
              }
            })
          })
          .catch(() => {
            // on cancel
          })
      }
    }
  },
  computed: {
    show: {
      set: function(params) {
        return this.$store.state.isShow
      },
      get: function(params) {
        return this.$store.state.isShow
      }
    }
  },
  mounted: function() {
    console.log(111)
    this.$on('closeLoading', function(msg) {
      alert(12233)
    })
  }
}
</script>