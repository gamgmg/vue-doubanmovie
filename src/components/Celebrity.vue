<template>
	<div class="celebrity" v-if="this.celebrityData" ref="celebrityDOM">
		<div class="wrapper">
			<mt-header fixed :title="影人" class="mt-header" ref="mtheaderDOM">
        <mt-button icon="back" slot="left" @click="back"></mt-button>
      </mt-header>
      <section class="movie-poster" ref="posterBg">
        <img v-lazy="this.celebrityData.avatars.large" :alt="this.celebrityData.name">
      </section>
		</div>
	</div>
</template>
<script>
import Vue from 'vue'
import { Header, Button, Lazyload } from 'mint-ui'
import { getCelebrityData } from '../api/hotMovie'

Vue.use(Header)
Vue.use(Button)
Vue.use(Lazyload)

export default {
	name: 'celebrity',
	data () {
		return {
			celebrityData: null
		}
	},
	beforeRouteEnter (to, from, next) {
    getCelebrityData(to.params.id).then((res) => {
      if(res){
        next(vm => {
          vm.getCelebrity(res)
        })
      }
    })
  },
  beforeRouteUpdate (to, from, next) {
    getCelebrityData(to.params.id).then((res) => {
      if(res){
        this.celebrityData = null
        this.getCelebrity(res)
        next()
      }
    })
  },
  mounted () {
  },
  methods: {
  	getCelebrity (res) {
  		console.log('celebrity', res)
  		this.celebrityData = res
  	},
    back () {
      this.$router.goBack()
    }
  }
}
</script>
<style lang="scss">
.celebrity {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  overflow: hidden;
  background-color: #fff;
  z-index: 200;
  .wrapper {
  	position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    overflow: scroll;
    .mint-header {
      height: 88px;
      line-height: 88px;
      background-color: rgba(0,0,0,.5);
      .mintui {
        font-size: 36px;
      }
    	h1 {
    		font-size: 32px;
    	}
    }
    .movie-poster {
      height: 617px;
      text-align: center;
      img {
        padding-top: 88px;
        width: 342px;
        height: 478px;
        vertical-align: top;
      }
    }
  }
}
</style>