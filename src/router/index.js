import Vue from 'vue'
import Router from 'vue-router'
import HotMovie from '@/components/HotMovie'
import Subject from '@/components/Subject'
import FindMovie from '@/components/FindMovie'
import Search from '@/components/Search'
import City from '@/components/City'

Vue.use(Router)

Router.prototype.goBack = function () {
  this.isBack = true
  window.history.go(-1)
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HotMovie',
      component: HotMovie,
      meta: {
        keepAlive: true
      },
      children: [
      	{
      		path: '/subject/:id',
      		name: 'Subject',
      		component: Subject
      	},
        {
          path: '/search',
          name: 'Search',
          component: Search
        },
        {
          path: '/city',
          name: 'City',
          component: City
        }
      ]
    },
    {
      path: '/findMovie',
      name: 'FindMovie',
      component: FindMovie
    }
  ]
})
