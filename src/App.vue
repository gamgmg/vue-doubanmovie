<template>
  <div id="app">
    <router-view/>
    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="热映">
        <i slot="icon" class="icon-ticket"></i>
        热映
      </mt-tab-item>
      <mt-tab-item id="找片">
        <i slot="icon" class="icon-eye"></i>
        找片
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
import Vue from 'vue'
import { Tabbar, TabItem, TabContainer, TabContainerItem, Cell } from 'mint-ui'
import './assets/icomoon/style.css'

Vue.component(Tabbar.name, Tabbar)
Vue.component(TabItem.name, TabItem)
Vue.component(TabContainer.name, TabContainer)
Vue.component(TabContainerItem.name, TabContainerItem)
Vue.component(Cell.name, Cell)
export default {
  name: 'App',
  data () {
    return {
      selected: '热映'
    }
  },
  watch: {
    selected: function (val, oldVal) {
      switch (val) {
        case '找片':
          this.$router.push('/findMovie')
          break
        default:
          this.$router.push('/')
          break
      }
    }
  }
}
</script>

<style>
#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  position: relative;
  z-index: 1;
}
a:hover {
  text-decoration: none
}
</style>
