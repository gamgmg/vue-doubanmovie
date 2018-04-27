<template>
  <div class="hot-movie">
    <div class="header">
      <div @click="toCity">
        <span>{{cityed}}</span>
        <i></i>
      </div>
      <div class="search-box">
        <input type="text" readonly placeholder="电影/电视剧/影人" @click="toSearch">
      </div>
    </div>
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
      <mt-spinner v-if="loading" class="loading" type="snake"></mt-spinner>
    </mt-tab-container>
    <router-view/>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import { Navbar, TabItem, TabContainer, TabContainerItem, Loadmore, Spinner, Button } from 'mint-ui'
import originJsonp from 'jsonp'
import { getInTheatersData, getComingSoonData } from '../api/hotMovie'

Vue.component(Navbar.name, Navbar)
Vue.component(TabItem.name, TabItem)
Vue.component(TabContainer.name, TabContainer)
Vue.component(TabContainerItem.name, TabContainerItem)
Vue.component(Loadmore.name, Loadmore)
Vue.component(Spinner.name, Spinner)
Vue.component(Button.name, Button)
export default {
  name: 'hot-movie',
  data () {
    return {
      city: '广州',
      selected: '1',
      allLoaded: false,
      inTheatersData: {},
      comingSoonData: {},
      inTheatersStart: 0,
      comingSoonStart: 0,
      loading: false
    }
  },
  mounted () {
    this.loading = true
    this.getInTheaters()
  },
  computed: {
    cityed () {
      return this.$store.state.cityed
    }
  },
  watch: {
    selected (val, oldVal) {
      switch (val) {
        case '2':
          if(!this.comingSoonData.subjects){
            this.loading = true
            this.getComingSoon()
          }
          break
        default:
          if(!this.inTheatersData.subjects){
            this.loading = true
            this.getInTheaters()

          }
          break
      }
    },
    cityed (val, oldVal) {
      if(val !== oldVal){
        this.loading = true
        this.selected === '1'
          ? this.getInTheaters()
          : this.getComingSoon()
      }
    }
  },
  methods: {
    getInTheaters (cb) {
      getInTheatersData({city: this.cityed}).then((res) => {
        if (res) {
          this.loading = false
          console.log(res)
          this.inTheatersData = res
          cb && cb()
        }
      })
    },
    getComingSoon (cb) {
      getComingSoonData().then((res) => {
        if (res) {
          this.loading = false
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
        getInTheatersData({start: this.inTheatersStart, city: this.cityed}).then((res) => {
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
        getComingSoonData({start: this.comingSoonStart}).then((res) => {
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
    },
    toCity () {
      this.$router.push('/city')
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

.header {
  display: flex;
  align-items: center;
}

.search-box {
  flex: 1;
}

</style>
