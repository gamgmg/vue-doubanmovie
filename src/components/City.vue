<template>
  <div class="city">
    <h1>{{ msg }}</h1>
    <h2>city</h2>
  </div>
</template>

<script>
export default {
  name: 'city',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
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
}
</style>
