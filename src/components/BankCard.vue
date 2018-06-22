<template>
  <div>
    <h3 class="title">付款</h3>
    <van-cell-group>
      <van-field v-model.trim="cardNumber" label="银行卡卡号：" icon="clear" placeholder="请输入卡号" required @click-icon="cardNumber = ''" autofocus @change="getBankName" />

      <van-field v-model="bankName" type="text" label="开卡行行名：" placeholder="请输入卡号" readonly left-icon="icon-arrow" />
      <van-field v-model="cardType" type="text" label="卡类型：" placeholder="请输入卡号" readonly />
    </van-cell-group>
    <van-button size="large" @click="goNext()">下一步</van-button>
    <van-popup v-model="show" :close-on-click-overlay="false">
      <van-loading color="white" size="40px" background-color="rgba(0,0,0,.7)" />
    </van-popup>

  </div>
</template>

<script>
import { Toast } from 'vant'

export default {
  data: function() {
    return {
      cardNumber: '',
      bankName: '',
      cardType: ''
      // show: false
    }
  },
  methods: {
    async getBankName() {
      if (/^([1-9]{1})(\d{12,19})$/.test(this.cardNumber)) {
        // const response = await httpService('QueryCardPartyInfo', {
        const response = await this.$http.post('QueryCardPartyInfo', {
          cardCode: this.cardNumber
        })
        console.log(response)
        if (response) {
          this.bankName = response.cardPartyName
          this.cardType = response.cardType
        }
      } else {
        Toast.fail('请输入13-20位数字')
      }
    },
    goNext() {
      console.log(this.$store.state.isShow)
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

<style lang="less" scoped>
</style>


