import * as firebase from 'firebase/app'
import 'firebase/auth'
import store from '@/store'

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    store.commit('UPDATE_USER', user)

  } else {
    store.commit('LOGOUT')
  }
})
