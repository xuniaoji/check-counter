<template>
  <div>
    <h3 class="title">确认支付</h3>
    <van-cell-group>
      <van-field v-model.trim="moneyPay" label="支付金额：" icon="clear" placeholder="请输入支付金额" required @click-icon="moneyPay = ''" autofocus @input="$v.moneyPay.$touch()" />
      <div class="error" v-if="$v.moneyPay.$error">请输入正确金额</div>
      <template v-if="!canEdit">
        <van-field v-model="receiveCardNumber" type="text" label="收款人卡号：" readonly />
      </template>
      <template v-if="canEdit">
        <van-field v-model="receiveCardNumber" placeholder="请输入收款人银行卡号" type="text" label="收款人卡号：" required @change="getBankName" />
        <van-field v-model="receiveAccountName" placeholder="请输入账户名" type="text" label="账户名：" required />
      </template>
      <van-field v-model="receiveBankName" placeholder="请输入收款人银行卡号" type="text" label="开卡行行名：" readonly />
      <van-field v-model="receiveCardType" placeholder="请输入收款人银行卡号" type="text" label="卡类型：" readonly />
    </van-cell-group>
    <van-button size="large" :disabled="$v.$invalid" @click="goNext()">确认支付</van-button>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { CARD_TYPES } from '../constant/codeValue.js'
import { moneyValidator } from '../util/validators.js'

export default {
  data: function() {
    return {
      moneyPay: '',
      receiveCardNumber: this.$route.query.receiveCardNumber,
      receiveAccountName: this.$route.query.receiveName,
      receiveBankName: this.$route.query.receiveBankName,
      receiveCardType: this.$route.query.receiveCardType,
      canEdit: false,
      cardType: []
    }
  },
  validations: {
    moneyPay: { moneyValidator }
  },
  created() {
    this.canEdit = !this.$route.query.receiveCardNumber
    this.cardTypes = CARD_TYPES
  },
  methods: {
    async getBankName() {
      if (/^([1-9]{1})(\d{12,19})$/.test(this.receiveCardNumber)) {
        this.cardInfo = await this.$http.post('QueryCardPartyInfo', {
          cardCode: this.receiveCardNumber
        })
        console.log(this.cardInfo)
        /** TODO cardType需要转译 */
        if ('cardPartyName' in this.cardInfo) {
          this.receiveBankName = this.cardInfo.cardPartyName
          this.receiveCardType = this.cardInfo.cardType
          this.isDisabled = false
        } else {
          Toast.fail('未查到数据,请确认银行卡号')
          this.isDisabled = true
          this.receiveBankName = ''
          this.receiveCardType = ''
        }
      } else {
        Toast.fail('请输入13-20位数字')
        this.isDisabled = true
      }
    },
    async goNext() {
      const response = await this.$http.post('ProcessBilateralPayment', {
        ProductId:
          this.receiveBankName.indexOf('新疆银行') >= 0
            ? 'AC0000001'
            : 'GC0000002',
        BusinessType:
          this.receiveBankName.indexOf('新疆银行') >= 0 ? 'Y100' : 'X106',
        AgreementType: '8',
        AgreementContent: '111111111111',
        Amount: this.moneyPay,
        CurrencyUomId: '156',
        PayerPaymentInfo: {
          PaymentMethodType: this.getCardTypeValue(
            this.$route.query.payCardType
          ),
          AccountNumber: this.$route.query.payCardNumber,
          receiveAccountName: this.$route.query.payName
        },
        PayeePaymentInfo: {
          PaymentMethodType: this.getCardTypeValue(this.receiveCardType),
          AccountNumber:
            this.$route.query.receiveCardNumber || this.receiveCardNumber,
          receiveAccountName:
            this.$route.query.receiveName || this.receiveAccountName
        }
      })
      console.log(response)
      if (response) {
        this.$dialog
          .alert({
            title: '支付成功',
            message: `流水号${response.OrderId}`
          })
          .then(() => {
            // on close
            this.$router.push('bankCard')
          })
      }
    },
    getCardTypeValue(label) {
      return this.cardTypes.find(each => each.label === label).value
    }
  }
}
</script>