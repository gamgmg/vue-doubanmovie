<template>
  <div class="subject" v-if="!loading" @scroll.native="scrollHandle" ref="subjectDOM">
    <mt-header fixed :title="this.subjectTitle" class="mt-header" ref="mtheaderDOM">
      <mt-button icon="back" slot="left" @click="back"></mt-button>
    </mt-header>
    <section class="movie-poster" ref="posterBg">
      <img :src="this.subjectData.images.large" :alt="this.subjectData.title">
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
        <p>{{ this.subjectData.summary }}</p>
      </div>
      <div class="movie-people">
        <div class="label">影人</div>
        <Slider>
          <div class="slider-list" v-for="(v, key) in this.movier" :key="key">
            <img :src="v.avatars.large" :alt="v.avatars.alt">
            <div class="movie-people_name">{{v.name}}</div>
          </div>
        </Slider>
      </div>
      <div class="movie-photos">
        <div class="label">预告片 / 剧照</div>
        <Slider>
          <div class="slider-list" v-for="(v, key) in this.subjectData.photos">
            <img :src="v.image">
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
                <img :src="v.author.avatar" :alt="v.author.alt">
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
                  {{v.created_at}}
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="comments_count">全部短评{{this.subjectData.comments_count}}条</div>
      </div>
      <div class="reviews">
        <div class="label">影评</div>
        <div class="reviews_count">共{{this.subjectData.reviews_count}}篇</div>
        <div class="reviews-list">
          <ul>
            <li v-for="(v, key) in this.subjectData.popular_reviews" :key="key">
              <h4 class="reviews-title">{{v.title}}</h4>
              <div class="author_name">
                <span>{{v.author.name}}</span>
                <Star class="star" :stars="v.rating.value"/>
              </div>
              <div class="summary">{{v.summary}}</div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Vue from 'vue'
import { Header, Button } from 'mint-ui'
import { getSubjectData, getMoviePhotosData } from '../api/hotMovie'
import Star from './Star'
import Slider from './Slider'
import RGBaster from '../utils/rgbaster'

Vue.component(Header.name, Header)
Vue.component(Button.name, Button)
export default {
  name: 'subject',
  data () {
    return {
      subjectTitle: '电影',
      subjectData: {},
      movier: [],
      dominant: '',
      loading: true //防止二级对象数据报错
    }
  },
  components: {
    Star,
    Slider
  },
  beforeRouteEnter (to, from, next) {
    getSubjectData(to.params.id).then((res) => {
      if(res){
        next(vm => {
          vm.getSubject(res)
        })
      }
    })
  },
  beforeRouteUpdate (to, from, next) {
    getSubjectData(to.params.id).then((res) => {
      if(res){
        this.subjectData = {}
        this.getSubject(res)
        next()
      }
    })
  },
  created () {
    this.getMoviePhotos()
  },
  mounted () {
    this.$nextTick(()=>{
      let self = this
      setTimeout(()=>{
        this.$refs.subjectDOM.addEventListener('scroll', () => {
          let scrollTop = this.$refs.subjectDOM.scrollTop
          let scrollHeight = this.$refs.subjectDOM.scrollHeight
          // console.log(top)
          let top = scrollHeight * 0.14
          if(scrollTop <= top){
            self.subjectTitle = '电影'
            let mtheader = document.querySelector('.mt-header')
            mtheader.style.backgroundColor = `rgba(${self.dominant + ',' + (1000 - top + scrollTop) * .001})`
          }else{
            self.subjectTitle = self.subjectData.title
          }
        })
      })
    })
  },
  update () {
    console.log('update')
  },
  methods: {
    getSubject (res) {
      this.loading = false
      console.log('res',res)
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
    back () {
      this.$router.back()
    },
    getMoviePhotos () {
      let id = this.$router.history.current.params.id
      getMoviePhotosData(id).then(res => {
        if(res){
          // console.log('photos',res)
        }
      })
    },
    scrollHandle (e) {
      console.log(e)
    }
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
  overflow-y: scroll;
  z-index: 100;
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
    padding: 40px;
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
    .movie-summary, .movie-people, .movie-photos {
      .label {
        height: 72px;
        line-height: 72px;
        font-size: 24px;
        color: #9b9b9b;
      }
    }
    .movie-summary {
      p {
        line-height: 42px;
        font-size: 28px;
        color: #494949;
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
        img {
          width: 440px;
          height: 320px;
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
            .summary {
              line-height: 38px;
              font-size: 25px;
              color: #9b9b9b;
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
</style>
