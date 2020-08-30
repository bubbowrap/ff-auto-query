import * as firebase from 'firebase/app'
import 'firebase/auth'
import { auth } from '@/utils/firebaseConfig'

const state = {
  user: {},
  loggedIn: false,
}
const mutations = {
  UPDATE_USER(state, user) {
    state.loggedIn = true
    state.user = {
      name: user.displayName,
    }
  },

  LOGOUT(state) {
    state.loggedIn = false
    state.user = {}
  },
}

const actions = {
  updateUser({ commit }, user) {
    commit('UPDATE_USER', user)
    let uid = firebase.auth().currentUser.uid

    firebase
      .database()
      .ref('users/' + uid)
      .update({
        name: state.user.name,
      })
  },

  googleLogin: async store => {
    if (store.state.loggedIn) return
    const provider = new firebase.auth.GoogleAuthProvider()
    try {
      await auth.signInWithPopup(provider)
    } catch (error) {
      console.error(error)
    }
  },

  demoLogin({ commit }) {
    commit('DEMO_LOGIN')
  },

  async logout({ commit }) {
    try {
      await auth.signOut()
      commit('LOGOUT')
    } catch (error) {
      console.error(error)
    }
  },
}

const getters = {
  user: () => {
    return state.user
  },
  loggedIn: () => {
    return state.loggedIn
  },
}

export default { state, getters, mutations, actions }
