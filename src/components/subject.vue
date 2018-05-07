<template>
  <div class="subject">
    <mt-header fixed :title="this.subjectData.title">
      <!-- <router-link to="/" slot="left"> -->
        <mt-button icon="back" slot="left" @click="back"></mt-button>
      <!-- </router-link> -->
    </mt-header>
    <section class="movie-poster">
      <img :src="this.subjectData.images.large" :alt="this.subjectData.title">
    </section>
    <section class="movie-content">
      <div class="movie-info">
        <div class="info">
          <h3>{{this.subjectData.title}}</h3>
          <span>{{this.subjectData.year + '/' + this.subjectData.countries[0]}}</span>
          <span class="genres" v-for="n in this.subjectData.genres">{{n}}</span>
          <span>上映时间：{{this.subjectData.pubdates[0]}}</span>
          <span>片长：{{this.subjectData.durations[0]}}</span>
        </div>
        <div class="rating">
          <span>豆瓣评分</span>
          <span>{{this.subjectData.rating.average}}</span>
          <Star :stars="Number(this.subjectData.rating.stars)"/>
          <span>{{this.subjectData.collect_count}}</span>
        </div>
        <div>
          <button>想看</button>
          <button>看过</button>
        </div>
      </div>
      <div class="movie-summary">
        <span>剧情简介</span>
        <p>{{ this.subjectData.summary }}</p>
      </div>
      <div class="movier">
        <span>影人</span>
        <ul>
          <li v-for="(v, key) in this.movier" :key="key">
            <img :src="v.avatars.large" :alt="v.avatars.alt">
            <div>{{v.name}}</div>
          </li>
        </ul>
      </div>
      <div class="movie-photos">
        <span>预告片 / 剧照</span>
        <ul>
          <li v-for="(v, key) in this.subjectData.photos">
            <img :src="v.image" :alt="v.alt">
          </li>
        </ul>
      </div>
    </section>
    <section class="movie-comments">
      <div class="header">评论</div>
      <div class="comments">
        <div>短评</div>
        <div class="comments-list">
          <ul>
            <li v-for="(v, key) in this.subjectData.popular_comments" :key="key">
              <div class="avatar-image">
                <img :src="v.author.avatar" :alt="v.author.alt">
              </div>
              <div class="comment-content">
                <div class="author-info">
                  <span>{{v.author.name}}</span>
                  <Star :stars="Number(v.rating.value)"/>
                  <div>
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
        <div>全部短评{{this.subjectData.comments_count}}条</div>
      </div>
      <div class="reviews">
        <div>影评</div>
        <div>共{{this.subjectData.reviews_count}}篇</div>
        <div class="reviews-list">
          <ul>
            <li v-for="(v, key) in this.subjectData.popular_reviews" :key="key">
              <h4 class="reviews-title">{{v.title}}</h4>
              <div>
                <span>{{v.author.name}}</span>
                <Star :stars="v.rating.value"/>
              </div>
              <div>{{v.summary}}</div>
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

Vue.component(Header.name, Header)
Vue.component(Button.name, Button)
export default {
  name: 'subject',
  data () {
    return {
      subjectData: {},
      movier: []
    }
  },
  components: {
    Star
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
    // console.log(this.$router.history.current.params.id)
  },
  methods: {
    getSubject (res) {
      console.log('res',res)
      this.subjectData = res
      this.movier = this.movier.concat(res.directors, res.casts)
      console.log(this.movier)
    },
    back () {
      this.$router.back()
    },
    getMoviePhotos () {
      let id = this.$router.history.current.params.id
      getMoviePhotosData(id).then(res => {
        // if(res){
          console.log('photos',res)
        // }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
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
  .movier, .movie-photos {
    li {
      display: inline-block;
    }
  }
}
</style>
