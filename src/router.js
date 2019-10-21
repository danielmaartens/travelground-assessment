import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import GroupOverview from "./components/GroupOverview";

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'card',
      component: Home
    },
    {
      path: '/overview',
      name: 'overview',
      component: GroupOverview,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
