import Vue from 'vue'
import Vuex from 'vuex'

import ffQueries from './modules/ffQueries'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    ffQueries,
  },
})
