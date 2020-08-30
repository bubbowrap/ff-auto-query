import * as firebase from 'firebase/app'
import 'firebase/auth'
import store from '@/store'
import router from '@/router'

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    store.dispatch('fetchUserData')
    store.commit('UPDATE_USER', user)
    router.push('/')

  } else {
    store.commit('LOGOUT')
    router.push('/sign-in')
  }
})
