<template>
  <div class="hot-movie" ref="hotMovieDom">
    <div class="header">
      <div class="select-city" @click="toCity">
        <span>{{cityed}}</span>
        <i class="icon-angle-down"></i>
      </div>
      <div class="search-box">
        <i class="icon-search"></i>
        <span @click="toSearch">电影 / 影人</span>
      </div>
    </div>
    <mt-navbar class="select-tab" v-model="selected">
      <mt-tab-item id="1"><span>正在热映</span></mt-tab-item>
      <mt-tab-item id="2"><span>即将上映</span></mt-tab-item>
    </mt-navbar>
    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <mt-loadmore :auto-fill="false" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore1">
          <ul class="movie-item">
            <li v-for="n in inTheatersData.subjects" :key="n.id" @click="toDetail(n.id, $event)">
              <div class="movie-img"><img v-lazy="n.images.medium" :alt="n.title"></div>
              <div class="movie-info">
                <h3 class="title">{{n.title}}</h3>
                <div class="rating">
                  <span v-if="n.rating.average !== 0">
                    <Star :stars="Number(n.rating.stars)"/>
                    <span>{{n.rating.average}}</span>
                  </span>
                  <span v-else>暂无平分</span>
                </div>
                <div class="staff">
                  <p>导演：<span v-for="d in n.directors">{{d.name}}</span></p>
                  <p>演员：<span v-for="c in n.casts">{{c.name}}</span></p>
                </div>
              </div>
              <div class="movie-slide">
                <p>{{n.collect_count}}人看过</p>
                <div class="goupiao-btn">
                  <button>购票</button>
                </div>
              </div>
            </li>
          </ul>
        </mt-loadmore>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
          <mt-loadmore :auto-fill="false" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore2">
            <ul class="movie-item">
              <li v-for="n in comingSoonData.subjects" :key="n.id" @click="toDetail(n.id)">
                <div class="movie-img"><img v-lazy="n.images.medium" :alt="n.title"></div>
                <div class="movie-info">
                  <h3 class="title">{{n.title}}</h3>
                  <div class="rating"></div>
                  <div class="staff">
                    <p>导演：<span v-for="d in n.directors">{{d.name}}</span></p>
                    <p>演员：<span v-for="c in n.casts">{{c.name}}</span></p>
                  </div>
                </div>
                <div class="movie-slide">
                  <p>{{n.collect_count}}人看过</p>
                  <div class="goupiao-btn">
                    <button>想看</button>
                  </div>
                </div>
              </li>
            </ul>
        </mt-loadmore>
      </mt-tab-container-item>
      <mt-spinner v-if="loading" class="loading" type="snake"></mt-spinner>
    </mt-tab-container>
    <transition :name="transitionName">
      <router-view class="child-view"/>
    </transition>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import { Navbar, TabItem, TabContainer, TabContainerItem, Loadmore, Spinner, Button, Lazyload } from 'mint-ui'
import originJsonp from 'jsonp'
import { getInTheatersData, getComingSoonData } from '../api/hotMovie'
import Star from './Star'

Vue.component(Navbar.name, Navbar)
Vue.component(TabItem.name, TabItem)
Vue.component(TabContainer.name, TabContainer)
Vue.component(TabContainerItem.name, TabContainerItem)
Vue.component(Loadmore.name, Loadmore)
Vue.component(Spinner.name, Spinner)
Vue.component(Button.name, Button)
Vue.use(Lazyload)
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
      loading: false,
      transitionName: 'slide-left'
    }
  },
  components: {
    Star
  },
  created () {
    if(!this.inTheatersData.subjects){
      this.loading = true
      this.getInTheaters()
    }
  },
  beforeRouteUpdate (to, from, next) {
    // 如果isBack为true时，证明是用户点击了回退，执行slide-right动画
    let isBack = this.$router.isBack
    if (isBack) {
      this.transitionName = 'slide-right'
    } else {
      this.transitionName = 'slide-left'
    }
    // 做完回退动画后，要设置成前进动画，否则下次打开页面动画将还是回退
    this.$router.isBack = false
    next()
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
      console.log('触发3')
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
    toDetail (id, event) {
      event.preventDefault()
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
<style lang="scss" scoped>
.hot-movie {
  height: 100%;
  .header {
    display: flex;
    padding: 10px 18px 0;
    align-items: center;
    .select-city {
      font-size: 28px;
      margin-right: 15px;
    }
    .search-box {
      flex: 1;
      background-color: #f6f6f6;
      height: 60px;
      line-height: 60px;
      margin-right: 22px;
      font-size: 28px;
      border-radius: 8px;
      i {
        width: 30px;
        height: 30px;
        margin: 15px;
        color: #9b9b9b;
        display: inline-block;
      }
      span {
        line-height: 100%;
        color: #cfcfcf;
      }
    }
  }
  .mint-navbar {
    margin-top: 20px;
    height: 84px;
    .mint-tab-item {
      line-height: 84px;
      color: #9b9b9b;
      &.is-selected {
        color: #494949;
        border-bottom: 4px solid #494949;
        z-index: 1;
      }
      span {
        font-size: 28px;
      }
    }
  }
  .mint-tab-container {
    position: absolute;
    width: 100%;
    top: 174px;
    bottom: 98px;
    overflow: scroll;
    border-bottom: 1px solid red;
    .mint-loadmore {
      .movie-item {
        li {
          display: flex;
          padding: 30px 0 30px 30px;
          height: 286px;
          box-sizing: border-box;
          border-top: 1px solid #dfdfdf;
          .movie-img {
            width: 160px;
            height: 224px;
            margin-right: 20px;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .movie-info {
            width: 230px;
            padding: 0 10px;
            .title {
              height: 42px;
              line-height: 42px;
              font-size: 32px;
              font-weight: 600;
              color: #494949;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .rating {
              height: 48px;
              line-height: 48px;
            }
            .staff {
              color: #9b9b9b;
              font-size: 20px;
              p {
                span:not(:last-child) {
                  &::after {
                    content: ' / ';
                    display: inline;
                  }
                }
                &:last-child {
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;
                  overflow: hidden;
                  text-overflow: ellipsis;
                }
              }
            }
          }
          .movie-slide {
            display: flex;
            flex: 1;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: #ff6677;
            p {
              font-size: 20px;
            }
            .goupiao-btn {
              margin-top: 25px;
              button {
                padding: 14px 32px;
                font-size: 24px;
                color: #ff6677;
                border: 2px solid #ff6677;
                border-radius: 10px;
                background-color: #fff;
              }
            }
          }
        }
      }
    }
  }
}

.loading {
  position: absolute;
  top: 50%;
  margin-top: -15px;
  left: 50%;
  margin-left: -15px;
}

image[lazy=loading] {
  background-color: #e5e5e5;
}

.child-view {
  position: absolute;
  width:100%;
  transition: all .8s cubic-bezier(.55,0,.1,1);
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

<style>
/*.slide-left-enter-active, .slide-left-leave-active {
  transition: transform .3s;
  transform: translate3d(0, 0, 0);
}
.slide-left-enter, .slide-left-leave-to  .fade-leave-active below version 2.1.8  {
  transform: translate3d(100%, 0 , 0);
}
.slide-left-enter-to, .slide-left-leave {
  transform: translate3d(0, 0 , 0);
}*/
</style>
