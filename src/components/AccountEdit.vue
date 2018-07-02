<template>
  <div>
    <h3 class="title">付款</h3>
    <van-cell-group>
      <van-field v-model.trim="name" label="姓名：" placeholder="请输入您的姓名" required readonly />
      <van-field v-model="personCardId" type="text" label="身份证号：" icon="clear" placeholder="请输入证件号码" required @click-icon="personCardId = ''"  @input="$v.personCardId.$touch()" />
      <div class="error" v-if="$v.personCardId.$error">请输入15或18位身份证号</div>
      <van-field v-model="mobileNumber" type="text" label="手机号码：" icon="clear" placeholder="请输入手机号码" required @click-icon="mobileNumber = ''" @input="$v.mobileNumber.$touch()" />
      <div class="error" v-if="$v.mobileNumber.$error">请输入正确的手机号码</div>
    </van-cell-group>
    <van-button size="large" :disabled="$v.$invalid" @click="goNext()">下一步</van-button>
  </div>
</template>

<script>
import { IDCardValidator, mobileValidator } from '../util/validators.js'
export default {
  data: function() {
    return {
      name: this.$route.query.payName,
      personCardId: '',
      mobileNumber: ''
      // show: false
    }
  },
  validations: {
    personCardId: { IDCardValidator },
    mobileNumber: { mobileValidator }
  },
  methods: {
    async goNext() {
      const response = await this.$http.post('QueryAccountVail', {
        PathId: 'GOLD_PAY',
        AccountNo: this.$route.query.payName,
        AccountName: this.name,
        Telephone: this.mobileNumber,
        CertNo: this.personCardId,
        /** TODO CertType 怎么传 */
        CertType: '110001'
      })
      console.log(response)
      if (response) {
        this.$router.push({
          path: 'receiveAccount',
          query: {
            payCardNumber: this.$route.query.payCardNumber,
            payBankName: this.$route.query.payBankName,
            payCardType: this.$route.query.payCardType,
            payName: this.name,
            payIDcard: this.personCardId,
            payMobileNum: this.mobileNumber
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>