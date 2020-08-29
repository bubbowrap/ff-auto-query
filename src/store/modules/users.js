import * as firebase from 'firebase/app'
import 'firebase/auth'
import { auth } from '@/utils/firebaseConfig'
import ffQueries from './ffQueries'

const state = {
  user: {},
  loggedIn: false,
}

const mutations = {
  UPDATE_USER(state, user) {
    state.loggedIn = true
    state.user = {
      name: user.displayName,
      categories: ffQueries.getters.categories,
      ffQueries: ffQueries.getters.ffQueries,
    }
  },

  LOGOUT(state) {
    state.loggedIn = false
  },
}

const actions = {
  googleLogin: async store => {
    if (store.state.loggedIn) return
    const provider = new firebase.auth.GoogleAuthProvider()
    try {
      await auth.signInWithPopup(provider)
    } catch (error) {
      console.error(error)
    }
  },

  async logout() {},
}

const getters = {
  user: () => {
    return state.user
  },
  loggedIn: () => {
    return state.loggedIn
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}