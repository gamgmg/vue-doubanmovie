<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Vue from 'vue'
import './assets/icomoon/style.css'
export default {
  name: 'App'
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
}
</style>
