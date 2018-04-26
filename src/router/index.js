import Vue from 'vue'
import Router from 'vue-router'
import HotMovie from '@/components/HotMovie'
import Subject from '@/components/Subject'
import FindMovie from '@/components/FindMovie'
import SearchPage from '@/components/SearchPage'

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
          name: 'SearchPage',
          component: SearchPage
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
