<template>
  <div id="tabber">

    
    <transition :name="transitionName">
	    <navigation>
	    	<!-- <keep-alive> -->
	      	<router-view class="child-view" ref="childView"/>
	      <!-- </keep-alive> -->
	    </navigation>
    </transition>
    <!-- <transition :name="transitionName">
    	<navigation>
  			<router-view class="child-view" v-if="!$route.meta.keepAlive" ref="childView"/>
  		</navigation>
    </transition> -->

    
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
import router from '../router'
import { Tabbar, TabItem, TabContainer, TabContainerItem, Cell } from 'mint-ui'

Vue.component(Tabbar.name, Tabbar)
Vue.component(TabItem.name, TabItem)
Vue.component(TabContainer.name, TabContainer)
Vue.component(TabContainerItem.name, TabContainerItem)
Vue.component(Cell.name, Cell)

export default {
  name: 'tabber',
  data () {
    return {
      selected: '热映',
      transitionName: 'slide-left'
    }
  },
  beforeRouteUpdate (to, from, next) {
  	if(to.path === '/findMovie' && from.path === '/hotMovie' || to.path === '/hotMovie' && from.path === '/findMovie'){
  		this.transitionName = ''
			this.$refs.childView.$el.style.transition = 'all 0s'
  		next()
  		return
  	}
	  let isBack = this.$router.isBack
	  if (isBack) {
	    this.transitionName = 'slide-right'
	  } else {
	    this.transitionName = 'slide-left'
	  }
	  this.$router.isBack = false
	  next()
	},
	created () {
		// this.$navigation.on('forward', (to, from) => {
  //     if(to.route.name === 'HotMovie' && from.route.name === 'FindMovie' || to.route.name === 'FindMovie' && from.
  //     	route.name === 'HotMovie'){

  //     console.log('forward to', to, 'from ', from)
  //     	to.route.meta.keepAlive = true
  //     	from.route.meta.keepAlive = true
  //     }
  //   })
  //   this.$navigation.on('back', (to, from) => {
  //     console.log('back to', to, 'from ', from)
  //   })
	},
  watch: {
    selected: function (val, oldVal) {
      switch (val) {
        case '找片':
          this.$router.push('/findMovie')
          break
        default:
          this.$router.push('/hotMovie')
          break
      }
    }
  }
}
</script>

<style lang="scss">
#tabber {
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
        font-size: 20px;
      }
    }
  }
}
.child-view {
  transition: all .3s;
  transform: translate3d(0,0,0);
}

.slide-left-enter, .slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(50px, 0);
  transform: translate(50px, 0);
}
.slide-left-leave-active, .slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-50px, 0);
  transform: translate(-50px, 0);
}
</style>
