import Vue from 'vue'
import VueRouter from 'vue-router'
import * as firebase from 'firebase/app'
import 'firebase/auth'

import Home from '../views/Home.vue'
import Category from '../views/Category.vue'
import notFound from '../views/NotFound.vue'
import signIn from '../views/GoogleSignIn.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: '/category/:category/:fandom',
    name: 'Category',
    component: Category,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/about',
    name: 'About',
    meta: { requiresAuth: true },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '@/views/About.vue'),
  },
  {
    path: '/404',
    name: '404',
    component: notFound,
    meta: { requiresAuth: true },
  },
  {
    path: '/sign-in',
    name: 'signIn',
    component: signIn,
    meta: {
      layout: 'signIn',
      requiresGuest: true,
    },
  },
  // {
  //   path: '*',
  //   redirect: '/404',
  //   meta: { requiresAuth: true },
  // },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !(await firebase.getCurrentUser())) {
    next({
      path: '/sign-in',
      query: { redirect: to.fullPath },
    })
  } else {
    next()
  }
})

router.beforeEach(async (to, from, next) => {
  const requiresGuest = to.matched.some(record => record.meta.requiresGuest)

  if (requiresGuest && (await firebase.getCurrentUser())) {
    next({
      path: '/',
      query: { redirect: to.fullPath },
    })
  } else {
    next()
  }
})

export default router
