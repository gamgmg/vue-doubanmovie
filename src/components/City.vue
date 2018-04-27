<template>
  <div class="city">
    <mt-header fixed title="选择城市">
      <mt-button icon="back" slot="left" @click="back"></mt-button>
    </mt-header>
    <mt-index-list>
      <mt-index-section v-for="(c, key) in city" :key="key" :index="key">
        <div v-for="(cc, i) in c" :key="i" :title="cc" @click="selectCity(cc)">{{cc}}</div>
        <!-- <mt-cell v-for="(cc, i) in c" :key="i" :title="cc" @click="selectCity(cc)"></mt-cell> -->
      </mt-index-section>
    </mt-index-list>
  </div>
</template>

<script>
import Vue from 'vue'
import { IndexList, IndexSection, Cell, Header } from 'mint-ui'

Vue.component(IndexList.name, IndexList)
Vue.component(IndexSection.name, IndexSection)
Vue.component(Cell.name, Cell)
Vue.component(Header.name, Header)
export default {
  name: 'city',
  data () {
    return {
      city: {
        A: ['安徽', '澳门'],
        B: ['北京'],
        C: ['重庆'],
        F: ['福建'],
        G: ['甘肃', '广东', '广西', '贵州'],
        H: ['海南', '河北', '黑龙江', '河南', '香港', '湖北', '湖南'],
        J: ['江苏', '江西', '吉林'],
        L: ['辽宁'],
        N: ['内蒙古', '宁夏'],
        Q: ['青海'],
        S: ['陕西','山东', '上海', '山西', '四川'],
        T: ['台湾', '天津'],
        X: ['新疆', '西藏'],
        Y: ['云南'],
        Z: ['浙江']
      }
    }
  },
  methods: {
    back () {
      this.$router.back()
    },
    selectCity (city) {
      this.$store.dispatch('selectCity', city)
      this.$router.push('/')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
a {
  color: #42b983;
}

.city {
  position: absolute;
  overflow: scroll;
  top: 0;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  z-index: 100;
  text-align: left;
}
</style>
