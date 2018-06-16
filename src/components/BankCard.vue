<template>
  <div>
    <h3 class="title">付款</h3>
    <van-cell-group>
      <van-field
      v-model.trim="cardNumber"
      label="银行卡卡号："
      icon="clear"
      placeholder="请输入卡号"
      required
      @click-icon="cardNumber = ''"
      autofocus
      @change="getBankName"
    />

      <van-field
        v-model="bankName"
        type="text"
        label="开卡行行名："
        placeholder=""
        readonly
        left-icon="icon-arrow"
      />
      <van-field
        v-model="cardType"
        type="text"
        label="卡类型："
        placeholder=""
        readonly
      />
    </van-cell-group>
    <van-button size="large">下一步</van-button>
    <van-popup v-model="show" :close-on-click-overlay="false">
      <van-loading color="white" size="40px" background-color="rgba(0,0,0,.7)"/>
    </van-popup>
    
  </div>
</template>

<script>
import { httpService } from '../util/util.js'
export default {
  data: function() {
    return {
      cardNumber: '111',
      bankName: '123',
      cardType: '反反复复',
      show: false
    }
  },
  methods: {
    async getBankName() {
      try {
        // if (/^([1-9]{1})(\d{14}|\d{18})$/.test(this.cardNumber)) {
        if (true) {
          this.show = true
          let response = 3
          response = await httpService('QueryCardPartyInfo', {
            params: { cardCode: this.cardNumber }
          })
          console.log(response)
          this.show = false
          if (response) {
            this.bankName = response.cardPartyName
            this.cardType = response.cardType
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>


