<template>
  <div class="subject" v-if="this.subjectData" ref="subjectDOM">
    <div class="loadmore-wrapper" ref="wrapper">
      <mt-loadmore :auto-fill="false" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
        <mt-header fixed :title="this.subjectTitle" class="mt-header" ref="mtheaderDOM">
          <mt-button icon="back" slot="left" @click="back"></mt-button>
        </mt-header>
        <section class="movie-poster" ref="posterBg">
          <img v-lazy="this.subjectData.images.large" :alt="this.subjectData.title">
        </section>
        <section class="movie-content">
          <div class="movie-info">
            <div class="info">
              <h3>{{this.subjectData.title}}</h3>
              <div>
                <span>{{this.subjectData.year + ' / ' + this.subjectData.countries[0] + ' / '}}</span>
                <span class="genres" v-for="n in this.subjectData.genres"> {{n}} </span>
              </div>
              <div><span>上映时间：{{this.subjectData.pubdates[0]}}</span></div>
              <div><span>片长：{{this.subjectData.durations[0]}}</span></div>
            </div>
            <div class="rating">
              <p>豆瓣评分</p>
              <div class="rating-average">{{this.subjectData.rating.average}}</div>
              <Star :stars="Number(this.subjectData.rating.stars)"/>
              <div class="collect-count">{{this.subjectData.collect_count}}人</div>
            </div>
          </div>
          <div class="movie-look">
            <button>想看</button>
            <button>
              <span>看过</span>
              <span><i class="icon-star-empty" v-for="n in 5"></i></span>
            </button>
          </div>
          <div class="movie-summary">
            <div class="label">剧情简介</div>
            <p ref="summary">{{ this.subjectData.summary }}</p>
            <div class="summary-open" v-if="!summaryOpen" @click="openSummary">... <span>展开</span></div>
          </div>
          <div class="movie-people">
            <div class="label">影人</div>
            <Slider>
              <div class="slider-list" v-for="(v, key) in this.movier" :key="key" @click="toCelebrity(v.id, $event)">
                <img v-lazy="v.avatars.large" :alt="v.avatars.alt">
                <div class="movie-people_name">{{v.name}}</div>
              </div>
            </Slider>
          </div>
          <div class="movie-photos">
            <div class="label">预告片 / 剧照</div>
            <Slider>
              <div class="slider-list" v-for="(v, key) in this.subjectData.photos" :style="{backgroundImage: `url(${v.image})`}">
              </div>
            </Slider>
          </div>
        </section>
        <section class="movie-comments">
          <div class="header">评论</div>
          <div class="comments">
            <div class="label">短评</div>
            <div class="comments-list">
              <ul>
                <li v-for="(v, key) in this.subjectData.popular_comments" :key="key">
                  <div class="avatar-image">
                    <img v-lazy="v.author.avatar" :alt="v.author.alt">
                  </div>
                  <div class="comment-content">
                    <div class="author-info">
                      <div class="author_name">
                        <span>{{v.author.name}}</span>
                        <Star :stars="Number(v.rating.value)"/>
                      </div>
                      <div class="useful_count">
                        <i class="icon-heart"></i>
                        <span>{{v.useful_count}}</span>
                      </div>
                    </div>
                    <div class="content">
                      {{v.content}}
                    </div>
                    <div class="created-at">
                      {{moment(v.created_at).fromNow()}}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div class="comments_count">全部短评{{this.subjectData.comments_count}}条</div>
          </div>
          <div class="reviews" v-if="this.reviewsData">
            <div class="label">影评</div>
            <div class="reviews_count">共{{this.reviewsData.total}}篇</div>
            <div class="reviews-list">
              <ul>
                <li v-for="(v, key) in this.reviewsData.reviews" :key="key">
                  <h4 class="reviews-title">{{v.title}}</h4>
                  <div class="author_name">
                    <span>{{v.author.name}}</span>
                    <Star class="star" :stars="v.rating.value"/>
                  </div>
                  <div class="summary">{{v.summary}}</div>
                  <div class="usefulInfo">{{v.useful_count + '/' + (v.useful_count + v.useless_count) + ' 有用'}}</div>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </mt-loadmore>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Header, Button, Lazyload, Loadmore } from 'mint-ui'
import { getSubjectData, getMoviePhotosData, getSubjectReviewsData } from '../api/hotMovie'
import Star from './Star'
import Slider from './Slider'
import RGBaster from '../utils/rgbaster'

Vue.use(Header)
Vue.use(Button)
Vue.use(Loadmore)
Vue.use(Lazyload)

