<template>
  <div>
    <h3 class="title">收款人信息</h3>
    <van-cell-group>
      <van-field v-model.trim="receiveCardNumber" type="text" icon="clear" required @click-icon="receiveCardNumber = ''" @change="getBankName" label="收款人卡号：" placeholder="请输入银行卡号"  />
      <div class="error" v-if="$v.receiveCardNumber.$error">请输入13-20位数字</div>
      <van-field v-model.trim="receiveAccountName" type="text" icon="clear" required @click-icon="receiveAccountName=''" label="账户名：" placeholder="请输入账户名"  @input="$v.receiveAccountName.$touch()" />
      <div class="error" v-if="$v.receiveAccountName.$error">非法字符:~#$%^&~#￥%&
        <>"{}</div>
      <van-field v-model="receiveBankName" type="text" label="开卡行行名：" placeholder="请输入卡号" readonly />
      <van-field v-model="receiveCardType" type="text" label="卡类型：" placeholder="请输入卡号" readonly />
    </van-cell-group>
    <van-button size="large" :disabled="$v.$invalid" @click="goNext()">下一步</van-button>
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
      receiveCardNumber: '',
      receiveAccountName: '',
      receiveBankName: '',
      receiveCardType: ''
      // show: false
    }
  },
  validations: {
    receiveCardNumber: { bankCardValidator },
    receiveAccountName: { specialCharactersValidator, required },
    receiveBankName: { required }
  },
  methods: {
    async getBankName() {
      this.$v.receiveCardNumber.$touch()
      if (!this.$v.receiveCardNumber.$invalid) {
        const response = await this.$http.post('QueryCardPartyInfo', {
          cardCode: this.receiveCardNumber
        })
        console.log(response)
        if ('cardPartyName' in response) {
          this.receiveBankName = response.cardPartyName
          this.receiveCardType = response.cardType
        } else {
          Toast.fail('未查到数据,请确认银行卡号')
          this.receiveBankName = ''
          this.receiveCardType = ''
        }
      }
    },
    async goNext() {
      if (this.receiveBankName.indexOf('新疆银行') >= 0) {
        this.$router.push({
          path: 'payment',
          query: {
            payCardNumber: this.$route.query.payCardNumber,
            payName: this.$route.query.payName,
            payCardType: this.$route.query.payCardType,
            receiveCardNumber: this.receiveCardNumber,
            receiveName: this.receiveAccountName,
            receiveBankName: this.receiveBankName,
            receiveCardType: this.receiveCardType
          }
        })
      } else {
        const response = await this.$http.post('SigningAgreement', {
          AgreementType: 'M141',
          InstructingParty: '623667490414033560',
          InstructedParty: '送达',
          PayerAccountNumber: this.$route.query.payCardNumber,
          PayerAccountName: this.$route.query.payName,
          PayerAccountType: this.$route.query.payCardType,
          /** TODO PayerCertType类型不明确 */
          PayerCertType: '110001',
          PayerCertNo: this.$route.query.payIDcard,
          PayerTel: this.$route.query.payMobileNum,
          CreditorAccount: this.receiveCardNumber,
          CreditorName: this.receiveAccountName,
          CreditorDepositName: this.receiveBankName,
          CreditorAccountType: this.receiveCardType
        })
        console.log(response)
        if (response) {
          this.$dialog
            .confirm({
              message: '签约成功，请确认支付',
              confirmButtonText: '支付'
            })
            .then(() => {
              // on confirm
              this.$router.push({
                path: 'payment',
                query: {
                  payCardNumber: this.$route.query.payCardNumber,
                  payName: this.$route.query.payName,
                  payCardType: this.$route.query.payCardType,
                  receiveCardNumber: this.receiveCardNumber,
                  receiveName: this.receiveAccountName,
                  receiveBankName: this.receiveBankName,
                  receiveCardType: this.receiveCardType
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