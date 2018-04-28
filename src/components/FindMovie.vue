<template>
  <div class="find-movie">
    <div class="header">
        <input type="text" readonly placeholder="电影/影人" @click="toSearch">
    </div>
    <div class="container">
      <br>
      <section>
        <div class="section-header">
          豆瓣 Top250
        </div>
        <div class="section-item">
          <ul>
            <li v-for="(n, key) in top250Data.subjects" :key="n.id" @click="toDetail(n.id)">{{(key + 1) +' '+ n.title}}</li>
          </ul>
        </div>
      </section>
      <br>
      <section>
        <div class="section-header">
          北美票房榜
        </div>
        <div class="section-item">
          <ul>
            <li v-for="(n, key) in usBoxData.subjects" :key="n.id">{{(key + 1) +' '+ n.box}}</li>
          </ul>
        </div>
      </section>
      <br>
      <section>
        <div class="section-header">
          口碑榜
        </div>
        <div class="section-item">
          <ul>
            <li v-for="(n, key) in weeklyData.subjects" :key="n.id">{{(key + 1) +' '+ n.title}}</li>
          </ul>
        </div>
      </section>
      <br>
      <section>
        <div class="section-header">
          新片榜
        </div>
        <div class="section-item">
          <ul>
            <li v-for="(n, key) in newMoviesData.subjects" :key="n.id">{{(key + 1) +' '+ n.title}}</li>
          </ul>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { getTop250Data, getUsBoxData, getWeeklyData, getNewMoviesData } from '../api/findMovie'

export default {
  name: 'find-movie',
  data () {
    return {
      top250Data: {},
      usBoxData: {},
      weeklyData: {},
      newMoviesData: {}
    }
  },
  mounted () {
    this.getTop250()
    this.getUsBox()
    this.getWeekly()
    this.getNewMovies()
  },
  methods: {
    toSearch () {
      this.$router.push('/search')
    },
    toDetail (id) {
      this.$router.push(`/subject/${id}`)
    },
    getTop250 () {
      getTop250Data(0, 4).then((res) => {
        console.log(res)
        this.top250Data = res
      })
    },
    getUsBox () {
      getUsBoxData(0, 4).then((res) => {
        console.log(res)
        this.usBoxData = res
      })
    },
    getWeekly () {
      getWeeklyData(0, 4).then((res) => {
        console.log(res)
        this.weeklyData = res
      })
    },
    getNewMovies () {
      getNewMoviesData(0, 4).then((res) => {
        console.log(res)
        this.newMoviesData = res
      })
    },
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
.find-movie {
  text-align: left;
}
</style>
