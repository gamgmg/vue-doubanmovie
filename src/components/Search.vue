<template>
  <div class="search">
  	<div class="search-top">
  		<!-- <i class="icon-chevron-left back" @click="back"></i> -->
  		<mt-button icon="back" slot="left" @click="back"></mt-button>
  		<input autofocus type="search" @change="searchData($event)" placeholder="电影/电视剧/影人">
  	</div>
		<div class="search-result">
			<mt-loadmore :auto-fill="false" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
				<span>共{{this.resultData.total}}个影视</span>
        <ul class="result-item">
          <li v-for="n in resultData.subjects" :key="n.id" @click="toSubject(n.id)">
            <div class="movie-img"><img v-lazy="n.images.large" :alt="n.title"></div>
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
                <p>主演：<span v-for="c in n.casts">{{c.name}}</span></p>
              </div>
            </div>
          </li>
        </ul>
			</mt-loadmore>
			<mt-spinner v-if="loading" class="loading" type="snake"></mt-spinner>
		</div>
  </div>
</template>
<script>
import Vue from 'vue'
import { Loadmore, Spinner } from 'mint-ui'
import { getSearchData } from '../api/hotMovie'
import Star from './Star'

Vue.component(Spinner.name, Spinner)

export default {
  name: 'search',
  data () {
    return {
			keywords: 'asd',
			resultData: null,
			allLoaded: false,
			loading: false,
			searchStart: 0,
    }
  },
  components: {
    Star
  },
  created () {
    this.searchData()
  },
  methods: {
  	searchData (e) {
  		// this.keywords = e.target.value
  		this.loading = true
  		getSearchData(this.keywords).then((res) => {
  			console.log(res)
  			if (res) {
  				this.loading = false
  				this.resultData = res
  			}
  		})
  	},
  	back () {
  		this.$router.back()
  	},
  	toSubject (id) {
      this.$router.push(`/subject/${id}`)
    },
  	loadTop () {
  		getSearchData(this.keywords).then((res) => {
  			if (res) {
  				this.resultData = res
	  			this.$refs.loadmore.onTopLoaded()
  			}
  		})
  	},
  	loadBottom () {
  		this.searchStart = this.searchStart += 20
  		getSearchData(this.keywords, this.searchStart).then((res) => {
  			if (res) {
  				this.resultData.subjects = this.resultData.subjects.concat(res.subjects)
  				this.$refs.loadmore.onBottomLoaded()
  				if(this.resultData.subjects.length === res.total){
  					this.allLoaded = true
  				}
  			}
  		})
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.search {
  position: absolute;
  overflow: scroll;
  top: 0;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  z-index: 100;
}
.result-item li {
  height: 288px;
}
.search-result {
  position: absolute;
  width: 100%;
  top: 2rem;
  bottom: 0;
  overflow: scroll;
  border-top: 1px solid red;
  border-bottom: 1px solid red;
}
.search-top {
	display: flex;
  align-items: center;
}
.back {
	font-size: 26px;
}

.loading {
  position: absolute;
  top: 50%;
  margin-top: -15px;
  left: 50%;
  margin-left: -15px;
}

image[lazy=loading] {
  background-image: url(../assets/movie_default_large.png);
}
</style>
