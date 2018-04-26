<template>
  <div class="subject">
    <mt-header fixed :title="this.subjectData.title">
      <!-- <router-link to="/" slot="left"> -->
        <mt-button icon="back" slot="left" @click="back"></mt-button>
      <!-- </router-link> -->
    </mt-header>
    <h2>{{ this.subjectData.summary }}</h2>
  </div>
</template>

<script>
import Vue from 'vue'
import { Header, Button } from 'mint-ui'
import { getSubjectData } from '../api/hotMovie'
Vue.component(Header.name, Header)
Vue.component(Button.name, Button)
export default {
  name: 'subject',
  data () {
    return {
      subjectData: {}
    }
  },
  mounted () {
    this.getSubject()
  },
  methods: {
    getSubject () {
      let id = this.$router.history.current.params.id
      getSubjectData(id).then((res) => {
        if(res){
          console.log(res)
          this.subjectData = res
        }
      })
    },
    back () {
      this.$router.back()
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
  color: #fff;
}
.subject {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  z-index: 100;
}
</style>
