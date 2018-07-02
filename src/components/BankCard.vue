<template>
  <div>
    <h3 class="title">付款</h3>
    <van-cell-group>
      <van-field v-model.trim="payCardNumber" label="银行卡卡号：" icon="clear" placeholder="请输入卡号" required @click-icon="payCardNumber = ''" @change="getBankName" />
      <div class="error" v-if="$v.payCardNumber.$error">请输入13-20位数字</div>
      <van-field v-model.trim="payName" label="账户名：" icon="clear" placeholder="请输入账户名" required @click-icon="payName = ''" @input="$v.payName.$touch()" />
      <div class="error" v-if="$v.payName.$error">非法字符:~#$%^&~#￥%&
        <>"{}</div>
      <van-field v-model="payBankName" type="text" label="开卡行行名：" placeholder="请输入银行卡号" readonly />
      <van-field v-model="payCardType" type="text" label="卡类型：" placeholder="请输入银行卡号" readonly />
    </van-cell-group>
    <van-button size="large" @click="goNext()" :disabled="$v.$invalid">下一步</van-button>

  </div>
</template>

<script>
import { Toast } from 'vant'
import { required } from 'vuelidate/lib/validators'
import {
  bankCardValidator,
  specialCharactersValidator
} from '../util/validators.js'

export default {
  data: function() {
    return {
      payCardNumber: '',
      payName: '',
      payBankName: '',
      payCardType: '',
      // isDisabled: true,
      cardInfo: ''
      // show: false
    }
  },
  validations: {
    payCardNumber: { bankCardValidator },
    payName: { specialCharactersValidator, required },
    payBankName: { required }
  },
  methods: {
    async getBankName() {
      console.log(this.$v.payCardNumber)
      this.$v.payCardNumber.$touch()
      if (!this.$v.payCardNumber.$invalid) {
        this.cardInfo = await this.$http.post('QueryCardPartyInfo', {
          cardCode: this.payCardNumber
        })
        /** TODO cardType需要转译 */
        if (this.cardInfo && this.cardInfo.cardPartyName) {
          this.payBankName = this.cardInfo.cardPartyName
          this.payCardType = this.cardInfo.cardType
          // this.isDisabled = this.$v.payName.$invalid
        } else {
          Toast.fail('未查到数据,请确认银行卡号')
          // this.isDisabled = true
          this.payBankName = ''
          this.payCardType = ''
        }
      } /* else {
        Toast.fail('请输入13-20位数字')
        // this.isDisabled = true
      } */
    },
    async goNext() {
      console.log(this.cardInfo)
      if (this.cardInfo.cardPartyName.indexOf('新疆银行') >= 0) {
        /* this.$dialog
          .confirm({
            message: '请确认支付',
            confirmButtonText: '支付'
          })
          .then(() => {
            // on confirm
            this.$router.push({
              path: 'payment',
              query: {
                payCardNumber: this.payCardNumber,
                payName: this.payName,
                payCardType: this.payCardType
              }
            })
          })
          .catch(() => {
            // on cancel
          }) */

        this.$router.push({
          path: 'accountEdit',
          query: {
            payCardNumber: this.payCardNumber,
            payName: this.payName,
            payBankName: this.payBankName,
            payCardType: this.payCardType
          }
        })
      } else {
        const response = await this.$http.post('QueryAgreementSummary', {
          PayerAccount: this.payCardNumber
        })
        console.log(response)
        if (response.ResultList.length) {
          const responseData = response.ResultList[0]
          const response1 = await this.$http.post('QueryCardPartyInfo', {
            cardCode: responseData.CreditorAccount
          })

          if (response1) {
            this.$dialog
              .confirm({
                message: '您已签约，请确认支付信息',
                confirmButtonText: '支付'
              })
              .then(() => {
                // on confirm
                this.$router.push({
                  path: 'payment',
                  query: {
                    payCardNumber: responseData.PayerAccountNumber,
                    payName: responseData.PayerAccountName,
                    receiveCardNumber: responseData.CreditorAccount,
                    receiveName: responseData.CreditorName,
                    receiveBankName: responseData.CreditorDepositName,
                    receiveCardType: response1.payCardType
                  }
                })
              })
              .catch(() => {
                // on cancel
              })
          }
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
                  payCardNumber: this.payCardNumber,
                  payBankName: this.payBankName,
                  payCardType: this.payCardType
                }
              })
            })
            .catch(() => {
              // on cancel
            })
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>


