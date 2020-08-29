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
    meta: { requireAuth: true },
  },
  {
    path: '/category/:category/:fandom',
    name: 'Category',
    component: Category,
    props: true,
    meta: { requireAuth: true },
  },
  {
    path: '/about',
    name: 'About',
    // meta: { requireAuth: true },
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
    // meta: { requireAuth: true },
  },
  {
    path: '/sign-in',
    name: 'Sign In',
    component: signIn,
    meta: {
      layout: 'signIn',
      // guestOnly: true,
    },
  },
  {
    path: '*',
    redirect: '/404',
    // meta: { requireAuth: true }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach(async (to, from, next) => {
  const requireAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requireAuth && !(await firebase.getCurrentUser())) {
    next('Sign In')
  } else {
    next()
  }
})

export default router
