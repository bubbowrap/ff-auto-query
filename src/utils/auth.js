import * as firebase from 'firebase/app'
import 'firebase/auth'
import store from '@/store'

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    console.log('hey')
    store.commit('UPDATE_USER', user)

  } else {
    store.commit('LOGOUT')
  }
})
