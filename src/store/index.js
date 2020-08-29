import Vue from 'vue'
import Vuex from 'vuex'

import ffQueries from './modules/ffQueries'
import users from './modules/users'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    ffQueries,
    users,
  },
})
