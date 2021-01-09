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
    },
    {
      name: 'ListQuestionCategories',
      path: '/questioncategories',
      component: () => import('./questioncategories/list.vue')
    },
    {
      name: 'EditQuestionCategories',
      path: '/questioncategories/:id',
      component: () => import('./questioncategories/edit.vue')
    },
    {
      name: 'ListAnswers',
      path: '/answers',
      component: () => import('./answers/list.vue')
    },
    {
      name: 'EditAnswers',
      path: '/answers/:id',
      component: () => import('./answers/edit.vue')
    },
    {
      name: 'ListUsers',
      path: '/users',
      component: () => import('./users/list.vue')
    },
    {
      name: 'EditUsers',
      path: '/users/:id',
      component: () => import('./users/edit.vue')
    }
  ]
})
