<template>
  <div class="search-page">
  	<div class="search-top">
  		<i class="icon-back back" @click="back"></i>
  		<!-- <mt-button icon="back" slot="left" @click="back"></mt-button> -->
  		<input autofocus type="search" @change="searchData($event)" placeholder="电影/电视剧/影人">
  	</div>
		<div class="search-result">
			<mt-loadmore :auto-fill="false" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
				<ul class="result-item">
					<li v-for="item in resultData.subjects" :key="item.id" @click="toSubject(item.id)">{{item.title}}</li>
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
import '../assets/icomoon/style.css'

Vue.component(Spinner.name, Spinner)

export default {
  name: 'search-page',
  data () {
    return {
			keywords: '',
			resultData: {},
			allLoaded: false,
			loading: false,
			searchStart: 0,
    }
  },
  methods: {
  	searchData (e) {
  		this.keywords = e.target.value
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
<style scoped>
h1, h2 {
  font-weight: normal;
}
a {
  color: #42b983;
}
.search-page {
  position: absolute;
  overflow: scroll;
  top: 0;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  z-index: 100;
}
.result-item li {
  line-height: 288px;
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
	font-size: 1rem;
}
.loading {
  position: absolute;
  top: 50%;
  margin-top: -.56rem;
  left: 50%;
  margin-left: -.56rem;
}
</style>
