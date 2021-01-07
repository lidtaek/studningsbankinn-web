import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'ListPlaces',
      path: '/places',
      alias: '/',
      component: () => import('./places/list.vue')
    },
    {
      name: 'EditPlaces',
      path: '/places/:id',
      component: () => import('./places/edit.vue')
    },
    {
      name: 'ListQuestions',
      path: '/questions',
      component: () => import('./questions/list.vue')
    },
    {
      name: 'EditQuestions',
      path: '/questions/:id',
      component: () => import('./questions/edit.vue')
    }
  ]
})
