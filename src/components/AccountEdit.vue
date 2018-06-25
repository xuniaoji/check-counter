<template>
  <div>
    <h3 class="title">签约</h3>
    <van-cell-group>
      <van-field v-model.trim="name" label="姓名：" icon="clear" placeholder="请输入您的姓名" required @click-icon="name = ''" autofocus />
      <van-field v-model="personCardId" type="text" label="身份证号：" icon="clear" placeholder="请输入证件号码" required @click-icon="personCardId = ''" />
      <van-field v-model="mobileNumber" type="text" label="手机号码：" icon="clear" placeholder="请输入手机号码" required @click-icon="mobileNumber = ''" />
    </van-cell-group>
    <van-button size="large" @click="goNext()">下一步</van-button>
  </div>
</template>

<script>
import { Toast } from 'vant'

export default {
  data: function() {
    return {
      name: '',
      personCardId: '',
      mobileNumber: ''
      // show: false
    }
  },
  methods: {
    async goNext() {
      const response = await this.$http.post('QueryAccountVail', {
        PathId: 'GOLD_PAY',
        AccountNo: this.$route.query.cardNumber,
        AccountName: this.name,
        Telephone: this.mobileNumber,
        CertNo: this.personCardId,
        /** CertType 怎么传 */
        CertType: '110001'
      })
      // const response = await this.$http.post('SigningAgreement', {
      //   AgreementType: 'M141',
      //   InstructingParty: '623667490414033560',
      //   InstructedParty: '送达',
      //   PayerAccountNumber: this.$route.query.cardNumber,
      //   PayerAccountName: this.name,
      //   PayerAccountType: this.$route.query.cardType,
      //   /** TODO PayerCertType类型不明确 */
      //   PayerCertType: 'xx',
      //   PayerCertNo: this.personCardId,
      //   PayerTel: this.mobileNumber
      // })

      console.log(response)
      if (response) {
        this.$router.push({
          path: 'receiveAccount',
          query: {
            cardNumber: this.cardNumber,
            bankName: this.bankName,
            cardType: this.cardType
          }
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
    console.log(this.$route.params)
    this.$on('closeLoading', function(msg) {
      alert(12233)
    })
  }
}
</script>

<style lang="less" scoped>
</style>