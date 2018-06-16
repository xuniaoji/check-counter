<template>
  <div id="app">
    <!-- <van-cell-group class="item-list">
      <van-cell is-link icon="points" title="我的积分" />
      <van-cell is-link icon="gift" title="我收到的礼物" />
    </van-cell-group> -->
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from 'vue'
import { Field, CellGroup, Button, Loading, Popup } from 'vant'

const components = [Field, CellGroup, Button, Loading, Popup]

components.forEach(component => {
  Vue.use(component)
})

export default {}
</script>

<style>
body {
  background-color: #f8f8f8;
  font-family: 'Helvetica Neue', 'Helvetica', 'sans-serif';
}

h3 {
  text-align: center;
}

.title {
  font-size: 16px;
  font-weight: normal;
  height: 40px;
  line-height: 40px;
  box-sizing: border-box;
  border-bottom: 1px solid black;
}

@media screen and (max-width: 321px) {
  body {
    font-size: 16px;
  }
}

@media screen and (min-width: 321px) and (max-width: 400px) {
  body {
    font-size: 17px;
  }
}

@media screen and (min-width: 400px) {
  body {
    font-size: 19px;
  }
}
</style>
