import Vue from 'vue'
import Router from 'vue-router'
import HotMovie from '@/components/HotMovie'
import Subject from '@/components/Subject'
import FindMovie from '@/components/FindMovie'
import Search from '@/components/Search'
import City from '@/components/City'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HotMovie',
      component: HotMovie,
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
