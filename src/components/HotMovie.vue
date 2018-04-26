<template>
  <div class="hot-movie">
    <div><input type="text" readonly placeholder="电影/电视剧/影人" @click="toSearch"></div>
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">正在热映</mt-tab-item>
      <mt-tab-item id="2">即将上映</mt-tab-item>
    </mt-navbar>
    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <mt-loadmore :auto-fill="false" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore1">
          <ul class="movie-item">
            <li v-for="n in inTheatersData.subjects" :key="n.id" @click="toDetail(n.id)">{{n.title}}</li>
          </ul>
        </mt-loadmore>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
          <mt-loadmore :auto-fill="false" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore2">
            <ul class="movie-item">
              <li v-for="n in comingSoonData.subjects" :key="n.id" @click="toDetail(n.id)">{{n.title}}</li>
            </ul>
        </mt-loadmore>
      </mt-tab-container-item>
    </mt-tab-container>
    <!-- <mt-spinner v-if="loading" class="loading" color="#26a2ff" type="snake"></mt-spinner> -->
    <router-view/>
  </div>
</template>

<script>
import Vue from 'vue'
import { Navbar, TabItem, TabContainer, TabContainerItem, Loadmore, Spinner } from 'mint-ui'
import originJsonp from 'jsonp'
import { getInTheatersData, getComingSoonData } from '../api/hotMovie'

Vue.component(Navbar.name, Navbar)
Vue.component(TabItem.name, TabItem)
Vue.component(TabContainer.name, TabContainer)
Vue.component(TabContainerItem.name, TabContainerItem)
Vue.component(Loadmore.name, Loadmore)
Vue.component(Spinner.name, Spinner)
export default {
  name: 'hot-movie',
  data () {
    return {
      value: '',
      selected: '1',
      allLoaded: false,
      inTheatersData: {},
      comingSoonData: {},
      inTheatersStart: 0,
      comingSoonStart: 0,
      loading: false
    }
  },
  created () {
    this.getInTheaters()
  },
  watch: {
    selected (val, oldVal) {
      switch (val) {
        case '2': !this.comingSoonData.subjects && this.getComingSoon(); break
        default: !this.inTheatersData.subjects && this.getInTheaters(); break
      }
    }
  },
  methods: {
    getInTheaters (cb) {
      getInTheatersData().then((res) => {
        if (res) {
          console.log(res)
          this.inTheatersData = res
          cb && cb()
        }
      })
    },
    getComingSoon (cb) {
      getComingSoonData().then((res) => {
        if (res) {
          console.log(res)
          this.comingSoonData = res
          cb && cb()
        }
      })
    },
    loadTop () {
      this.selected === '1' 
        ? this.getInTheaters(() => {this.$refs.loadmore1.onTopLoaded()})
        : this.getComingSoon(() => {this.$refs.loadmore2.onTopLoaded()})
    },
    loadBottom () {
      if(this.selected === '1'){
        this.inTheatersStart += 20
        getInTheatersData(this.inTheatersStart).then((res) => {
          if (res) {
            console.log(res)
            this.inTheatersData.subjects = this.inTheatersData.subjects.concat(res.subjects)
            this.$refs.loadmore1.onBottomLoaded()
            if(this.inTheatersData.subjects.length === res.total){
              this.allLoaded = true // 若数据已全部获取完毕
            }
          }
        })
      }else{
        this.comingSoonStart += 20
        getComingSoonData(this.comingSoonStart).then((res) => {
          if (res) {
            console.log(res)
            this.comingSoonData.subjects = this.comingSoonData.subjects.concat(res.subjects)
            this.$refs.loadmore2.onBottomLoaded()
            if(this.comingSoonData.subjects.length === res.total){
              this.allLoaded = true // 若数据已全部获取完毕
            }
          }
        })
      } 
    },
    toDetail (id) {
      this.$router.push(`/subject/${id}`)
    },
    toSearch () {
      this.$router.push('/search')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
}
a {
  color: #42b983;
}
.mint-tab-container {
    position: absolute;
    width: 100%;
    top: 110px;
    bottom: 55px;
    overflow: scroll;
    border-bottom: 1px solid red;
}

.movie-item li {
  line-height: 288px;
}

.loading {
  position: absolute;
  top: 50%;
  margin-top: -.56rem;
  left: 50%;
  margin-left: -.56rem;
}

</style>
