import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'ListPlaces',
      path: '/',
      alias: '/places',
      component: () => import('./places/list.vue')
    },
    {
      name: 'EditPlaces',
      path: '/places/:id',
      component: () => import('./places/edit.vue')
    }
  ]
})
