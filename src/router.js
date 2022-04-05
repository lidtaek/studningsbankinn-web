import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'Login',
      path: '/login',
      alias: '/',
      component: () => import('./login/login.vue')
    },
    {
      name: 'ListPlaces',
      path: '/places',
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
    },
    {
      name: 'ListQuestionnaires',
      path: '/questionnaires',
      component: () => import('./questionnaires/list.vue')
    },
    {
      name: 'EditQuestionnaires',
      path: '/questionnaires/:id',
      component: () => import('./questionnaires/edit.vue')
    },
    {
      name: 'ListPlaceCategories',
      path: '/placecategories',
      component: () => import('./placecategories/list.vue')
    },
    {
      name: 'EditPlaceCategories',
      path: '/placecategories/:id',
      component: () => import('./placecategories/edit.vue')
    },
    {
      name: 'ListVotes',
      path: '/votes',
      component: () => import('./votes/list.vue')
    },
    {
      name: 'Answer',
      path: '/svara/:token',
      component: () => import('./answers/public.vue')
    },
    {
      name: 'Place',
      path: '/upplysingar/:token',
      component: () => import('./places/public.vue')
    },
  ]
})
