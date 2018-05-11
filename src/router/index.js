import Vue from 'vue'
import Router from 'vue-router'
import Tabbar from '@/components/Tabbar'
import HotMovie from '@/components/HotMovie'
import Subject from '@/components/Subject'
import FindMovie from '@/components/FindMovie'
import Search from '@/components/Search'
import City from '@/components/City'
import Celebrity from '@/components/Celebrity'

Router.prototype.goBack = function () {
  this.isBack = true
  window.history.go(-1)
}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Tabbar',
      component: Tabbar,
      redirect: '/hotMovie',
      children: [
        {
          path: '/hotMovie',
          name: 'HotMovie',
          component: HotMovie,
        },
        {
          path: '/findMovie',
          name: 'FindMovie',
          component: FindMovie
        },
        {
          path: '/subject/:id',
          name: 'Subject',
          component: Subject
        },
        {
          path: '/celebrity/:id',
          name: 'Celebrity',
          component: Celebrity
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
    }
  ]
})
