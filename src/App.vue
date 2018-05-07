<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"/>
    
    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="热映">
        <i slot="icon" class="icon-film"></i>
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

<style lang="scss">
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0;
}
a:hover {
  text-decoration: none !important;
}

#app {
  height: 100%;
  font-family: "Helvetica Neue",Helvetica,Roboto,Arial,sans-serif;
  position: relative;
  z-index: 1;
  .mint-tabbar {
    height: 98px;
    line-height: 98px;
    background-color: #f8f8f8;
    border-top: 2px solid #b3b3b3;
    .mint-tab-item {
      color: #9b9b9b;
      &.is-selected {
        color: #494949;
        background-color: inherit;
      }
      .mint-tab-item-icon {
        width: auto;
        height: auto;
        font-size: 50px;
      }
      .mint-tab-item-label {
        font-size: 26px;
      }
    }
  }
}
</style>