export default {
  name: 'subject',
  data () {
    return {
      subjectTitle: '电影',
      subjectData: null, //电影数据
      movier: [],
      dominant: '',
      summaryOpen: false,
      reviewsData: null, //长评
      nextStart: 0,
      allLoaded: false,
      transitionName: 'slide-left'
    }
  },
  components: {
    Star,
    Slider
  },
  created () {
    getSubjectData(this.$route.params.id).then((res) => {
      if(res){
        this.getSubject(res)
      }
    })
  },
  watch: {
    subjectData (val, oldval) {
      if(val){
        this.$nextTick(()=>{
          let self = this
          setTimeout(()=>{
            let clientWidth = this.$refs.subjectDOM.clientWidth
            let mtheader = document.querySelector('.mt-header')
            this.$refs.wrapper.addEventListener('scroll', () => {
              let scrollTop = this.$refs.wrapper.scrollTop
              //640:710 = 70 9.142 750:832 = 82 9.146 1242:1376 = 134 9.268 1125:1244 = 119  9.453
              let top = clientWidth + clientWidth / 9.25
              if(scrollTop <= top){
                self.subjectTitle = '电影'
                mtheader.style.backgroundColor = `rgba(${self.dominant + ',' + (1000 - top + scrollTop) * .001})`
              }else{
                mtheader.style.backgroundColor = `rgba(${self.dominant},1)`
                self.subjectTitle = self.subjectData.title
              }
            }, false)
          })
        })
      }
    }
  },
  methods: {
    getSubject (res) {
      this.getSubjectReviews()
      // console.log('res',res)
      this.subjectData = res
      this.movier = this.movier.concat(res.directors, res.casts) //拼接影人数据
      let self = this
      RGBaster.colors(this.subjectData.images.large, {
        paletteSize: 30,
        exclude: [ 'rgb(255,255,255)', 'rgb(0,0,0)' ],
        success (payload) {
          self.dominant = payload.dominant.slice(4,-1)
          self.$refs.posterBg.style.backgroundColor = `rgba(${self.dominant},1)`
          let mtheader = document.querySelector('.mt-header')
          mtheader.style.backgroundColor = `rgba(${self.dominant},0)`
        }
      })
      
    },
    openSummary () {
      this.summaryOpen = true
      this.$refs.summary.style.webkitLineClamp = 'inherit'
    },
    getSubjectReviews () {
      let id = this.$route.params.id
      getSubjectReviewsData(id).then(res => {
        if(res){
          this.reviewsData = res
          this.nextStart = this.reviewsData.next_start
          // console.log('reviews',this.reviewsData)
        }
      })
    },
    loadBottom () {
      let id = this.$router.history.current.params.id
      getSubjectReviewsData(id, this.nextStart).then(res => {
        if(res){
          this.reviewsData.reviews = this.reviewsData.reviews.concat(res.reviews)
          this.nextStart = res.next_start
          this.$refs.loadmore.onBottomLoaded()
          if(this.reviewsData.reviews.length === res.total){
            this.allLoaded = true // 若数据已全部获取完毕
          }
        }
      })
    },
    toCelebrity (id, event) {
      this.$refs.subjectDOM.scrollTop = 0
      this.$router.push(`/celebrity/${id}`)
    },
    back () {
      this.$router.goBack()
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
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
  .loadmore-wrapper {
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
    .movie-content, .movie-comments {
      background-color: #f5f7fa;
    }
    .movie-content {
      padding: 40px 0;
      .movie-info {
        display: flex;
        margin-bottom: 60px;
        .info {
          flex: 1;
          h3 {
            font-size: 44px;
            color: #494949;
            margin-bottom: 18px;
          }
          div {
            height: 26px;
            line-height: 26px;
            span {
              font-size: 20px;
              color: #9b9b9b;
            }
          }
          .genres {
            &:not(:last-child) {
              &:after {
                content: '/';
                display: inline-block;
              }
            }
          }
        }
        .rating {
          width: 168px;
          height: 168px;
          text-align: center;
          background-color: #fff;
          box-shadow: 0 0 10px rgba(0,0,0,.1);
          p {
            height: 34px;
            line-height: 34px;
            margin-top: 15px;
            font-size: 20px;
            color: #ccc;
          }
          .rating-average {
            height: 46px;
            line-height: 46px;
            margin-bottom: 6px;
            font-size: 46px;
            color: #494949;
          }
          .collect-count {
            font-size: 20px;
            color: #9b9b9b;
          }
        }
      }
      .movie-look {
        display: flex;
        margin-bottom: 60px;
        button {
          font-size: 28px;
          color: #fecb7e;
          border: 2px solid #fecb7e;
          box-sizing: border-box;
          border-radius: 6px;
          background-color: #f5f7fa;
          &:first-child {
            width: 187px;
            height: 80px;
            margin-right: 16px;
          }
          &:last-child {
            flex: 1;
          }
        }
      }
      .movie-info, .movie-look, .movie-summary {
        padding: 0 40px;
      }
      .movie-summary, .movie-people, .movie-photos {
        .label {
          height: 72px;
          line-height: 72px;
          font-size: 24px;
          color: #9b9b9b;
        }
      }
      .movie-people, .movie-photos {
        .label {
          padding: 0 40px;
        }
      }
      .movie-summary {
        position: relative;
        p {
          line-height: 42px;
          font-size: 28px;
          color: #494949;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 4;
          overflow: hidden;
          transition: all .3s;
        }
        .summary-open {
          position: absolute;
          right: 40px;
          bottom: 0;
          font-size: 28px;
          color: #494949;
          background-color: #f5f7fa;
          span {
            color: #42bd56;
          }
        }
      }
      .movie-people {
        .slider-list {
          display: inline-block;
          width: 160px;
          text-align: center;
          img {
            width: 160px;
            height: 224px;
            vertical-align: top;
          }
          .movie-people_name {
            padding: 0 10px;
            font-size: 26px;
            color: #494949;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          &:not(:last-child) {
            margin-right: 10px;
          }
        }
      }
      .movie-photos {
        .slider-list {
          display: inline-block;
          width: 440px;
          height: 320px;
          overflow: hidden;
          background-color: #ccc;
          background-repeat: no-repeat;
          background-position: center;
          background-size: cover;
          img {
            height: 100%;
            vertical-align: top;
          }
          &:not(:last-child) {
            margin-right: 10px;
          }
        }
      }
    }
    .movie-comments {
      .header {
        height: 100px;
        line-height: 100px;
        font-size: 28px;
        text-align: center;
        background-color: #edeff2;
        margin-bottom: 56px;
        color: #494949;
      }
      .comments, .reviews {
        padding: 0 40px;
      }
      .comments {
        margin-bottom: 56px;
        border-bottom: 1px solid #dfdfdf;
        .label {
          font-size: 32px;
          height: 48px;
          line-height: 48px;
          color: #494949;
        }
        .comments-list {
          ul {
            li {
              display: flex;
              margin-top: 46px;
              .avatar-image {
                width: 60px;
                height: 60px;
                margin-right: 20px;
                border-radius: 50%;
                overflow: hidden;
                img {
                  width: 100%;
                  height: 100%;
                  vertical-align: top;
                }
              }
              .comment-content {
                flex: 1;
                .author-info {
                  display: flex;
                  height: 55px;
                  line-height: 55px;
                  .author_name {
                    flex: 1;
                    span {
                      font-size: 28px;
                      font-weight: 600;
                      color: #494949;
                    }
                  }
                  .useful_count {
                    font-size: 28px;
                    color: #ccc;
                  }
                }
                .content {
                  line-height: 44px;
                  font-size: 30px;
                  color: #494949;
                }
                .created-at {
                  height: 58px;
                  line-height: 58px;
                  color: #ccc;
                  font-size: 28px;
                }
              }
            }
          }
        }
        .comments_count {
          height: 118px;
          line-height: 118px;
          margin-top: 17px;
          font-size: 28px;
          color: #42bd56;
          text-align: center;
        }
      }
      .reviews {
        .label {
          font-size: 32px;
          height: 48px;
          line-height: 48px;
          color: #494949;
        }
        .reviews_count {
          height: 100px;
          line-height: 100px;
          font-size: 26px;
          color: #9b9b9b;
        }
        .reviews-list {
          ul {
            li {
              .reviews-title {
                line-height: 46px;
                font-size: 36px;
                font-weight: 600;
                color: #494949;
              }
              .author_name {
                height: 54px;
                line-height: 54px;
                span {
                  font-size: 24px;
                  color: #494949;
                }
                star {
                  i {
                    color: #faa032;
                  }
                }
              }
              .summary, .usefulInfo {
                font-size: 25px;
                color: #9b9b9b;
              }
              .summary {
                line-height: 38px;
              }
              .usefulInfo {
                line-height: 50px;
              }
              &:not(:last-child) {
                margin-bottom: 65px;
              }
            }
          }
        }
      }
    }
  }
}
.slider-group {
  padding: 0 40px;
}
</style>